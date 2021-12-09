import styled from 'styled-components';

const Layout = styled.div`
    .menu-bar {
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        box-shadow: 0px -3px 12px rgba(0, 0, 0, 0.25);
        padding: 10px 0;
        .btn-menu {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-family: Roboto;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            text-decoration: none;
            color: black;
            text-align: center;
            .icon-menu {
                max-width: 70px;
                margin: auto;
            }
        }

        .btn-menu.selected {
            color: #ff7a00;
        }
    }
`;

export default Layout;
