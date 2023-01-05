import { useMutation } from 'react-query';
import { EnumIngredientUnit, ReceipeEntry } from './generated/graphql';

const API_ROOT = 'http://localhost:1337';

export const getUrlForImage = (endpoint?: string): string => {
    if (endpoint) return endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
    return '';
};

export const getPrice = (price = 1, quantity = 1, initialQuantity = 1): string => {
    return (price * (quantity / initialQuantity)).toFixed(2);
};
export const getPriceInt = (price = 1, quantity = 1, initialQuantity = 1): number => {
    return price * (quantity / initialQuantity);
};

export const getTotalPrice = (receipeEntries: ReceipeEntry[] = []): string => {
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

export const convertUnit = (unit?: EnumIngredientUnit, options?: any): string => {
    switch (unit) {
        case 'Gram':
            return 'g';
        case 'Liter':
            return 'L';
        default:
            return '';
    }
};

export const onlyInLeft = (
    left: any[],
    right: any[],
    compareFunction: (left: any, right: any) => boolean,
) =>
    left.filter((leftValue) => !right.some((rightValue) => compareFunction(leftValue, rightValue)));

export const duplicateElements = (
    left: any[],
    right: any[],
    compareFunction: (left: any, right: any) => boolean,
) => left.filter((leftValue) => right.some((rightValue) => compareFunction(leftValue, rightValue)));

type UploadFileProps = { file: File };
const uploadFile = async ({ file }: UploadFileProps): Promise<any> => {
    const formData = new FormData();
    formData.append('files', file);
    const response = await fetch('http://localhost:1337/upload', {
        method: 'POST',
        body: formData,
    });
    return response.json();
};

export const useUploadMutation = () => useMutation(uploadFile);
