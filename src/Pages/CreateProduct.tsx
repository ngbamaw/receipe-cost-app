import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IconButton, TextField } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import StyledCreateIngredient from './styles/CreateIngredient';

const CreateProduct: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredientId } = useParams();

    return (
        <StyledCreateIngredient>
            <IconButton
                onClick={() => navigate(`/ingredients/${ingredientId}`)}
                className="back-btn"
            >
                <ArrowBackIcon fontSize="large" />
            </IconButton>
            <IconButton className="add-photo-btn">
                <AddAPhotoIcon fontSize="large" />
            </IconButton>
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
        </StyledCreateIngredient>
    );
};

export default CreateProduct;
