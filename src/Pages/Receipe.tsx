import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import { IconButton, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SwipeableViews from 'react-swipeable-views';
import StyledReceipe, { AddIngredientSection } from './styles/Receipe';
import AvatarImage from '../assets/img/img-avatar.png';

const data = {
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
            price: '1.50',
        },
    ],
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Receipe: React.FC = () => {
    const { title, img, ingredients } = data;
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (activeStep === -1 || activeStep === 3) {
            setOpen(false);
            setActiveStep(0);
        }
    }, [activeStep]);

    return (
        <StyledReceipe>
            <IconButton className="back-btn">
                <ArrowBackIcon fontSize="large" />
            </IconButton>
            <img className="receipe-image" src={img} alt={title} />
            <header className="receipe-header">
                <h1 className="receipe-title">{title}</h1>
                <IconButton className="edit-btn">
                    <EditIcon fontSize="large" />
                </IconButton>
            </header>
            <div className="receipe-ingredients">
                <ul className="ingredient-list">
                    {ingredients.map((ingredient, index) => (
                        <li className="ingredient-item" key={index}>
                            <div className="ingredient-label">
                                <img
                                    className="ingredient-image"
                                    src={ingredient.img}
                                    alt={ingredient.name}
                                />
                                <p className="ingredient-name">{ingredient.name}</p>
                            </div>
                            <div className="ingredient-amount">
                                <span className="ingredient-number">{ingredient.amount}</span>
                                <span className="ingredient-unit">{ingredient.unit}</span>
                            </div>
                            <div className="ingredient-price">
                                <span>{ingredient.price}</span>
                                <span>€</span>
                            </div>
                        </li>
                    ))}
                    <li className="add-line">
                        <IconButton className="add-btn" onClick={handleClickOpen}>
                            <AddIcon fontSize="large" />
                        </IconButton>
                        <p>Ajouter</p>
                    </li>
                </ul>

                <div className="price">
                    <p className="price-number">25€</p>
                    <p className="price-label">Prix total</p>
                </div>
            </div>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AddIngredientSection>
                    <SwipeableViews className="swiper" index={activeStep}>
                        <div className="step-1">
                            <ul className="ingredient-list">
                                {ingredients.map((ingredient, index) => (
                                    <li className="ingredient-item" key={index}>
                                        <div className="ingredient-label">
                                            <img
                                                className="ingredient-image"
                                                src={ingredient.img}
                                                alt={ingredient.name}
                                            />
                                            <p className="ingredient-name">{ingredient.name}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="step-2">
                            <ul className="ingredient-list">
                                {ingredients.map((ingredient, index) => (
                                    <li className="ingredient-item" key={index}>
                                        <div className="ingredient-label">
                                            <img
                                                className="ingredient-image"
                                                src={ingredient.img}
                                                alt={ingredient.name}
                                            />
                                            <p className="ingredient-name">{ingredient.name}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="step-3">
                            <TextField label="Quantité" variant="standard" />
                        </div>
                    </SwipeableViews>
                    <div className="bottom-section">
                        <IconButton onClick={handleBack} className="btn-stepper">
                            <ArrowBack />
                        </IconButton>
                        <div className="bottom-info">
                            <p>Ajouter un ingrédient</p>
                            <MobileStepper
                                variant="dots"
                                steps={3}
                                position="static"
                                activeStep={activeStep}
                                sx={{ maxWidth: 400, flexGrow: 1 }}
                                nextButton={<></>}
                                backButton={<></>}
                            />
                        </div>
                        <IconButton onClick={handleNext} className="btn-stepper">
                            <ArrowForward />
                        </IconButton>
                    </div>
                </AddIngredientSection>
            </Dialog>
        </StyledReceipe>
    );
};

export default Receipe;
