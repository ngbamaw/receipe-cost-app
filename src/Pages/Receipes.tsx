import React from 'react';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, IconButton, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import StyledReceipes from './styles/Receipes';
import AvatarImage from '../assets/img/img-avatar.png';

const data = [
    {
        image: AvatarImage,
        title: 'Tiramisu',
    },
    {
        image: AvatarImage,
        title: 'Tiramisu',
    },
    {
        image: AvatarImage,
        title: 'Tiramisu',
    },
];

const Receipes: React.FC = () => {
    return (
        <StyledReceipes>
            <header className="header-receipes">
                <div className="search-input">
                    <SearchIcon className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>
                <IconButton className="add-btn">
                    <AddIcon />
                </IconButton>
            </header>
            <List className="receipes-list">
                {data.map(({ image, title }) => (
                    <ListItemButton>
                        <ListItemAvatar className="receipe-image">
                            <Avatar
                                sx={{ height: '70px', width: '70px' }}
                                alt={`Avatar n°1`}
                                src={image}
                            />
                        </ListItemAvatar>
                        <ListItemText className="receipe-title" primary={title} />
                    </ListItemButton>
                ))}
            </List>
        </StyledReceipes>
    );
};

export default Receipes;
