import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import StyledEditProduct from './styles/EditProduct';
import {
    Product,
    useBrandsQuery,
    useCreateProductMutation,
    useProductQuery,
    useStoresQuery,
    useUpdateProductMutation,
} from '../generated/graphql';
import { Field, Formik } from 'formik';
import PicturePicker, { Picture } from './PicturePicker';
import { getUrlForImage, useUploadMutation } from '../utils';
import AddIcon from '@mui/icons-material/Add';

const emptyProduct: Partial<Product> = {
    id: '',
    brand: { id: '', name: '', created_at: '', updated_at: '' },
    store: { id: '', name: '', created_at: '', updated_at: '' },
    price: 0,
    quantity: 0,
};

const EditProduct: React.FC = () => {
    const [openPhotoPicker, setOpenPhotoPicker] = React.useState(false);
    const [newPicture, setNewPicture] = React.useState<Picture>();
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredientId, productId } = useParams();
    const { data: dataProduct } = useProductQuery(
        { id: productId as string },
        { enabled: Boolean(productId) },
    );
    const { data: dataStores } = useStoresQuery();
    const { data: dataBrands } = useBrandsQuery();
    const updateProduct = useUpdateProductMutation();
    const createProduct = useCreateProductMutation();
    const upload = useUploadMutation();

    const onSubmit = async (values: Partial<Product>) => {
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
    const initialValues = (dataProduct?.product || emptyProduct) as Product;
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
            {({ values }) => (
                <StyledEditProduct>
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
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <FormControl className="amount-type-container">
                                        <Select label="Type" variant="standard" {...field}>
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
                            {({ field, form: { touched, errors }, meta }: any) => (
                                <TextField {...field} className="info-value" variant="standard" />
                            )}
                        </Field>
                        <p className="info-value">€</p>
                    </div>
                    <div className="info">
                        <p className="info-label">Magasin :</p>
                        {dataStores && (
                            <Field name="store.id">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <FormControl className="amount-type-container">
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
                            {({ field, form: { touched, errors }, meta }: any) => (
                                <TextField {...field} className="info-value" variant="standard" />
                            )}
                        </Field>
                    </div>

                    <div className="btns-action">
                        <IconButton className="validate-btn" type="submit">
                            <CheckIcon className="validate-icon" fontSize="large" />
                        </IconButton>
                    </div>
                </StyledEditProduct>
            )}
        </Formik>
    );
};

export default EditProduct;
