import styled from 'styled-components';

const EditIngredient = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    .back-btn {
        align-self: flex-start;
        margin-top: 24px;
        margin-left: 24px;
        color: black;
    }
    .ingredient-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 0 auto;
        margin-bottom: 100px;
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

export default EditIngredient;
