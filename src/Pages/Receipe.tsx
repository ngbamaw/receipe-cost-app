import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import StyledReceipe from './styles/Receipe';
import AddIngredient from './AddIngredient';
import { ReceipeEntry, useReceipeQuery } from '../generated/graphql';
import { getPrice, getTotalPrice, getUrlForImage } from '../utils';

const Receipe: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();
    const { receipeId } = useParams();

    const { data } = useReceipeQuery({ id: receipeId as string });

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

    React.useEffect(() => {
        if (activeStep === -1 || activeStep === 3) {
            setOpen(false);
            setActiveStep(0);
        }
    }, [activeStep]);

    return (
        <StyledReceipe>
            <IconButton onClick={() => navigate('/receipes')} className="back-btn">
                <ArrowBackIcon fontSize="large" />
            </IconButton>
            <img className="receipe-image" src={getUrlForImage(image)} alt={title} />
            <header className="receipe-header">
                <h1 className="receipe-title">{title}</h1>
                <IconButton
                    onClick={() => navigate(`/receipes/${receipeId}/edit`)}
                    className="edit-btn"
                >
                    <EditIcon fontSize="large" />
                </IconButton>
            </header>
            <div className="receipe-ingredients">
                <ul className="ingredient-list">
                    {receipe_entries?.map((entry, index) => (
                        <li className="ingredient-item" key={index}>
                            <div className="ingredient-label">
                                <img
                                    className="ingredient-image"
                                    src={getUrlForImage(entry?.ingredient?.image?.url)}
                                    alt={entry?.ingredient?.name}
                                />
                                <p className="ingredient-name">{entry?.ingredient?.name}</p>
                            </div>
                            <div className="ingredient-amount">
                                <span className="ingredient-number">{entry?.quantity}</span>
                                <span className="ingredient-unit">{entry?.ingredient?.unit}</span>
                            </div>
                            <div className="ingredient-price">
                                <span>
                                    {getPrice(
                                        entry?.ingredient?.products?.[0]?.price || 1,
                                        entry?.quantity,
                                        entry?.ingredient?.products?.[0]?.quantity || 1,
                                    )}
                                </span>
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
                    <p className="price-number">
                        {getTotalPrice(receipe_entries as ReceipeEntry[])}€
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
        </StyledReceipe>
    );
};

export default Receipe;
