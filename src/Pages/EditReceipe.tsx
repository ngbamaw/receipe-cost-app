import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, FieldArray } from 'formik';
import StyledEditReceipe from './styles/EditReceipe';
import AddIngredient from './AddIngredient';
import { Receipe as ReceipeType, ReceipeEntry, useReceipeQuery } from '../generated/graphql';
import { getPrice, getTotalPrice, getUrlForImage } from '../utils';

const EditReceipe: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const input = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { receipeId } = useParams();

    const { data = {} } = useReceipeQuery({ id: receipeId as string });

    const receipe_entries = data?.receipe?.receipe_entries;
    const image = data?.receipe?.image?.url || '';
    const title = data?.receipe?.name || '';

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const onSubmit = async (values: Omit<ReceipeType, 'created_at' | 'updated_at'>) => {
        await new Promise((r) => setTimeout(r, 500));
        console.log(values);
    };

    const resizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length) {
            const length = e.target.value.length;
            e.target.style.width = `calc(${length}ch + 10px)`;
        } else e.target.style.width = '100px';
    };

    React.useEffect(() => {
        if (input.current) {
            const length = title.length;
            input.current.style.width = `calc(${length}ch + 10px)`;
        }
    }, [title]);

    React.useEffect(() => {
        if (activeStep === -1 || activeStep === 3) {
            setOpen(false);
            setActiveStep(0);
        }
    }, [activeStep]);

    return (
        <Formik initialValues={data.receipe as ReceipeType} onSubmit={onSubmit} enableReinitialize>
            {({ values }) => (
                <StyledEditReceipe>
                    <IconButton onClick={() => navigate('/receipes')} className="back-btn">
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                    <div className="edit-img">
                        <img className="receipe-image" src={getUrlForImage(image)} alt={title} />
                        <div className="filter">
                            <EditIcon className="edit-icon" fontSize="large" />
                        </div>
                    </div>
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
                        <IconButton className="cancel-btn">
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </header>
                    <div className="receipe-ingredients">
                        <FieldArray name="receipe_entries">
                            {({ insert, remove, push }) => (
                                <ul className="ingredient-list">
                                    {values?.receipe_entries?.length &&
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
                                                        {entry?.ingredient?.unit}
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
                                        <IconButton className="add-btn" onClick={handleClickOpen}>
                                            <AddIcon fontSize="large" />
                                        </IconButton>
                                        <p>Ajouter</p>
                                    </li>
                                </ul>
                            )}
                        </FieldArray>

                        <div className="price">
                            <p className="price-number">
                                {getTotalPrice(values?.receipe_entries as ReceipeEntry[])}€
                            </p>
                            <p className="price-label">Prix total</p>
                        </div>
                    </div>
                    <AddIngredient
                        open={open}
                        handleClose={() => setOpen(false)}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        activeStep={activeStep}
                        receipeEntries={receipe_entries as ReceipeEntry[]}
                    />
                </StyledEditReceipe>
            )}
        </Formik>
    );
};

export default EditReceipe;
