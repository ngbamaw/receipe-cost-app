import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import StyledIngredient from './styles/Ingredient';

const Ingredient: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredientId } = useParams();

    return (
        <StyledIngredient>
            <IconButton
                onClick={() => navigate(`/ingredients/${ingredientId}`)}
                className="back-btn"
            >
                <ArrowBackIcon fontSize="large" />
            </IconButton>
            <img
                className="ingredient-image"
                src="https://via.placeholder.com/150"
                alt="Ingredient"
            />
            <div className="info">
                <p className="info-label">Marque :</p>
                <p className="info-value">Repère</p>
            </div>
            <div className="info">
                <p className="info-label">Prix :</p>
                <p className="info-value">8€</p>
            </div>
            <div className="info">
                <p className="info-label">Magasin :</p>
                <p className="info-value">Eleclerc</p>
            </div>
            <div className="info">
                <p className="info-label">Quantité :</p>
                <p className="info-value">8</p>
            </div>

            <IconButton onClick={() => navigate(`${location.pathname}/edit`)} className="edit-btn">
                <EditIcon className="edit-icon" fontSize="large" />
            </IconButton>
        </StyledIngredient>
    );
};

export default Ingredient;
