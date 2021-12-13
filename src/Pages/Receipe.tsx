import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import StyledReceipe from './styles/Receipe';
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
const Receipe: React.FC = () => {
    const { title, img, ingredients } = data;
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
                        <IconButton className="add-btn">
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
        </StyledReceipe>
    );
};

export default Receipe;
