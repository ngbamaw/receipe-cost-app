import styled from 'styled-components';

export const AddIngredientSection = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
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
                font-size: 18px;
                line-height: 21px;
                .ingredient-image {
                    width: 55px;
                    height: 50px;
                    border-radius: 22px;
                }
            }
            font-weight: bold;
            font-size: 18px;
        }
    }
    .swiper {
        display: flex;
        flex-direction: column;
        flex: 1;
        .react-swipeable-view-container {
            height: 100%;
        }
        .step-2 {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
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
                width: 70px;
                .MuiOutlinedInput-root {
                    border-radius: 15px;
                }
            }
            .amount-value {
                width: 100px;
                margin-right: 12px;
            }
        }
    }
    .bottom-section {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        margin-top: auto;
        margin-bottom: 24px;
        .MuiMobileStepper-dotActive {
            background-color: #ff7a00;
        }
        .btn-stepper {
            color: black;
        }
        .bottom-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Rosario;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            color: #b0b0b0;
        }
    }
`;
