import React from 'react';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
    Avatar,
    FormControl,
    IconButton,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Snackbar,
    Alert,
    Dialog,
} from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StyledIngredients, { EditIngredient } from './styles/Products';
import setLongPress from '../useLongPress';
import {
    useCreateIngredientMutation,
    EnumIngredientUnit,
    useDeleteIngredientMutation,
    useDeleteProductMutation,
    useIngredientQuery,
    Product,
    DeleteProductMutation,
    useUpdateIngredientMutation,
} from '../generated/graphql';
import { getUrlForImage, useUploadMutation } from '../utils';
import PicturePicker, { Picture } from './PicturePicker';
import AlertDialog from '../components/AlertDialog';
import { useQueryClient } from 'react-query';

const getIndex = (element: HTMLElement) => {
    let current = element;
    while (!current.dataset.index) {
        current = current.parentElement as HTMLElement;
    }

    return parseInt(current.dataset.index);
};

const useDeleteProducts = () => {
    const [data, setData] = React.useState<DeleteProductMutation[]>();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const deleteProduct = useDeleteProductMutation();

    const mutate = (products: Product[]) => {
        setLoading(true);
        Promise.all(
            products.map((product) => deleteProduct.mutateAsync({ id: product?.id as string })),
        )
            .then((result) => {
                setLoading(false);
                setData(result);
            })
            .catch((err) => {
                setError(err);
            });
    };
    return { mutate, data, error, loading };
};

