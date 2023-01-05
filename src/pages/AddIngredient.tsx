import React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import {
    Avatar,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import SwipeableViews from 'react-swipeable-views';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { AddIngredientSection } from './styles/AddIngredient';
import {
    EnumIngredientUnit,
    Ingredient,
    ReceipeEntry,
    useIngredientsQuery,
} from '../generated/graphql';
import { getUrlForImage } from '../utils';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const typeQuantity = {
    [EnumIngredientUnit.Gram]: ['g'],
    [EnumIngredientUnit.Liter]: ['L'],
    [EnumIngredientUnit.Unit]: [],
};
interface Result {
    ingredient: Ingredient;
    quantity: number;
}
interface IAddIngredientProps {
    open: boolean;
    onClose?: () => void;
    onNext?: () => void;
    onBack?: () => void;
    onFinished: (value: Result) => void;
    receipeEntries: ReceipeEntry[];
}
const AddIngredient: React.FC<IAddIngredientProps> = ({
    open,
    onClose,
    onNext,
    onBack,
    receipeEntries = [],
    onFinished,
}) => {
    const [openInternal, setOpenInternal] = React.useState(false);
    const [activeStep, setActiveStepInternal] = React.useState(0);
    const [selectedIngredient, setSelectedIngredient] = React.useState<number>(-1);
    const [quantity, setQuantity] = React.useState<string>('0');
    const numberOfStep = 2;

    const handleNext = () => {
        if (onNext) onNext();
        else setActiveStepInternal((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (onBack) onBack();
        else setActiveStepInternal((prevActiveStep) => prevActiveStep - 1);
    };

    const { data } = useIngredientsQuery();
    const ingredients = data?.ingredients?.filter((item) =>
        receipeEntries.every((r) => r.ingredient?.id !== item?.id),
    );

    React.useEffect(() => {
        if (activeStep === -1 || activeStep === numberOfStep) {
            onClose?.();
            setActiveStepInternal(0);
            setSelectedIngredient(-1);
            if (activeStep === numberOfStep) {
                onFinished({
                    ingredient: ingredients?.[selectedIngredient] as Ingredient,
                    quantity: Number(quantity),
                });
            }
        }
    }, [activeStep, selectedIngredient, quantity, ingredients, onFinished, onClose]);

    React.useEffect(() => {
        setOpenInternal(open);
    }, [open]);

    React.useEffect(() => {
        if (selectedIngredient > -1) {
            setActiveStepInternal(1);
        } else {
            setActiveStepInternal(0);
        }
    }, [selectedIngredient]);

    return (
        <Dialog fullScreen open={openInternal} onClose={onClose} TransitionComponent={Transition}>
            <AddIngredientSection>
                <SwipeableViews className="swiper" index={activeStep}>
                    <div className="step-1">
                        <List className="ingredient-list">
                            {ingredients?.map((ingredient, index) => (
                                <ListItemButton
                                    className="ingredient-item"
                                    onClick={() => setSelectedIngredient(index)}
                                    key={index}
                                >
                                    <ListItemAvatar className="ingredient-image">
                                        <Avatar src={getUrlForImage(ingredient?.image?.url)} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        className="ingredient-name"
                                        primary={ingredient?.name}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </div>
                    <div className="step-2">
                        <TextField
                            className="amount-value"
                            label="Quantité"
                            variant="standard"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <FormControl className="amount-type-container">
                            <InputLabel id="amount-type-label">Qte.</InputLabel>
                            <Select labelId="amount-type-label" id="amount-type" label="Qte.">
                                {typeQuantity[
                                    ingredients?.[selectedIngredient]?.unit ||
                                        EnumIngredientUnit.Unit
                                ].map((unit) => (
                                    <MenuItem value={unit}>{unit}</MenuItem>
                                ))}
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
                            steps={numberOfStep}
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
