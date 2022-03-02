import { EnumIngredientUnit, ReceipeEntry } from './generated/graphql';

const API_ROOT = 'http://localhost:1337';

export const getUrlForImage = (endpoint?: string) => {
    if (endpoint) return endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
    return '';
};

export const getPrice = (price = 1, quantity = 1, initialQuantity = 1) => {
    return (price * (quantity / initialQuantity)).toFixed(2);
};
export const getPriceInt = (price = 1, quantity = 1, initialQuantity = 1) => {
    return price * (quantity / initialQuantity);
};

export const getTotalPrice = (receipeEntries: ReceipeEntry[] = []) => {
    return receipeEntries
        .reduce((acc, curr) => {
            return (
                acc +
                getPriceInt(
                    curr?.ingredient?.products?.[0]?.price || 1,
                    curr?.quantity,
                    curr?.ingredient?.products?.[0]?.quantity || 1,
                )
            );
        }, 0)
        .toFixed(2);
};

export const convertUnit = (unit?: EnumIngredientUnit, options?: any) => {
    switch (unit) {
        case 'Gram':
            return 'g';
        case 'Liter':
            return 'L';
        default:
            return '';
    }
};
