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
import StoreIcon from '../assets/img/store-icon.png';
import StyledIngredients from './styles/Ingredients';
import setLongPress from '../useLongPress';
import {
    DeleteIngredientMutation,
    useStoresQuery,
    Store,
    useDeleteStoreMutation,
    useCreateStoreMutation,
    useUpdateStoreMutation,
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

const useDeleteStores = () => {
    const [data, setData] = React.useState<DeleteIngredientMutation[]>();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const deleteStore = useDeleteStoreMutation();

    const mutate = (stores: Store[]) => {
        setLoading(true);
        Promise.all(stores.map((store) => deleteStore.mutateAsync({ id: store?.id as string })))
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

interface StoreDialogProps {
    open: boolean;
    editMode?: boolean;
    value: string;
    onClose?: () => void;
    onEdit?: () => void;
    onValidate?: (value: string) => void;
    onCancel?: () => void;
}

const StoreDialog: React.FC<StoreDialogProps> = ({
    open,
    onClose,
    editMode,
    onEdit,
    onValidate,
    onCancel,
    value,
}) => {
    const [store, setStore] = React.useState(value);

    React.useEffect(() => {
        setStore(value);
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
                src={StoreIcon}
                alt="store"
            />
            <div style={{ position: 'relative' }}>
                {editMode ? (
                    <>
                        <TextField
                            style={{
                                width: 100,
                            }}
                            value={store}
                            onChange={(e) => setStore(e.target.value)}
                            variant="standard"
                        />
                        <div>
                            <IconButton onClick={onCancel}>
                                <CloseIcon />
                            </IconButton>
                            <IconButton onClick={() => onValidate?.(store)}>
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
const replaceById = (stores: Store[], newStore: Store) => {
    return stores.map((store) => (newStore.id === store.id ? newStore : store));
};

const Stores: React.FC = () => {
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [selectedIndexies, setSelectedIndexies] = React.useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const [isLongPressing, setIsLongPressing] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openNewStore, setOpenNewStore] = React.useState(false);
    const { data } = useStoresQuery();
    const queryClient = useQueryClient();
    const createStore = useCreateStoreMutation({
        onSuccess: ({ createStore: payload }) => {
            queryClient.setQueryData(['stores'], (oldData: any) => ({
                stores: [...oldData.stores, payload?.store],
            }));
        },
    });
    const updateStore = useUpdateStoreMutation({
        onSuccess: ({ updateStore: payload }) => {
            queryClient.setQueryData(['stores'], (oldData: any) => ({
                stores: replaceById(oldData.stores, payload?.store as Store),
            }));
        },
    });
    const deleteStores = useDeleteStores();

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
        deleteStores.mutate(selectedIndexies.map((index) => data?.stores?.[index]) as Store[]);
        setOpenAlert(false);
    }, [selectedIndexies, data, deleteStores]);

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

    const onCreateStore = React.useCallback(
        async (name) => {
            createStore.mutate({
                data: { data: { name } },
            });
        },
        [createStore],
    );

    const onUpdateStore = React.useCallback(
        async (name) => {
            await updateStore.mutateAsync({
                data: {
                    data: { name },
                    where: { id: data?.stores?.[selectedIndex]?.id as string },
                },
            });
        },
        [updateStore, data, selectedIndex],
    );

    return (
        <StyledIngredients>
            <StoreDialog
                open={selectedIndex > -1}
                onClose={() => setSelectedIndex(-1)}
                value={data?.stores?.[selectedIndex]?.name || ''}
                editMode={editMode}
                onEdit={() => setEditMode(true)}
                onCancel={() => setEditMode(false)}
                onValidate={onUpdateStore}
            />
            <StoreDialog
                open={openNewStore}
                onClose={() => setOpenNewStore(false)}
                value=""
                editMode={true}
                onCancel={() => setOpenNewStore(false)}
                onValidate={onCreateStore}
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
                    <IconButton onClick={() => setOpenNewStore(true)} className="add-btn">
                        <AddIcon fontSize="large" className="add-icon" />
                    </IconButton>
                )}
            </header>
            <List className="ingredients-list">
                {data?.stores?.map((store, index) => (
                    <ListItemButton
                        {...onLongPressListener}
                        selected={isLongPressing && selectedIndexies.includes(index)}
                        className="receipe-item"
                        data-index={index}
                    >
                        <ListItemText className="ingredient-title" primary={store?.name} />
                    </ListItemButton>
                ))}
            </List>
            <Snackbar
                open={Boolean(deleteStores.data)}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Suppression réussie
                </Alert>
            </Snackbar>
            <Snackbar
                open={Boolean(deleteStores.error)}
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

export default Stores;
