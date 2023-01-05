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
    .add-photo-btn {
        border: 10px solid #b0b0b0;
        height: 160px;
        width: 160px;
        margin-bottom: 16px;
        .MuiSvgIcon-root {
            font-size: 80px;
        }
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
        .edit-btn {
            color: #02ce54;
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
                    font-size: 14px;
                    line-height: 21px;
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

export default Receipe;
