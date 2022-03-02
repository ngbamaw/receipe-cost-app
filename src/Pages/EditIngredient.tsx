import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import StyledEditIngredient from './styles/EditIngredient';

const EditIngredient: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredientId } = useParams();

    return (
        <StyledEditIngredient>
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
                <TextField className="info-value" variant="standard" />
            </div>
            <div className="info">
                <p className="info-label">Prix :</p>
                <TextField className="info-value" variant="standard" />
                <p className="info-value">€</p>
            </div>
            <div className="info">
                <p className="info-label">Magasin :</p>
                <TextField className="info-value" variant="standard" />
            </div>
            <div className="info">
                <p className="info-label">Quantité :</p>
                <TextField className="info-value" variant="standard" />
            </div>

            <div className="btns-action">
                <IconButton className="validate-btn">
                    <CheckIcon className="validate-icon" fontSize="large" />
                </IconButton>
                <IconButton className="cancel-btn">
                    <CloseIcon className="cancel-icon" fontSize="large" />
                </IconButton>
            </div>
        </StyledEditIngredient>
    );
};

export default EditIngredient;
