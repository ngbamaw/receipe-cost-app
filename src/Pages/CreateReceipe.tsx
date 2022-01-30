import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StyledCreateReceipe from './styles/CreateReceipe';
import AvatarImage from '../assets/img/img-avatar.png';
import AddIngredient, { Ingredient } from './AddIngredient';

const data = {
    title: 'Tortilla de patatas',
    img: AvatarImage,
    ingredients: [],
};

const CreateReceipe: React.FC = () => {
    const [title, setTitle] = React.useState('');
    const [img, setImg] = React.useState('');
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
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

    React.useEffect(() => {
        if (activeStep === -1 || activeStep === 3) {
            setOpen(false);
            setActiveStep(0);
        }
    }, [activeStep]);

    return (
        <StyledCreateReceipe>
            <IconButton onClick={() => navigate('/receipes')} className="back-btn">
                <ArrowBackIcon fontSize="large" />
            </IconButton>
            <IconButton className="add-photo-btn">
                <AddAPhotoIcon fontSize="large" />
            </IconButton>
            {/* <img className="receipe-image" src={img} alt={title} /> */}
            <header className="receipe-header">
                <input
                    className="receipe-title"
                    placeholder="Nom"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <IconButton className="edit-btn">
                    <CheckIcon fontSize="large" />
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
                    <p className="price-number">0€</p>
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
        </StyledCreateReceipe>
    );
};

export default CreateReceipe;