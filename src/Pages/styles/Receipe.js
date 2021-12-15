import styled from 'styled-components';

export const Receipe = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    overflow: hidden;
    .back-btn {
        align-self: flex-start;
        margin-top: 24px;
        margin-left: 24px;
        color: black;
    }
    .receipe-image {
        width: 125px;
        height: 125px;
        border-radius: 50%;
        margin-bottom: 32px;
    }
    .receipe-header {
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 24px;
        .edit-btn {
            color: black;
            position: absolute;
            right: 0;
            transform: translateX(100%);
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
                .ingredient-amount {
                    .ingredient-unit {
                        color: #7e7e7e;
                    }
                }
            }
            .add-line {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 20px 16px;
                gap: 24px;
                font-size: 18px;
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
                font-size: 48px;
            }
            .price-label {
                font-weight: bold;
                font-size: 14px;
                text-align: center;
                color: #b0b0b0;
            }
        }
    }
`;
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
        .step-3 {
            display: flex;
            flex-direction: column;
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
        }
    }
    .bottom-section {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        margin-top: auto;
        margin-bottom: 24px;
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

export default Receipe;