const Products: React.FC = () => {
    const [selectedIndexies, setSelectedIndexies] = React.useState<number[]>([]);
    const [isLongPressing, setIsLongPressing] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const [newIngredient, setNewIngredient] = React.useState('');
    const [unit, setUnit] = React.useState<EnumIngredientUnit>(EnumIngredientUnit.Gram);
    const [openPhotoPicker, setOpenPhotoPicker] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [newPicture, setNewPicture] = React.useState<Picture>();
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();
    const { ingredientId } = useParams();
    const { data } = useIngredientQuery({ id: ingredientId as string });
    const updateIngredient = useUpdateIngredientMutation({
        onSuccess: ({ updateIngredient: payload }) => {
            queryClient.setQueryData(['ingredient', { id: payload?.ingredient?.id }], {
                ingredient: payload?.ingredient,
            });
        },
    });
    const upload = useUploadMutation();
    const deleteProducts = useDeleteProducts();

    const onPicture = async (picture: Picture) => {
        setNewPicture(picture);
    };

    React.useEffect(() => {
        if (data?.ingredient) {
            setNewIngredient(data.ingredient.name);
            setUnit(data.ingredient.unit);
        }
    }, [data]);

    const onDelete = React.useCallback(async () => {
        deleteProducts.mutate(
            selectedIndexies.map((index) => data?.ingredient?.products?.[index]) as Product[],
        );
        setOpenAlert(false);
    }, [selectedIndexies, data, deleteProducts]);

    const handleClickOpen = () => {
        setOpenAlert(true);
    };

    const handleClose = () => {
        setOpenAlert(false);
    };

    const onLongPress = React.useCallback(
        (e) => {
            const index = getIndex(e.target as HTMLElement);
            if (!isLongPressing) {
                setSelectedIndexies([index]);
                setIsLongPressing(true);
            }
        },
        [isLongPressing],
    );
    const onClick = (e: any) => {
        const index = getIndex(e.target as HTMLElement);
        if (isLongPressing) {
            if (!selectedIndexies.includes(index)) {
                setSelectedIndexies([...selectedIndexies, index]);
            } else {
                setSelectedIndexies(selectedIndexies.filter((item) => item !== index));
            }
        } else {
            navigate(`${location.pathname}/${data?.ingredient?.products?.[index]?.id}`);
        }
    };
    const onLongPressListener = setLongPress(onLongPress, onClick);
    React.useEffect(() => {
        if (isLongPressing && selectedIndexies.length === 0) {
            setIsLongPressing(false);
        }
    }, [selectedIndexies, isLongPressing]);

    const onUpdateIngredient = React.useCallback(
        async (e) => {
            e.preventDefault();
            let image;
            if (newPicture) {
                image = await upload.mutateAsync({ file: newPicture.file });
            }

            updateIngredient.mutate({
                input: {
                    data: { name: newIngredient, unit, image: image?.[0].id },
                    where: { id: data?.ingredient?.id as string },
                },
            });
        },
        [newPicture, upload, updateIngredient, newIngredient, unit, data],
    );
    return (
        <StyledIngredients>
            <PicturePicker
                onPicture={onPicture}
                open={openPhotoPicker}
                onClose={() => setOpenPhotoPicker(false)}
            />
            <AlertDialog
                open={openAlert}
                title="Est-ce que tu veux supprimer ces produits ?"
                description="Cette action est irréversible"
                onClose={handleClose}
                onValidate={onDelete}
                onCancel={handleClose}
            />
            <header className="header-products">
                <div className="search-input">
                    <SearchIcon className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>
                {isLongPressing ? (
                    <IconButton className="del-btn" onClick={handleClickOpen}>
                        <DeleteIcon fontSize="large" className="del-icon" />
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => navigate(`${location.pathname}/new`)}
                        className="add-btn"
                    >
                        <AddIcon fontSize="large" className="add-icon" />
                    </IconButton>
                )}
            </header>
            <div className="ingredient-label">
                <Avatar
                    sx={{ height: '50px', width: '50px' }}
                    src={getUrlForImage(data?.ingredient?.image?.url)}
                />
                <h2 className="ingredient-name">{data?.ingredient?.name}</h2>
                <IconButton onClick={() => setEditMode(true)}>
                    <EditIcon fontSize="large" className="edit-icon" />
                </IconButton>
            </div>
            <EditIngredient open={editMode}>
                <div className="ingredient-label">
                    <button onClick={() => setOpenPhotoPicker(true)} className="edit-img">
                        <img
                            className="ingredient-image"
                            src={newPicture?.src || getUrlForImage(data?.ingredient?.image?.url)}
                            alt={data?.ingredient?.name}
                        />
                        <div className="filter">
                            <EditIcon className="edit-icon" fontSize="large" />
                        </div>
                    </button>
                    <input
                        className="ingredient-name-edit"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                    />
                    <FormControl className="amount-type-container">
                        <InputLabel id="amount-type-label">Type</InputLabel>
                        <Select
                            value={unit}
                            label="Type"
                            onChange={(event) => setUnit(event.target.value as EnumIngredientUnit)}
                        >
                            <MenuItem value={EnumIngredientUnit.Liter}>Liquide</MenuItem>
                            <MenuItem value={EnumIngredientUnit.Gram}>Solide</MenuItem>
                            <MenuItem value={EnumIngredientUnit.Unit}>Unité</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="actions-section">
                        <IconButton>
                            <CloseIcon onClick={() => setEditMode(false)} fontSize="large" />
                        </IconButton>
                        <IconButton onClick={onUpdateIngredient}>
                            <CheckIcon fontSize="large" />
                        </IconButton>
                    </div>
                </div>
            </EditIngredient>
            <List className="product-list">
                {data?.ingredient?.products?.map((product, index) => (
                    <ListItemButton
                        {...onLongPressListener}
                        selected={isLongPressing && selectedIndexies.includes(index)}
                        className="product-item"
                        data-index={index}
                    >
                        <ListItemAvatar className="product-image">
                            <Avatar
                                sx={{ height: '70px', width: '70px' }}
                                alt={`Avatar n°1`}
                                src={getUrlForImage(product?.image?.url)}
                            />
                        </ListItemAvatar>
                        {product?.favorite && <StarIcon className="favorite" />}
                        <ListItemText className="product-title" primary={product?.brand?.name} />
                        <p className="product-price">{product?.price}€</p>
                    </ListItemButton>
                ))}
            </List>
            <Snackbar
                open={Boolean(deleteProducts.data)}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Suppression réussie
                </Alert>
            </Snackbar>
            <Snackbar
                open={Boolean(deleteProducts.error)}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Suppression échouée
                </Alert>
            </Snackbar>
        </StyledIngredients>
    );
};

export default Products;
