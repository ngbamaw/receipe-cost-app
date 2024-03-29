import styled from 'styled-components';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    .menu-bar {
        margin-top: auto;
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
            font-size: 14px;
            text-decoration: none;
            color: black;
            text-align: center;
            .icon-menu {
                max-width: 70px;
                max-height: 50px;
                margin: auto;
                margin-bottom: 12px;
            }
        }

        .btn-menu.selected {
            color: #ff7a00;
        }
    }
`;

export default Layout;
