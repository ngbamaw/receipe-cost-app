import React from 'react';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Alert,
    Avatar,
    IconButton,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StyledReceipes from './styles/Receipes';
import setLongPress from '../useLongPress';
import {
    DeleteReceipeMutation,
    Receipe,
    useDeleteReceipeMutation,
    useReceipesQuery,
} from '../generated/graphql';
import { getUrlForImage } from '../utils';
import AlertDialog from '../components/AlertDialog';

const getIndex = (element: HTMLElement) => {
    let current = element;
    while (!current.dataset.index) {
        current = current.parentElement as HTMLElement;
    }

    return parseInt(current.dataset.index);
};

const useDeleteReceipes = () => {
    const [data, setData] = React.useState<DeleteReceipeMutation[]>();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const deleteReceipe = useDeleteReceipeMutation();

    const mutate = (receipes: Receipe[]) => {
        setLoading(true);
        Promise.all(
            receipes.map((receipe) => deleteReceipe.mutateAsync({ id: receipe?.id as string })),
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

const Receipes: React.FC = () => {
    const [selectedIndexies, setSelectedIndexies] = React.useState<number[]>([]);
    const [isLongPressing, setIsLongPressing] = React.useState(false);
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = React.useState(false);
    const { data } = useReceipesQuery();
    const deleteReceipes = useDeleteReceipes();

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
            navigate(`/receipes/${data?.receipes?.[index]?.id}`);
        }
    };

    const onDelete = React.useCallback(async () => {
        deleteReceipes.mutate(
            selectedIndexies.map((index) => data?.receipes?.[index]) as Receipe[],
        );
        setOpenAlert(false);
    }, [selectedIndexies, data, deleteReceipes]);

    const onLongPressListener = setLongPress(onLongPress, onClick);
    React.useEffect(() => {
        if (isLongPressing && selectedIndexies.length === 0) {
            setIsLongPressing(false);
        }
    }, [selectedIndexies, isLongPressing]);
    return (
        <StyledReceipes>
            <AlertDialog
                open={openAlert}
                title="Est-ce que tu veux supprimer cet ingrédient ?"
                description="Cette action est irréversible"
                onClose={handleClose}
                onValidate={onDelete}
                onCancel={handleClose}
            />
            <header className="header-receipes">
                <div className="search-input">
                    <SearchIcon className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>
                {isLongPressing ? (
                    <IconButton className="del-btn" onClick={handleClickOpen}>
                        <DeleteIcon fontSize="large" className="del-icon" />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => navigate('/receipes/new')} className="add-btn">
                        <AddIcon fontSize="large" className="add-icon" />
                    </IconButton>
                )}
            </header>
            <List className="receipes-list">
                {data?.receipes?.map((receipe, index) => (
                    <ListItemButton
                        {...onLongPressListener}
                        selected={isLongPressing && selectedIndexies.includes(index)}
                        className="receipe-item"
                        data-index={index}
                    >
                        <ListItemAvatar className="receipe-image">
                            <Avatar
                                sx={{ height: '70px', width: '70px' }}
                                alt={receipe?.name}
                                src={getUrlForImage(receipe?.image?.url)}
                            />
                        </ListItemAvatar>
                        <ListItemText className="receipe-title" primary={receipe?.name} />
                    </ListItemButton>
                ))}
            </List>
            <Snackbar
                open={Boolean(deleteReceipes.data)}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Suppression réussie
                </Alert>
            </Snackbar>
            <Snackbar
                open={Boolean(deleteReceipes.error)}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Suppression échouée
                </Alert>
            </Snackbar>
        </StyledReceipes>
    );
};

export default Receipes;
