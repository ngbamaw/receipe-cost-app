import styled from 'styled-components';

const Receipes = styled.div`
    display: flex;
    flex-direction: column;
    .header-receipes {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 0;
        .search-input {
            background-color: white;
            padding: 4px;
            box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.25);
            border-radius: 15px;
            display: flex;
            height: fit-content;
            width: 70%;
            margin-right: 10px;
            .search-icon {
                color: #b0b0b0;
            }
            input {
                border: none;
                outline: none;
                width: 100%;
                &::placeholder {
                    color: #b0b0b0;
                    font-weight: bold;
                }
            }
        }
        .add-btn {
            color: black;
        }
        .del-btn {
            color: red;
        }
    }

    .receipes-list {
        max-height: 50%;
        overflow-y: auto;
        .receipe-item {
            &.Mui-selected {
                background-color: #ff7a00;
            }
            .receipe-image {
                margin-right: 38px;
            }
            .receipe-title {
                span {
                    font-weight: bold;
                }
            }
        }
    }
`;

export default Receipes;
