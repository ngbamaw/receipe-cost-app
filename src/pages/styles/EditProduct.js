import { Form } from 'formik';
import styled from 'styled-components';

const EditProduct = styled(Form)`
    display: flex;
    flex-direction: column;
    overflow: auto;
    .add-photo-btn {
        align-self: flex-start;
        border: 10px solid #b0b0b0;
        height: 160px;
        width: 160px;
        margin: 0 auto;
        margin-bottom: 16px;
        .MuiSvgIcon-root {
            font-size: 80px;
        }
    }
    .back-btn {
        align-self: flex-start;
        margin-top: 24px;
        margin-left: 24px;
        color: black;
    }
    .edit-img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        margin-bottom: 100px;
        border: none;
        flex: 0 0 auto;
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
    .info {
        display: flex;
        padding: 16px;
        align-items: center;
        .info-label {
            font-weight: bold;
            margin-right: 8px;
        }
        .info-value {
            font-weight: bold;
            color: #ff7a00;
            width: 100px;
            .Mui-focused {
                color: #ff7a00;
            }
            .MuiInput-underline:after {
                border-bottom: 2px solid #ff7a00;
            }
            .amount-type-container {
                width: 70px;
                .MuiOutlinedInput-root {
                    border-radius: 15px;
                }
            }
        }
    }

    .btns-action {
        display: flex;
        width: fit-width;
        margin: auto;
    }
    .edit-btn {
        align-self: flex-start;
        margin: auto;
        color: black;
        .edit-icon {
            font-size: 64px;
        }
    }
`;

export default EditProduct;
