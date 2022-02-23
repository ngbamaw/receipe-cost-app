import React from 'react';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, IconButton, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StyledReceipes from './styles/Receipes';
import AvatarImage from '../assets/img/img-avatar.png';
import setLongPress from '../useLongPress';
import { useReceipesQuery } from '../generated/graphql';
import { getUrlForImage } from '../utils';

const getIndex = (element: HTMLElement) => {
    let current = element;
    while (!current.dataset.index) {
        current = current.parentElement as HTMLElement;
    }

    return parseInt(current.dataset.index);
};

const Receipes: React.FC = () => {
    const [selectedIndexies, setSelectedIndexies] = React.useState<number[]>([]);
    const [isLongPressing, setIsLongPressing] = React.useState(false);
    const navigate = useNavigate();
    const { data } = useReceipesQuery();

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
            navigate(`/receipes/${data?.receipes?.[index]?.id}`);
        }
    };

    const onLongPressListener = setLongPress(onLongPress, onClick);
    React.useEffect(() => {
        if (isLongPressing && selectedIndexies.length === 0) {
            setIsLongPressing(false);
        }
    }, [selectedIndexies, isLongPressing]);
    return (
        <StyledReceipes>
            <header className="header-receipes">
                <div className="search-input">
                    <SearchIcon className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>
                {isLongPressing ? (
                    <IconButton className="del-btn">
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
        </StyledReceipes>
    );
};

export default Receipes;
