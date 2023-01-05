import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { FormControl, IconButton, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import StyledEditProduct from './styles/EditProduct';
import {
    Product,
    useBrandsQuery,
    useCreateProductMutation,
    useIngredientQuery,
    useProductQuery,
    useStoresQuery,
    useUpdateProductMutation,
} from '../generated/graphql';
import { Field, Formik } from 'formik';
import PicturePicker, { Picture } from './PicturePicker';
import { convertUnit, getUrlForImage, useUploadMutation } from '../utils';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const emptyProduct: Partial<Product> = {
    id: '',
    brand: { id: '', name: '', created_at: '', updated_at: '' },
    store: { id: '', name: '', created_at: '', updated_at: '' },
    price: 0,
    quantity: 0,
};

const ProductSchema = Yup.object().shape({
    brand: Yup.object().required('Brand is required'),
    store: Yup.object().required('Store is required'),
    price: Yup.number().required('Price is required'),
    quantity: Yup.number().required('Quantity is required'),
});
const EditProduct: React.FC = () => {
    const [openPhotoPicker, setOpenPhotoPicker] = React.useState(false);
    const [newPicture, setNewPicture] = React.useState<Picture>();
    const navigate = useNavigate();
    const { ingredientId, productId } = useParams();
    const { data: dataProduct } = useProductQuery(
        { id: productId as string },
        { enabled: Boolean(productId) },
    );
    const { data: dataIngredient } = useIngredientQuery(
        { id: ingredientId as string },
        { enabled: !Boolean(productId) },
    );
    const { data: dataStores } = useStoresQuery();
    const { data: dataBrands } = useBrandsQuery();
    const updateProduct = useUpdateProductMutation();
    const createProduct = useCreateProductMutation();
    const upload = useUploadMutation();

    const onSubmit = async (values: Partial<Product>) => {
        console.log(values);
        let image;
        if (newPicture) {
            image = await upload.mutateAsync({ file: newPicture.file });
        }
        if (Boolean(productId)) {
            await updateProduct.mutateAsync({
                data: {
                    data: {
                        image: image?.[0].id,
                        quantity: Number(values.quantity),
                        price: Number(values.price),
                        brand: values.brand?.id,
                        store: values.store?.id,
                    },
                    where: { id: productId as string },
                },
            });
            navigate(`/ingredients/${ingredientId}/${productId}`);
        } else if (image) {
            const result = await createProduct.mutateAsync({
                data: {
                    data: {
                        image: image?.[0].id,
                        quantity: Number(values.quantity),
                        price: Number(values.price),
                        brand: values.brand?.id,
                        store: values.store?.id,
                        ingredient: ingredientId,
                    },
                },
            });
            const newProductId = result.createProduct?.product?.id;
            if (newProductId) {
                navigate(`/ingredients/${ingredientId}/${newProductId}`);
            }
        }
    };
    const onPicture = async (picture: Picture) => {
        setNewPicture(picture);
    };
    const initialValues = (dataProduct?.product || {
        ...emptyProduct,
        ingredient: dataIngredient?.ingredient,
    }) as Product;
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProductSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ values, errors }) => (
                <StyledEditProduct>
                    {console.log({ errors })}
                    <PicturePicker
                        onPicture={onPicture}
                        open={openPhotoPicker}
                        onClose={() => setOpenPhotoPicker(false)}
                    />
                    <IconButton
                        onClick={() => navigate(`/ingredients/${ingredientId}`)}
                        className="back-btn"
                    >
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                    {newPicture || values?.image?.url ? (
                        <button
                            type="button"
                            onClick={() => setOpenPhotoPicker(true)}
                            className="edit-img"
                        >
                            <img
                                className="ingredient-image"
                                src={newPicture?.src || getUrlForImage(values?.image?.url)}
                                alt={values?.ingredient?.name}
                            />
                            <div className="filter">
                                <EditIcon className="edit-icon" fontSize="large" />
                            </div>
                        </button>
                    ) : (
                        <IconButton
                            className="add-photo-btn"
                            onClick={() => setOpenPhotoPicker(true)}
                        >
                            <AddAPhotoIcon fontSize="large" />
                        </IconButton>
                    )}
                    <div className="info">
                        <p className="info-label">Marque :</p>

                        {dataBrands && (
                            <Field name="brand.id">
                                {({ field }: any) => (
                                    <FormControl
                                        sx={{ minWidth: 80 }}
                                        className="amount-type-container"
                                        error={Boolean(field.error)}
                                    >
                                        <Select
                                            autoWidth
                                            label="Type"
                                            variant="standard"
                                            {...field}
                                        >
                                            {dataBrands?.brands?.map((brand) => (
                                                <MenuItem key={brand?.id} value={brand?.id}>
                                                    {brand?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>
                        )}
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div className="info">
                        <p className="info-label">Prix :</p>
                        <Field name="price">
                            {({ field }: any) => (
                                <TextField
                                    {...field}
                                    onChange={(e) => {
                                        if (e.target.validity.valid) field.onChange(e);
                                    }}
                                    inputProps={{
                                        pattern: '\\d+(.)?(\\d{1,2})?',
                                    }}
                                    className="info-value"
                                    variant="standard"
                                />
                            )}
                        </Field>
                        <p className="info-value">€</p>
                    </div>
                    <div className="info">
                        <p className="info-label">Magasin :</p>
                        {dataStores && (
                            <Field name="store.id">
                                {({ field }: any) => (
                                    <FormControl
                                        sx={{ minWidth: 80 }}
                                        className="amount-type-container"
                                        error={Boolean(field.error)}
                                    >
                                        <Select label="Type" variant="standard" {...field}>
                                            {dataStores?.stores?.map((store) => (
                                                <MenuItem key={store?.id} value={store?.id}>
                                                    {store?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>
                        )}
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div className="info">
                        <p className="info-label">Quantité :</p>
                        <Field name="quantity">
                            {({ field }: any) => (
                                <TextField
                                    {...field}
                                    onChange={(e) => {
                                        if (e.target.validity.valid) field.onChange(e);
                                    }}
                                    inputProps={{
                                        pattern: '\\d+(.)?(\\d{1,2})?',
                                    }}
                                    className="info-value"
                                    variant="standard"
                                />
                            )}
                        </Field>
                        {convertUnit(values.ingredient?.unit)}
                    </div>

                    <div className="btns-action">
                        <IconButton className="validate-btn" type="submit">
                            <CheckIcon className="validate-icon" fontSize="large" />
                        </IconButton>
                        <IconButton className="cancel-btn" type="button">
                            <CloseIcon className="cancel0-icon" fontSize="large" />
                        </IconButton>
                    </div>
                </StyledEditProduct>
            )}
        </Formik>
    );
};

export default EditProduct;
