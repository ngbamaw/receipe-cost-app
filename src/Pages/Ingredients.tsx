import React from 'react';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, IconButton, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StyledIngredients from './styles/Ingredients';
import AvatarImage from '../assets/img/img-avatar.png';
import setLongPress from '../useLongPress';

const data = [
    {
        image: AvatarImage,
        title: 'Oeuf',
    },
    {
        image: AvatarImage,
        title: 'Oeuf',
    },
    {
        image: AvatarImage,
        title: 'Oeuf',
    },
];

const Ingredients: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = React.useState<number[]>([]);
    const [isLongPressing, setIsLongPressing] = React.useState(false);
    const navigate = useNavigate();

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
            navigate(`/ingredients/${index}`);
        }
    };
    React.useEffect(() => {
        if (isLongPressing && selectedIndex.length === 0) {
            setIsLongPressing(false);
        }
    }, [selectedIndex, isLongPressing]);
    return (
        <StyledIngredients>
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
                    <IconButton onClick={() => navigate('/ingredients/new')} className="add-btn">
                        <AddIcon fontSize="large" className="add-icon" />
                    </IconButton>
                )}
            </header>
            <h2 className="ingredient-name">Oeuf</h2>
            <List className="ingredients-list">
                {data.map(({ image, title }, index) => (
                    <ListItemButton
                        {...setLongPress(onLongPress(index), onClick(index))}
                        selected={isLongPressing && selectedIndex.includes(index)}
                        className="ingredient-item"
                    >
                        <ListItemAvatar className="ingredient-image">
                            <Avatar
                                sx={{ height: '70px', width: '70px' }}
                                alt={`Avatar n°1`}
                                src={image}
                            />
                        </ListItemAvatar>
                        <StarIcon className="favorite" />
                        <ListItemText className="ingredient-title" primary={title} />
                        <p className="price">5€</p>
                    </ListItemButton>
                ))}
            </List>
        </StyledIngredients>
    );
};

export default Ingredients;
