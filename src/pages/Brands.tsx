import React from 'react';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
    IconButton,
    ListItemButton,
    ListItemText,
    TextField,
    Dialog,
    Snackbar,
    Alert,
} from '@mui/material';
import BrandIcon from '../assets/img/brand-icon.png';
import StyledIngredients from './styles/Ingredients';
import setLongPress from '../useLongPress';
import {
    DeleteIngredientMutation,
    useBrandsQuery,
    Brand,
    useDeleteBrandMutation,
    useCreateBrandMutation,
    useUpdateBrandMutation,
} from '../generated/graphql';
import AlertDialog from '../components/AlertDialog';
import EditIcon from '@mui/icons-material/Edit';
import { useQueryClient } from 'react-query';

const getIndex = (element: HTMLElement) => {
    let current = element;
    while (!current.dataset.index) {
        current = current.parentElement as HTMLElement;
    }

    return parseInt(current.dataset.index);
};

const useDeleteBrands = () => {
    const [data, setData] = React.useState<DeleteIngredientMutation[]>();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const deleteBrand = useDeleteBrandMutation();

    const mutate = (brands: Brand[]) => {
        setLoading(true);
        Promise.all(brands.map((brand) => deleteBrand.mutateAsync({ id: brand?.id as string })))
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

interface BrandDialogProps {
    open: boolean;
    editMode?: boolean;
    value: string;
    onClose?: () => void;
    onEdit?: () => void;
    onValidate?: (value: string) => void;
    onCancel?: () => void;
}

const BrandDialog: React.FC<BrandDialogProps> = ({
    open,
    onClose,
    editMode,
    onEdit,
    onValidate,
    onCancel,
    value,
}) => {
    const [brand, setBrand] = React.useState(value);

    React.useEffect(() => {
        setBrand(value);
    }, [value, editMode]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    alignItems: 'center',
                    width: 200,
                    gap: 3,
                    p: 2,
                },
            }}
        >
            <img
                style={{
                    height: '75px',
                }}
                src={BrandIcon}
                alt="brand"
            />
            <div style={{ position: 'relative' }}>
                {editMode ? (
                    <>
                        <TextField
                            style={{
                                width: 100,
                            }}
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            variant="standard"
                        />
                        <div>
                            <IconButton onClick={onCancel}>
                                <CloseIcon />
                            </IconButton>
                            <IconButton onClick={() => onValidate?.(brand)}>
                                <CheckIcon />
                            </IconButton>
                        </div>
                    </>
                ) : (
                    <>
                        <p>{value}</p>
                        <IconButton
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                transform: 'translateX(100%) translateY(-25%)',
                            }}
                            onClick={onEdit}
                        >
                            <EditIcon />
                        </IconButton>
                    </>
                )}
            </div>
        </Dialog>
    );
};
const replaceById = (brands: Brand[], newBrand: Brand) => {
    return brands.map((brand) => (newBrand.id === brand.id ? newBrand : brand));
};

const Brands: React.FC = () => {
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [selectedIndexies, setSelectedIndexies] = React.useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const [isLongPressing, setIsLongPressing] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openNewBrand, setOpenNewBrand] = React.useState(false);
    const { data } = useBrandsQuery();
    const queryClient = useQueryClient();
    const createBrand = useCreateBrandMutation({
        onSuccess: ({ createBrand: payload }) => {
            queryClient.setQueryData(['brands'], (oldData: any) => ({
                brands: [...oldData.brands, payload?.brand],
            }));
        },
    });
    const updateBrand = useUpdateBrandMutation({
        onSuccess: ({ updateBrand: payload }) => {
            queryClient.setQueryData(['brands'], (oldData: any) => ({
                brands: replaceById(oldData.brands, payload?.brand as Brand),
            }));
        },
    });
    const deleteIngredients = useDeleteBrands();

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
        deleteIngredients.mutate(selectedIndexies.map((index) => data?.brands?.[index]) as Brand[]);
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
            setSelectedIndex(index);
        }
    };
    const onLongPressListener = setLongPress(onLongPress, onClick);
    React.useEffect(() => {
        if (isLongPressing && selectedIndexies.length === 0) {
            setIsLongPressing(false);
        }
    }, [selectedIndexies, isLongPressing]);

    const onCreateBrand = React.useCallback(
        async (name) => {
            createBrand.mutate({
                data: { data: { name } },
            });
        },
        [createBrand],
    );

    const onUpdateBrand = React.useCallback(
        async (name) => {
            await updateBrand.mutateAsync({
                data: {
                    data: { name },
                    where: { id: data?.brands?.[selectedIndex]?.id as string },
                },
            });
        },
        [updateBrand, data, selectedIndex],
    );

    return (
        <StyledIngredients>
            <BrandDialog
                open={selectedIndex > -1}
                onClose={() => setSelectedIndex(-1)}
                value={data?.brands?.[selectedIndex]?.name || ''}
                editMode={editMode}
                onEdit={() => setEditMode(true)}
                onCancel={() => setEditMode(false)}
                onValidate={onUpdateBrand}
            />
            <BrandDialog
                open={openNewBrand}
                onClose={() => setOpenNewBrand(false)}
                value=""
                editMode={true}
                onCancel={() => setEditMode(false)}
                onValidate={onCreateBrand}
            />

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
                    <IconButton onClick={() => setOpenNewBrand(true)} className="add-btn">
                        <AddIcon fontSize="large" className="add-icon" />
                    </IconButton>
                )}
            </header>
            <List className="ingredients-list">
                {data?.brands?.map((brand, index) => (
                    <ListItemButton
                        {...onLongPressListener}
                        selected={isLongPressing && selectedIndexies.includes(index)}
                        className="receipe-item"
                        data-index={index}
                    >
                        <ListItemText className="ingredient-title" primary={brand?.name} />
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

export default Brands;
