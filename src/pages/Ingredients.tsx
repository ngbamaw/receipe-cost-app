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
    DialogTitle,
    DialogContent,
    Dialog,
    DialogContentText,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StyledIngredients from './styles/Ingredients';
import setLongPress from '../useLongPress';
import {
    useIngredientsQuery,
    useCreateIngredientMutation,
    EnumIngredientUnit,
    useDeleteIngredientMutation,
    Ingredient,
    DeleteIngredientMutation,
} from '../generated/graphql';
import { getUrlForImage, useUploadMutation } from '../utils';
import PicturePicker, { Picture } from './PicturePicker';
import AlertDialog from '../components/AlertDialog';

const getIndex = (element: HTMLElement) => {
    let current = element;
    while (!current.dataset.index) {
        current = current.parentElement as HTMLElement;
    }

    return parseInt(current.dataset.index);
};

const useDeleteIngredients = () => {
    const [data, setData] = React.useState<DeleteIngredientMutation[]>();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const deleteIngredient = useDeleteIngredientMutation();

    const mutate = (ingredients: Ingredient[]) => {
        setLoading(true);
        Promise.all(
            ingredients.map((ingredient) =>
                deleteIngredient.mutateAsync({ id: ingredient?.id as string }),
            ),
        )
            .then((result) => {
                setLoading(false);
                setData(result);
            })
            .catch((err) => {
                console.error({ err });
                setError(err);
            });
    };
    return { mutate, data, error, loading };
};

const Ingredients: React.FC = () => {
    const [selectedIndexies, setSelectedIndexies] = React.useState<number[]>([]);
    const [isLongPressing, setIsLongPressing] = React.useState(false);
    const [newIngredient, setNewIngredient] = React.useState('');
    const [unit, setUnit] = React.useState<EnumIngredientUnit>(EnumIngredientUnit.Gram);
    const [openPhotoPicker, setOpenPhotoPicker] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openNewIngredient, setOpenNewIngredient] = React.useState(false);
    const [newPicture, setNewPicture] = React.useState<Picture>();
    const navigate = useNavigate();
    const { data } = useIngredientsQuery();
    const { ingredientId } = useParams();
    const createIngredient = useCreateIngredientMutation();
    const upload = useUploadMutation();
    const deleteIngredients = useDeleteIngredients();

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
    const onDelete = React.useCallback(async () => {
        deleteIngredients.mutate(
            selectedIndexies.map((index) => data?.ingredients?.[index]) as Ingredient[],
        );
        setOpenAlert(false);
    }, [selectedIndexies, data, deleteIngredients]);

    const handleClickOpen = () => {
        setOpenAlert(true);
    };

    const handleClose = () => {
        setOpenAlert(false);
    };
    const onClick = (e: any) => {
        const index = getIndex(e.target as HTMLElement);
        if (isLongPressing) {
            if (!selectedIndexies.includes(index)) {
                setSelectedIndexies([...selectedIndexies, index]);
            } else {
                setSelectedIndexies(selectedIndexies.filter((item) => item !== index));
            }
        } else {
            navigate(`${data?.ingredients?.[index]?.id}`);
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
            <Dialog
                open={openNewIngredient}
                onClose={() => setOpenNewIngredient(false)}
                PaperProps={{
                    sx: {
                        alignItems: 'center',
                        gap: 3,
                        p: 2,
                    },
                }}
            >
                <IconButton onClick={() => setOpenPhotoPicker(true)}>
                    {newPicture ? (
                        <Avatar sx={{ height: '70px', width: '70px' }} src={newPicture.src} />
                    ) : (
                        <Avatar sx={{ height: '70px', width: '70px' }}>
                            <AddAPhotoIcon fontSize="large" />
                        </Avatar>
                    )}
                </IconButton>
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
                <div className="actions-section">
                    <IconButton className="validate-btn" onClick={onCreateIngredient}>
                        <CheckIcon fontSize="large" />
                    </IconButton>
                    <IconButton className="cancel-btn" onClick={() => setOpenNewIngredient(false)}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </div>
            </Dialog>
            <AlertDialog
                open={openAlert}
                title="Est-ce que tu veux supprimer cet ingrédient ?"
                description="Cette action est irréversible"
                onClose={handleClose}
                onValidate={onDelete}
                onCancel={handleClose}
            />
            <header className="header-ingredients">
                <div className="search-input">
                    <SearchIcon className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>
                {isLongPressing ? (
                    <IconButton className="del-btn" onClick={handleClickOpen}>
                        <DeleteIcon fontSize="large" className="del-icon" />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => setOpenNewIngredient(true)} className="add-btn">
                        <AddIcon fontSize="large" className="add-icon" />
                    </IconButton>
                )}
            </header>
            <List className="ingredients-list">
                {data?.ingredients?.map((ingredient, index) => (
                    <ListItemButton
                        {...onLongPressListener}
                        selected={isLongPressing && selectedIndexies.includes(index)}
                        className="ingredient-item"
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
                    </ListItemButton>
                ))}
            </List>
            <Snackbar
                open={Boolean(deleteIngredients.data)}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Suppression réussie
                </Alert>
            </Snackbar>
            <Snackbar
                open={Boolean(deleteIngredients.error)}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Suppression échouée
                </Alert>
            </Snackbar>
        </StyledIngredients>
    );
};

export default Ingredients;
