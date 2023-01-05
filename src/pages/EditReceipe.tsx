import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, FieldArray } from 'formik';
import StyledEditReceipe from './styles/EditReceipe';
import AddIngredient from './AddIngredient';
import {
    DeleteReceipeEntryMutation,
    Receipe as ReceipeType,
    ReceipeEntry,
    useCreateReceipeMutation,
    useDeleteReceipeEntryMutation,
    useReceipeEntriesMutation,
    useReceipeQuery,
    useUpdateReceipeMutation,
} from '../generated/graphql';
import {
    convertUnit,
    duplicateElements,
    getPrice,
    getTotalPrice,
    getUrlForImage,
    onlyInLeft,
    useUploadMutation,
} from '../utils';
import PicturePicker, { Picture } from './PicturePicker';

const emptyReceipe: Partial<ReceipeType> = {
    id: '',
    name: '',
    receipe_entries: [],
};

const useDeleteReceipeEntries = () => {
    const [data, setData] = React.useState<DeleteReceipeEntryMutation[]>();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const deleteReceipeEntry = useDeleteReceipeEntryMutation();

    const mutateAsync = (receipeEntries: ReceipeEntry[]) =>
        Promise.all(
            receipeEntries.map((entry) =>
                deleteReceipeEntry.mutateAsync({ id: entry?.id as string }),
            ),
        );

    const mutate = (receipeEntries: ReceipeEntry[]) => {
        setLoading(true);
        mutateAsync(receipeEntries)
            .then((result) => {
                setLoading(false);
                setData(result);
            })
            .catch((err) => {
                console.error({ err });
                setError(err);
            });
    };

    return { mutate, mutateAsync, data, error, loading };
};

