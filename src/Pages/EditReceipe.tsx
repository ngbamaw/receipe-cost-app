import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray, FieldInputProps } from 'formik';
import StyledEditReceipe from './styles/EditReceipe';
import AvatarImage from '../assets/img/img-avatar.png';
import AddIngredient, { Ingredient } from './AddIngredient';

interface Data {
    title: string;
    img: string;
    ingredients: Ingredient[];
}

const data: Data = {
    title: 'Tortilla de patatas',
    img: AvatarImage,
    ingredients: [
        {
            name: 'Patatas',
            amount: '1',
            unit: 'kg',
            img: AvatarImage,
            price: '1.50',
        },
        {
            name: 'Patatas',
            amount: '1',
            unit: 'kg',
            img: AvatarImage,
            price: '1.75',
        },
    ],
};

const Receipe: React.FC = () => {
    const { title: initialTitle, img, ingredients } = data;
    const [title, setTitle] = React.useState(initialTitle);
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const input = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const onSubmit = async (values: Data) => {
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
        <Formik initialValues={data} onSubmit={onSubmit}>
            {({ values }) => (
                <StyledEditReceipe>
                    <IconButton onClick={() => navigate('/receipes')} className="back-btn">
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                    <div className="edit-img">
                        <img className="receipe-image" src={img} alt={title} />
                        <div className="filter">
                            <EditIcon className="edit-icon" fontSize="large" />
                        </div>
                    </div>
                    <header className="receipe-header">
                        <Field className="receipe-title" name="title" placeholder="Nom">
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
                        <FieldArray name="ingredients">
                            {({ insert, remove, push }) => (
                                <ul className="ingredient-list">
                                    {values.ingredients.length > 0 &&
                                        values.ingredients.map((ingredient, index) => (
                                            <li className="ingredient-item" key={index}>
                                                <div className="ingredient-label">
                                                    <img
                                                        className="ingredient-image"
                                                        src={ingredient.img}
                                                        alt={ingredient.name}
                                                    />
                                                    <p className="ingredient-name">
                                                        {ingredient.name}
                                                    </p>
                                                </div>
                                                <div className="ingredient-amount">
                                                    <span className="ingredient-number">
                                                        {ingredient.amount}
                                                    </span>
                                                    <span className="ingredient-unit">
                                                        {ingredient.unit}
                                                    </span>
                                                </div>
                                                <div className="ingredient-price">
                                                    <span>{ingredient.price}</span>
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
                            <p className="price-number">25€</p>
                            <p className="price-label">Prix total</p>
                        </div>
                    </div>
                    <AddIngredient
                        open={open}
                        handleClose={() => setOpen(false)}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        activeStep={activeStep}
                        ingredients={ingredients}
                    />
                </StyledEditReceipe>
            )}
        </Formik>
    );
};

export default Receipe;
