import styled from 'styled-components';

const Ingredients = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    .header-ingredients {
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
    .ingredient-name {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 24px;
        color: #9c9c9c;
    }
    .MuiInputLabel-formControl {
        font-weight: bold;
        color: #cecece;
    }
    .Mui-focused {
        color: #ff7a00;
    }
    .MuiInput-underline:after {
        border-bottom: 2px solid #ff7a00;
    }
    .amount-type-container {
        width: 100px;
        .MuiOutlinedInput-root {
            border-radius: 15px;
        }
    }
    .amount-value {
        width: 100px;
        margin-right: 12px;
    }
    .ingredient-image.picture-picker {
        margin-right: 18px;
    }
    .ingredients-list {
        overflow-y: auto;
        .ingredient-item {
            &.Mui-selected {
                background-color: #ff7a00;
            }
            .ingredient-image {
                margin-right: 12px;
            }
            .ingredient-title {
                span {
                    font-weight: bold;
                }
            }
            .ingredient-price {
                font-weight: bold;
            }
        }
    }
`;

export default Ingredients;