const EditReceipe: React.FC = () => {
    const [openAddIngredient, setOpenAddIngredient] = React.useState(false);
    const [openPhotoPicker, setOpenPhotoPicker] = React.useState(false);
    const [newPicture, setNewPicture] = React.useState<Picture>();
    const input = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { receipeId } = useParams();

    const { data = {} } = useReceipeQuery(
        { id: receipeId as string },
        { enabled: Boolean(receipeId) },
    );
    const createReceipeEntry = useReceipeEntriesMutation();
    const deleteReceipeEntries = useDeleteReceipeEntries();
    const updateReceipe = useUpdateReceipeMutation();
    const createReceipe = useCreateReceipeMutation();
    const upload = useUploadMutation();

    const receipeEntries = data?.receipe?.receipe_entries || [];
    const image = data?.receipe?.image?.url || '';
    const title = data?.receipe?.name || '';

    const handleClickOpen = () => {
        setOpenAddIngredient(true);
    };

    const onUpdate = async (values: Partial<ReceipeType>, newImage: any) => {
        const isSameId = (entryA: ReceipeEntry, entryB: ReceipeEntry) => entryA.id === entryB.id;
        const entriesToDelete = onlyInLeft(
            receipeEntries as ReceipeEntry[],
            values.receipe_entries as ReceipeEntry[],
            isSameId,
        );
        const entriesToCreate = onlyInLeft(
            values.receipe_entries as ReceipeEntry[],
            receipeEntries as ReceipeEntry[],
            isSameId,
        );
        const entriesToKeep = duplicateElements(
            values.receipe_entries as ReceipeEntry[],
            receipeEntries as ReceipeEntry[],
            isSameId,
        );

        await deleteReceipeEntries.mutateAsync(entriesToDelete);

        const receipeEntryIds = await Promise.all(
            entriesToCreate.map((entry) =>
                createReceipeEntry.mutateAsync({
                    input: {
                        data: {
                            ingredient: entry?.ingredient?.id,
                            quantity: entry?.quantity,
                            receipe: receipeId,
                        },
                    },
                }),
            ) || [],
        );

        await updateReceipe.mutateAsync({
            data: {
                data: {
                    image: newImage?.[0].id,
                    name: values.name,
                    receipe_entries: [
                        ...receipeEntryIds.map(
                            (entry) => entry.createReceipeEntry?.receipeEntry?.id,
                        ),
                        ...entriesToKeep.map((entry: ReceipeEntry) => entry.id),
                    ] as string[],
                },
                where: { id: receipeId as string },
            },
        });
    };

    const onCreate = async (values: Partial<ReceipeType>, newImage: any) => {
        const entriesToCreate = values.receipe_entries as ReceipeEntry[];
        const receipeEntryIds = await Promise.all(
            entriesToCreate.map((entry) =>
                createReceipeEntry.mutateAsync({
                    input: {
                        data: {
                            ingredient: entry?.ingredient?.id,
                            quantity: entry?.quantity,
                            receipe: receipeId,
                        },
                    },
                }),
            ) || [],
        );
        const newReceipe = await createReceipe.mutateAsync({
            data: {
                data: {
                    image: newImage?.[0].id,
                    name: values.name as string,
                    receipe_entries: [
                        ...receipeEntryIds.map(
                            (entry) => entry.createReceipeEntry?.receipeEntry?.id,
                        ),
                        ...entriesToCreate.map((entry: ReceipeEntry) => entry.id).filter(Boolean),
                    ] as string[],
                },
            },
        });

        return newReceipe.createReceipe?.receipe?.id;
    };

    const onSubmit = async (values: Partial<ReceipeType>) => {
        let newImage;
        let id = receipeId;
        if (newPicture) {
            newImage = await upload.mutateAsync({ file: newPicture.file });
        }
        if (!!receipeId && receipeId !== 'new') {
            await onUpdate(values, newImage);
        } else {
            id = await onCreate(values, newImage);
        }
        navigate(`/receipes/${id}`);
    };

    const resizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length) {
            const length = e.target.value.length;
            e.target.style.width = `calc(${length}ch + 10px)`;
        } else e.target.style.width = '100px';
    };

    React.useEffect(() => {
        const length = title.length;
        if (input.current && length) {
            input.current.style.width = `calc(${length}ch + 10px)`;
        }
    }, [title]);

    const onPicture = async (picture: Picture) => {
        setNewPicture(picture);
    };

    const initialValues = (data.receipe || emptyReceipe) as ReceipeType;
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
            {({ values }) => (
                <StyledEditReceipe>
                    <PicturePicker
                        onPicture={onPicture}
                        open={openPhotoPicker}
                        onClose={() => setOpenPhotoPicker(false)}
                    />
                    <IconButton onClick={() => navigate('/receipes')} className="back-btn">
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                    {newPicture || values?.image?.url ? (
                        <button
                            onClick={() => setOpenPhotoPicker(true)}
                            type="button"
                            className="edit-img"
                        >
                            <img
                                className="receipe-image"
                                src={newPicture?.src || getUrlForImage(image)}
                                alt={title}
                            />
                            <div className="filter">
                                <EditIcon className="edit-icon" fontSize="large" />
                            </div>
                        </button>
                    ) : (
                        <IconButton
                            className="add-photo-btn"
                            onClick={() => setOpenPhotoPicker(true)}
                        >
                            <AddAPhotoIcon fontSize="large" />
                        </IconButton>
                    )}

                    <header className="receipe-header">
                        <Field className="receipe-title" name="name" placeholder="Nom">
                            {({ field, form: { touched, errors }, meta }: any) => (
                                <div>
                                    <input
                                        className="receipe-title"
                                        type="text"
                                        placeholder="Nom"
                                        ref={input}
                                        {...field}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            field.onChange(e);
                                            resizeInput(e);
                                        }}
                                    />
                                    {meta.touched && meta.error && (
                                        <div className="error">{meta.error}</div>
                                    )}
                                </div>
                            )}
                        </Field>
                        <IconButton type="submit" className="validate-btn">
                            <CheckIcon fontSize="large" />
                        </IconButton>
                        <IconButton
                            onClick={() => navigate(`/receipes/${receipeId}`)}
                            className="cancel-btn"
                        >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </header>
                    <div className="receipe-ingredients">
                        <FieldArray name="receipe_entries">
                            {({ insert, remove, push }) => (
                                <>
                                    <ul className="ingredient-list">
                                        {!!values?.receipe_entries?.length &&
                                            values.receipe_entries.map((entry, index) => (
                                                <li className="ingredient-item" key={index}>
                                                    <div className="ingredient-label">
                                                        <img
                                                            className="ingredient-image"
                                                            src={getUrlForImage(
                                                                entry?.ingredient?.image?.url,
                                                            )}
                                                            alt={entry?.ingredient?.name}
                                                        />
                                                        <p className="ingredient-name">
                                                            {entry?.ingredient?.name}
                                                        </p>
                                                    </div>
                                                    <div className="ingredient-amount">
                                                        <span className="ingredient-number">
                                                            {entry?.quantity}
                                                        </span>
                                                        <span className="ingredient-unit">
                                                            {convertUnit(entry?.ingredient?.unit)}
                                                        </span>
                                                    </div>
                                                    <div className="ingredient-price">
                                                        <span>
                                                            {getPrice(
                                                                entry?.ingredient?.products?.[0]
                                                                    ?.price || 1,
                                                                entry?.quantity,
                                                                entry?.ingredient?.products?.[0]
                                                                    ?.quantity || 1,
                                                            )}
                                                        </span>
                                                        <span>€</span>
                                                    </div>
                                                    <IconButton
                                                        onClick={() => remove(index)}
                                                        className="del-btn"
                                                    >
                                                        <DeleteIcon fontSize="large" />
                                                    </IconButton>
                                                </li>
                                            ))}
                                        <li className="add-line">
                                            <IconButton
                                                className="add-btn"
                                                onClick={handleClickOpen}
                                            >
                                                <AddIcon fontSize="large" />
                                            </IconButton>
                                            <p>Ajouter</p>
                                        </li>
                                    </ul>
                                    <AddIngredient
                                        open={openAddIngredient}
                                        onClose={() => setOpenAddIngredient(false)}
                                        receipeEntries={values?.receipe_entries as ReceipeEntry[]}
                                        onFinished={(value) => push(value)}
                                    />
                                </>
                            )}
                        </FieldArray>

                        <div className="price">
                            <p className="price-number">
                                {getTotalPrice(values?.receipe_entries as ReceipeEntry[])}€
                            </p>
                            <p className="price-label">Prix total</p>
                        </div>
                    </div>
                </StyledEditReceipe>
            )}
        </Formik>
    );
};

export default EditReceipe;
