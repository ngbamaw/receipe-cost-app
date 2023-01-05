import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import StyledProduct from './styles/Product';
import { useProductQuery } from '../generated/graphql';
import { convertUnit, getUrlForImage } from '../utils';

const Product: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredientId, productId } = useParams();
    const { data } = useProductQuery({ id: productId as string });

    return (
        <StyledProduct>
            <IconButton
                onClick={() => navigate(`/ingredients/${ingredientId}`)}
                className="back-btn"
            >
                <ArrowBackIcon fontSize="large" />
            </IconButton>
            <img
                className="ingredient-image"
                src={getUrlForImage(data?.product?.image?.url)}
                alt="Ingredient"
            />
            <div className="info">
                <p className="info-label">Marque :</p>
                <p className="info-value">{data?.product?.brand?.name}</p>
            </div>
            <div className="info">
                <p className="info-label">Prix :</p>
                <p className="info-value">{data?.product?.price?.toFixed(2)}€</p>
            </div>
            <div className="info">
                <p className="info-label">Magasin :</p>
                <p className="info-value">{data?.product?.store?.name}</p>
            </div>
            <div className="info">
                <p className="info-label">Quantité :</p>
                <p className="info-value">
                    {data?.product?.quantity}
                    {convertUnit(data?.product?.ingredient?.unit)}
                </p>
            </div>

            <IconButton onClick={() => navigate(`${location.pathname}/edit`)} className="edit-btn">
                <EditIcon className="edit-icon" fontSize="large" />
            </IconButton>
        </StyledProduct>
    );
};

export default Product;
