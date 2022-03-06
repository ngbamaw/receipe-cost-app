import React from 'react';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
    Avatar,
    FormControl,
    IconButton,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StyledIngredients from './styles/Ingredients';
import setLongPress from '../useLongPress';
import {
    useIngredientsQuery,
    useCreateIngredientMutation,
    EnumIngredientUnit,
} from '../generated/graphql';
import { getUrlForImage, useUploadMutation } from '../utils';
import PicturePicker, { Picture } from './PicturePicker';

const getIndex = (element: HTMLElement) => {
    let current = element;
    while (!current.dataset.index) {
        current = current.parentElement as HTMLElement;
    }

    return parseInt(current.dataset.index);
};

const Ingredients: React.FC = () => {
    const [selectedIndexies, setSelectedIndexies] = React.useState<number[]>([]);
    const [isLongPressing, setIsLongPressing] = React.useState(false);
    const [newIngredient, setNewIngredient] = React.useState('');
    const [unit, setUnit] = React.useState<EnumIngredientUnit>(EnumIngredientUnit.Gram);
    const [openPhotoPicker, setOpenPhotoPicker] = React.useState(false);
    const [newPicture, setNewPicture] = React.useState<Picture>();
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = useIngredientsQuery();
    const { ingredientId } = useParams();
    const createIngredient = useCreateIngredientMutation();
    const upload = useUploadMutation();

    /*
    const onLongPress = (index: number) => () => {
        if (!isLongPressing) {
            setSelectedIndex([index]);
            setIsLongPressing(true);
        }
    };


    const onClick = (index: number) => () => {
        if (isLongPressing) {
            if (!selectedIndex.includes(index)) {
                setSelectedIndex([...selectedIndex, index]);
            } else {
                setSelectedIndex(selectedIndex.filter((item) => item !== index));
            }
        } else {
            navigate(`${location.pathname}/${index}`);
        }
    };
    */

    const onPicture = async (picture: Picture) => {
        setNewPicture(picture);
    };

    const onLongPress = React.useCallback(
        (e) => {
            const index = getIndex(e.target as HTMLElement);
            if (!isLongPressing) {
                setSelectedIndexies([index]);
                setIsLongPressing(true);
            }
        },
        [isLongPressing],
    );

    const onClick = (e: any) => {
        const index = getIndex(e.target as HTMLElement);
        if (isLongPressing) {
            if (!selectedIndexies.includes(index)) {
                setSelectedIndexies([...selectedIndexies, index]);
            } else {
                setSelectedIndexies(selectedIndexies.filter((item) => item !== index));
            }
        } else {
            navigate(`${location.pathname}/${data?.ingredients?.[index]?.id}`);
        }
    };
    const onLongPressListener = setLongPress(onLongPress, onClick);
    React.useEffect(() => {
        if (isLongPressing && selectedIndexies.length === 0) {
            setIsLongPressing(false);
        }
    }, [selectedIndexies, isLongPressing]);

    const onCreateIngredient = React.useCallback(
        async (e) => {
            e.preventDefault();
            if (newPicture) {
                const image = await upload.mutateAsync({ file: newPicture.file });
                createIngredient.mutate({
                    input: { data: { name: newIngredient, unit, image: image[0].id } },
                });
                setNewIngredient('');
            }
        },
        [newIngredient, createIngredient, unit, newPicture, upload],
    );
    return (
        <StyledIngredients>
            <PicturePicker
                onPicture={onPicture}
                open={openPhotoPicker}
                onClose={() => setOpenPhotoPicker(false)}
            />
            <header className="header-ingredients">
                <div className="search-input">
                    <SearchIcon className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>
                {isLongPressing ? (
                    <IconButton className="del-btn">
                        <DeleteIcon fontSize="large" className="del-icon" />
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => navigate(`${location.pathname}/new`)}
                        className="add-btn"
                    >
                        <AddIcon fontSize="large" className="add-icon" />
                    </IconButton>
                )}
            </header>
            {ingredientId && <h2 className="ingredient-name">Oeuf</h2>}
            <List className="ingredients-list">
                <ListItemButton className="ingredient-item" key="new">
                    <ListItemAvatar
                        onClick={() => setOpenPhotoPicker(true)}
                        className="ingredient-image picture-picker"
                    >
                        {newPicture ? (
                            <Avatar sx={{ height: '70px', width: '70px' }} src={newPicture.src} />
                        ) : (
                            <Avatar sx={{ height: '70px', width: '70px' }}>
                                <AddAPhotoIcon fontSize="large" />
                            </Avatar>
                        )}
                    </ListItemAvatar>
                    <TextField
                        variant="standard"
                        label="Nouvelle ingredient"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                    />
                    <FormControl className="amount-type-container">
                        <InputLabel id="amount-type-label">Type</InputLabel>
                        <Select
                            value={unit}
                            label="Type"
                            onChange={(event) => setUnit(event.target.value as EnumIngredientUnit)}
                        >
                            <MenuItem value={EnumIngredientUnit.Liter}>Liquide</MenuItem>
                            <MenuItem value={EnumIngredientUnit.Gram}>Solide</MenuItem>
                            <MenuItem value={EnumIngredientUnit.Unit}>Unité</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton className="validate-btn" onClick={onCreateIngredient}>
                        <CheckIcon fontSize="large" />
                    </IconButton>
                    <IconButton className="cancel-btn">
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </ListItemButton>
                {data?.ingredients?.map((ingredient, index) => (
                    <ListItemButton
                        {...onLongPressListener}
                        selected={isLongPressing && selectedIndexies.includes(index)}
                        className="receipe-item"
                        data-index={index}
                    >
                        <ListItemAvatar className="ingredient-image">
                            <Avatar
                                sx={{ height: '70px', width: '70px' }}
                                alt={`Avatar n°1`}
                                src={getUrlForImage(ingredient?.image?.url)}
                            />
                        </ListItemAvatar>
                        {ingredientId && <StarIcon className="favorite" />}
                        <ListItemText className="ingredient-title" primary={ingredient?.name} />
                        <p className="ingredient-price">5€</p>
                    </ListItemButton>
                ))}
            </List>
        </StyledIngredients>
    );
};

export default Ingredients;
