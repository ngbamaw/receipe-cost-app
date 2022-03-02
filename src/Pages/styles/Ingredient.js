import styled from 'styled-components';

const Ingredient = styled.div`
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
        .info-label {
            font-weight: bold;
            margin-right: 8px;
        }
        .info-value {
            font-weight: bold;
            color: #ff7a00;
        }
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

export default Ingredient;
