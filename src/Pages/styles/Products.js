import { Dialog } from '@mui/material';
import styled from 'styled-components';

const Products = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    .header-products {
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

    .ingredient-label {
        display: flex;
        padding: 12px;
        .ingredient-name {
            height: 50px;
            display: flex;
            align-items: center;
            margin-left: 12px;
            color: #9c9c9c;
        }
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
    .product-list {
        overflow-y: auto;
        .product-item {
            &.Mui-selected {
                background-color: #ff7a00;
            }
            .favorite {
                margin: 0 10px;
                color: #ff7a00;
            }
            .product-title {
                span {
                    font-weight: bold;
                }
            }
            .product-price {
                font-weight: bold;
            }
        }
    }
`;

export const EditIngredient = styled(Dialog)`
    .ingredient-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 12px;
        .edit-img {
            width: 125px;
            height: 125px;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            border: none;
            .ingredient-image {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
            &:hover {
                cursor: pointer;
                .filter {
                    opacity: 1;
                }
            }
            .filter {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                transition: opacity 0.3s ease-in-out;
                .edit-icon {
                    margin: auto;
                    color: white;
                }
            }
        }
        .ingredient-name-edit {
            margin-left: 12px;
            border: none;
            color: black;
            font-weight: bold;
            font-size: 24px;
            text-align: left;
            width: 150px;
            outline: none;
            &::placeholder {
                color: #b0b0b0;
            }
        }
    }
`;

export default Products;
