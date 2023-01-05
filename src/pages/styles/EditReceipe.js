import { Form } from 'formik';
import styled from 'styled-components';

export const EditReceipe = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    overflow: hidden;
    .back-btn {
        align-self: flex-start;
        margin-top: 18px;
        margin-left: 18px;
        color: black;
    }
    .add-photo-btn {
        border: 10px solid #b0b0b0;
        height: 160px;
        width: 160px;
        margin-bottom: 16px;
        .MuiSvgIcon-root {
            font-size: 80px;
        }
    }
    .edit-img {
        width: 125px;
        height: 125px;
        flex: 0 0 auto;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        margin-bottom: 18px;
        border: none;
        .receipe-image {
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
    .receipe-header {
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 24px;
        .receipe-title {
            border: none;
            color: black;
            font-weight: bold;
            font-size: 24px;
            text-align: center;
            width: 150px;
            outline: none;
            &::placeholder {
                color: #b0b0b0;
            }
        }
        .validate-btn {
            color: green;
            position: absolute;
            right: 0;
            transform: translateX(100%);
        }
        .cancel-btn {
            color: red;
            position: absolute;
            right: 0;
            transform: translateX(200%);
        }
    }
    .receipe-ingredients {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        .ingredient-list {
            display: flex;
            flex-direction: column;
            width: 100%;
            .ingredient-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: 20px 16px;
                .ingredient-label {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 21px;

                    .ingredient-name {
                        width: 100px;
                    }
                    .ingredient-image {
                        width: 55px;
                        height: 50px;
                        border-radius: 22px;
                    }
                }
                font-weight: bold;
                font-size: 14px;
                .ingredient-amount {
                    .ingredient-unit {
                        color: #7e7e7e;
                    }
                }

                .del-btn {
                    color: red;
                }
            }
            .add-line {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 20px 16px;
                gap: 24px;
                font-size: 14px;
                .add-btn {
                    background: #cecece;
                    border-radius: 22px;
                    width: 55px;
                    height: 50px;
                    color: white;
                }
            }
        }
        .price {
            margin-top: auto;
            margin-bottom: 24px;
            .price-number {
                font-weight: bold;
                font-size: 36px;
            }
            .price-label {
                font-weight: bold;
                font-size: 12px;
                text-align: center;
                color: #b0b0b0;
            }
        }
    }
`;

export default EditReceipe;
