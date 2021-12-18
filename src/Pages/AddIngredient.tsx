import React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import SwipeableViews from 'react-swipeable-views';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { AddIngredientSection } from './styles/Receipe';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface Ingredient {
    name: string;
    amount: string;
    unit: string;
    img: string;
    price: string;
}
interface IAddIngredientProps {
    open: boolean;
    handleClose: () => void;
    handleNext: () => void;
    handleBack: () => void;
    activeStep: number;
    ingredients: Ingredient[];
}
const AddIngredient: React.FC<IAddIngredientProps> = ({
    open,
    handleClose,
    handleNext,
    handleBack,
    activeStep,
    ingredients,
}) => {
    return (
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
                        <TextField className="amount-value" label="Quantité" variant="standard" />
                        <FormControl className="amount-type-container">
                            <InputLabel id="amount-type-label">Qte.</InputLabel>
                            <Select labelId="amount-type-label" id="amount-type" label="Qte.">
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </SwipeableViews>
                <div className="bottom-section">
                    <div>
                        <IconButton onClick={handleBack} className="btn-stepper">
                            <ArrowBack />
                        </IconButton>
                    </div>
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
                    <div>
                        <IconButton onClick={handleNext} className="btn-stepper">
                            <ArrowForward />
                        </IconButton>
                    </div>
                </div>
            </AddIngredientSection>
        </Dialog>
    );
};

export default AddIngredient;
