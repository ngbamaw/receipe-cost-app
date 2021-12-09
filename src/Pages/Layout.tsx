import React from 'react';
import { Link, useMatch, useResolvedPath, Outlet } from 'react-router-dom';
import ReceipeIcon from '../assets/img/receipe-icon.png';
import IngredientIcon from '../assets/img/ingredient-icon.png';
import StyledLayout from './styles/Layout';
import type { LinkProps } from 'react-router-dom';
import classNames from 'classnames';

interface CustomLinkProps extends LinkProps {
    icon: string;
    children: string;
}
function CustomLink({ children, to, icon, ...props }: CustomLinkProps) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link to={to} className={classNames('btn-menu', { selected: match })} {...props}>
            <img className="icon-menu" src={icon} alt={children} />
            <p>{children}</p>
        </Link>
    );
}

const Layout: React.FC = () => {
    return (
        <StyledLayout>
            <Outlet />
            <div className="menu-bar">
                <CustomLink to="/receipes" icon={ReceipeIcon}>
                    Recettes
                </CustomLink>
                <CustomLink to="/ingredients" icon={IngredientIcon}>
                    Ingredients
                </CustomLink>
            </div>
        </StyledLayout>
    );
};

export default Layout;
