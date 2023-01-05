/* eslint-disable */
import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
    return async (): Promise<TData> => {
        const res = await fetch('https://receipe-cost-api-production.up.railway.app/graphql', {
            method: 'POST',
            ...{ headers: { 'Content-Type': 'application/json', Accept: 'application/json' } },
            body: JSON.stringify({ query, variables }),
        });

        const json = await res.json();

        if (json.errors) {
            const { message } = json.errors[0];

            throw new Error(message);
        }

        return json.data;
    };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    Date: any;
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: any;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any;
    /** The `Long` scalar type represents 52-bit integers */
    Long: any;
    /** A time string with format: HH:mm:ss.SSS */
    Time: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};

export type AdminUser = {
    __typename?: 'AdminUser';
    firstname: Scalars['String'];
    id: Scalars['ID'];
    lastname: Scalars['String'];
    username?: Maybe<Scalars['String']>;
};

export type Brand = {
    __typename?: 'Brand';
    created_at: Scalars['DateTime'];
    id: Scalars['ID'];
    name: Scalars['String'];
    products?: Maybe<Array<Maybe<Product>>>;
    published_at?: Maybe<Scalars['DateTime']>;
    updated_at: Scalars['DateTime'];
};

export type BrandProductsArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type BrandAggregator = {
    __typename?: 'BrandAggregator';
    count?: Maybe<Scalars['Int']>;
    totalCount?: Maybe<Scalars['Int']>;
};

export type BrandConnection = {
    __typename?: 'BrandConnection';
    aggregate?: Maybe<BrandAggregator>;
    groupBy?: Maybe<BrandGroupBy>;
    values?: Maybe<Array<Maybe<Brand>>>;
};

export type BrandConnectionCreatedAt = {
    __typename?: 'BrandConnectionCreated_at';
    connection?: Maybe<BrandConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type BrandConnectionId = {
    __typename?: 'BrandConnectionId';
    connection?: Maybe<BrandConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type BrandConnectionName = {
    __typename?: 'BrandConnectionName';
    connection?: Maybe<BrandConnection>;
    key?: Maybe<Scalars['String']>;
};

export type BrandConnectionPublishedAt = {
    __typename?: 'BrandConnectionPublished_at';
    connection?: Maybe<BrandConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type BrandConnectionUpdatedAt = {
    __typename?: 'BrandConnectionUpdated_at';
    connection?: Maybe<BrandConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type BrandGroupBy = {
    __typename?: 'BrandGroupBy';
    created_at?: Maybe<Array<Maybe<BrandConnectionCreatedAt>>>;
    id?: Maybe<Array<Maybe<BrandConnectionId>>>;
    name?: Maybe<Array<Maybe<BrandConnectionName>>>;
    published_at?: Maybe<Array<Maybe<BrandConnectionPublishedAt>>>;
    updated_at?: Maybe<Array<Maybe<BrandConnectionUpdatedAt>>>;
};

export type BrandInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    name: Scalars['String'];
    products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export enum EnumIngredientUnit {
    Gram = 'Gram',
    Liter = 'Liter',
    Unit = 'Unit',
}

export type FileInfoInput = {
    alternativeText?: InputMaybe<Scalars['String']>;
    caption?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
};

export type FileInput = {
    alternativeText?: InputMaybe<Scalars['String']>;
    caption?: InputMaybe<Scalars['String']>;
    created_by?: InputMaybe<Scalars['ID']>;
    ext?: InputMaybe<Scalars['String']>;
    formats?: InputMaybe<Scalars['JSON']>;
    hash: Scalars['String'];
    height?: InputMaybe<Scalars['Int']>;
    mime: Scalars['String'];
    name: Scalars['String'];
    previewUrl?: InputMaybe<Scalars['String']>;
    provider: Scalars['String'];
    provider_metadata?: InputMaybe<Scalars['JSON']>;
    related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    size: Scalars['Float'];
    updated_by?: InputMaybe<Scalars['ID']>;
    url: Scalars['String'];
    width?: InputMaybe<Scalars['Int']>;
};

export type I18NLocale = {
    __typename?: 'I18NLocale';
    code?: Maybe<Scalars['String']>;
    created_at: Scalars['DateTime'];
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    updated_at: Scalars['DateTime'];
};

export type Ingredient = {
    __typename?: 'Ingredient';
    created_at: Scalars['DateTime'];
    id: Scalars['ID'];
    image?: Maybe<UploadFile>;
    name: Scalars['String'];
    products?: Maybe<Array<Maybe<Product>>>;
    published_at?: Maybe<Scalars['DateTime']>;
    receipe_entries?: Maybe<Array<Maybe<ReceipeEntry>>>;
    unit: EnumIngredientUnit;
    updated_at: Scalars['DateTime'];
};

export type IngredientProductsArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type IngredientReceipeEntriesArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type IngredientAggregator = {
    __typename?: 'IngredientAggregator';
    count?: Maybe<Scalars['Int']>;
    totalCount?: Maybe<Scalars['Int']>;
};

export type IngredientConnection = {
    __typename?: 'IngredientConnection';
    aggregate?: Maybe<IngredientAggregator>;
    groupBy?: Maybe<IngredientGroupBy>;
    values?: Maybe<Array<Maybe<Ingredient>>>;
};

export type IngredientConnectionCreatedAt = {
    __typename?: 'IngredientConnectionCreated_at';
    connection?: Maybe<IngredientConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type IngredientConnectionId = {
    __typename?: 'IngredientConnectionId';
    connection?: Maybe<IngredientConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type IngredientConnectionImage = {
    __typename?: 'IngredientConnectionImage';
    connection?: Maybe<IngredientConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type IngredientConnectionName = {
    __typename?: 'IngredientConnectionName';
    connection?: Maybe<IngredientConnection>;
    key?: Maybe<Scalars['String']>;
};

export type IngredientConnectionPublishedAt = {
    __typename?: 'IngredientConnectionPublished_at';
    connection?: Maybe<IngredientConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type IngredientConnectionUnit = {
    __typename?: 'IngredientConnectionUnit';
    connection?: Maybe<IngredientConnection>;
    key?: Maybe<Scalars['String']>;
};

export type IngredientConnectionUpdatedAt = {
    __typename?: 'IngredientConnectionUpdated_at';
    connection?: Maybe<IngredientConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type IngredientGroupBy = {
    __typename?: 'IngredientGroupBy';
    created_at?: Maybe<Array<Maybe<IngredientConnectionCreatedAt>>>;
    id?: Maybe<Array<Maybe<IngredientConnectionId>>>;
    image?: Maybe<Array<Maybe<IngredientConnectionImage>>>;
    name?: Maybe<Array<Maybe<IngredientConnectionName>>>;
    published_at?: Maybe<Array<Maybe<IngredientConnectionPublishedAt>>>;
    unit?: Maybe<Array<Maybe<IngredientConnectionUnit>>>;
    updated_at?: Maybe<Array<Maybe<IngredientConnectionUpdatedAt>>>;
};

export type IngredientInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    image?: InputMaybe<Scalars['ID']>;
    name: Scalars['String'];
    products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    receipe_entries?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    unit: EnumIngredientUnit;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type InputId = {
    id: Scalars['ID'];
};

export type LocaleInput = {
    code?: InputMaybe<Scalars['String']>;
    created_by?: InputMaybe<Scalars['ID']>;
    name?: InputMaybe<Scalars['String']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type Morph =
    | Brand
    | BrandAggregator
    | BrandConnection
    | BrandConnectionCreatedAt
    | BrandConnectionId
    | BrandConnectionName
    | BrandConnectionPublishedAt
    | BrandConnectionUpdatedAt
    | BrandGroupBy
    | I18NLocale
    | Ingredient
    | IngredientAggregator
    | IngredientConnection
    | IngredientConnectionCreatedAt
    | IngredientConnectionId
    | IngredientConnectionImage
    | IngredientConnectionName
    | IngredientConnectionPublishedAt
    | IngredientConnectionUnit
    | IngredientConnectionUpdatedAt
    | IngredientGroupBy
    | Product
    | ProductAggregator
    | ProductAggregatorAvg
    | ProductAggregatorMax
    | ProductAggregatorMin
    | ProductAggregatorSum
    | ProductConnection
    | ProductConnectionBrand
    | ProductConnectionCreatedAt
    | ProductConnectionFavorite
    | ProductConnectionId
    | ProductConnectionImage
    | ProductConnectionIngredient
    | ProductConnectionPrice
    | ProductConnectionPublishedAt
    | ProductConnectionQuantity
    | ProductConnectionStore
    | ProductConnectionUpdatedAt
    | ProductGroupBy
    | Receipe
    | ReceipeAggregator
    | ReceipeConnection
    | ReceipeConnectionCreatedAt
    | ReceipeConnectionId
    | ReceipeConnectionImage
    | ReceipeConnectionName
    | ReceipeConnectionPublishedAt
    | ReceipeConnectionUpdatedAt
    | ReceipeEntry
    | ReceipeEntryAggregator
    | ReceipeEntryAggregatorAvg
    | ReceipeEntryAggregatorMax
    | ReceipeEntryAggregatorMin
    | ReceipeEntryAggregatorSum
    | ReceipeEntryConnection
    | ReceipeEntryConnectionCreatedAt
    | ReceipeEntryConnectionId
    | ReceipeEntryConnectionIngredient
    | ReceipeEntryConnectionPublishedAt
    | ReceipeEntryConnectionQuantity
    | ReceipeEntryConnectionReceipe
    | ReceipeEntryConnectionUpdatedAt
    | ReceipeEntryGroupBy
    | ReceipeGroupBy
    | Store
    | StoreAggregator
    | StoreConnection
    | StoreConnectionCreatedAt
    | StoreConnectionId
    | StoreConnectionName
    | StoreConnectionPublishedAt
    | StoreConnectionUpdatedAt
    | StoreGroupBy
    | UploadFile
    | UploadFileAggregator
    | UploadFileAggregatorAvg
    | UploadFileAggregatorMax
    | UploadFileAggregatorMin
    | UploadFileAggregatorSum
    | UploadFileConnection
    | UploadFileConnectionAlternativeText
    | UploadFileConnectionCaption
    | UploadFileConnectionCreatedAt
    | UploadFileConnectionExt
    | UploadFileConnectionFormats
    | UploadFileConnectionHash
    | UploadFileConnectionHeight
    | UploadFileConnectionId
    | UploadFileConnectionMime
    | UploadFileConnectionName
    | UploadFileConnectionPreviewUrl
    | UploadFileConnectionProvider
    | UploadFileConnectionProviderMetadata
    | UploadFileConnectionSize
    | UploadFileConnectionUpdatedAt
    | UploadFileConnectionUrl
    | UploadFileConnectionWidth
    | UploadFileGroupBy
    | UserPermissionsPasswordPayload
    | UsersPermissionsLoginPayload
    | UsersPermissionsMe
    | UsersPermissionsMeRole
    | UsersPermissionsPermission
    | UsersPermissionsRole
    | UsersPermissionsRoleAggregator
    | UsersPermissionsRoleConnection
    | UsersPermissionsRoleConnectionDescription
    | UsersPermissionsRoleConnectionId
    | UsersPermissionsRoleConnectionName
    | UsersPermissionsRoleConnectionType
    | UsersPermissionsRoleGroupBy
    | UsersPermissionsUser
    | UsersPermissionsUserAggregator
    | UsersPermissionsUserConnection
    | UsersPermissionsUserConnectionBlocked
    | UsersPermissionsUserConnectionConfirmed
    | UsersPermissionsUserConnectionCreatedAt
    | UsersPermissionsUserConnectionEmail
    | UsersPermissionsUserConnectionId
    | UsersPermissionsUserConnectionProvider
    | UsersPermissionsUserConnectionRole
    | UsersPermissionsUserConnectionUpdatedAt
    | UsersPermissionsUserConnectionUsername
    | UsersPermissionsUserGroupBy
    | CreateBrandPayload
    | CreateIngredientPayload
    | CreateProductPayload
    | CreateReceipeEntryPayload
    | CreateReceipePayload
    | CreateRolePayload
    | CreateStorePayload
    | CreateUserPayload
    | DeleteBrandPayload
    | DeleteFilePayload
    | DeleteIngredientPayload
    | DeleteProductPayload
    | DeleteReceipeEntryPayload
    | DeleteReceipePayload
    | DeleteRolePayload
    | DeleteStorePayload
    | DeleteUserPayload
    | UpdateBrandPayload
    | UpdateIngredientPayload
    | UpdateProductPayload
    | UpdateReceipeEntryPayload
    | UpdateReceipePayload
    | UpdateRolePayload
    | UpdateStorePayload
    | UpdateUserPayload;

export type Mutation = {
    __typename?: 'Mutation';
    createBrand?: Maybe<CreateBrandPayload>;
    createIngredient?: Maybe<CreateIngredientPayload>;
    createProduct?: Maybe<CreateProductPayload>;
    createReceipe?: Maybe<CreateReceipePayload>;
    createReceipeEntry?: Maybe<CreateReceipeEntryPayload>;
    /** Create a new role */
    createRole?: Maybe<CreateRolePayload>;
    createStore?: Maybe<CreateStorePayload>;
    /** Create a new user */
    createUser?: Maybe<CreateUserPayload>;
    deleteBrand?: Maybe<DeleteBrandPayload>;
    /** Delete one file */
    deleteFile?: Maybe<DeleteFilePayload>;
    deleteIngredient?: Maybe<DeleteIngredientPayload>;
    deleteProduct?: Maybe<DeleteProductPayload>;
    deleteReceipe?: Maybe<DeleteReceipePayload>;
    deleteReceipeEntry?: Maybe<DeleteReceipeEntryPayload>;
    /** Delete an existing role */
    deleteRole?: Maybe<DeleteRolePayload>;
    deleteStore?: Maybe<DeleteStorePayload>;
    /** Delete an existing user */
    deleteUser?: Maybe<DeleteUserPayload>;
    emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
    forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
    login: UsersPermissionsLoginPayload;
    multipleUpload: Array<Maybe<UploadFile>>;
    register: UsersPermissionsLoginPayload;
    resetPassword?: Maybe<UsersPermissionsLoginPayload>;
    updateBrand?: Maybe<UpdateBrandPayload>;
    updateFileInfo: UploadFile;
    updateIngredient?: Maybe<UpdateIngredientPayload>;
    updateProduct?: Maybe<UpdateProductPayload>;
    updateReceipe?: Maybe<UpdateReceipePayload>;
    updateReceipeEntry?: Maybe<UpdateReceipeEntryPayload>;
    /** Update an existing role */
    updateRole?: Maybe<UpdateRolePayload>;
    updateStore?: Maybe<UpdateStorePayload>;
    /** Update an existing user */
    updateUser?: Maybe<UpdateUserPayload>;
    upload: UploadFile;
};

export type MutationCreateBrandArgs = {
    input?: InputMaybe<CreateBrandInput>;
};

export type MutationCreateIngredientArgs = {
    input?: InputMaybe<CreateIngredientInput>;
};

export type MutationCreateProductArgs = {
    input?: InputMaybe<CreateProductInput>;
};

export type MutationCreateReceipeArgs = {
    input?: InputMaybe<CreateReceipeInput>;
};

export type MutationCreateReceipeEntryArgs = {
    input?: InputMaybe<CreateReceipeEntryInput>;
};

export type MutationCreateRoleArgs = {
    input?: InputMaybe<CreateRoleInput>;
};

export type MutationCreateStoreArgs = {
    input?: InputMaybe<CreateStoreInput>;
};

export type MutationCreateUserArgs = {
    input?: InputMaybe<CreateUserInput>;
};

export type MutationDeleteBrandArgs = {
    input?: InputMaybe<DeleteBrandInput>;
};

export type MutationDeleteFileArgs = {
    input?: InputMaybe<DeleteFileInput>;
};

export type MutationDeleteIngredientArgs = {
    input?: InputMaybe<DeleteIngredientInput>;
};

export type MutationDeleteProductArgs = {
    input?: InputMaybe<DeleteProductInput>;
};

export type MutationDeleteReceipeArgs = {
    input?: InputMaybe<DeleteReceipeInput>;
};

export type MutationDeleteReceipeEntryArgs = {
    input?: InputMaybe<DeleteReceipeEntryInput>;
};

export type MutationDeleteRoleArgs = {
    input?: InputMaybe<DeleteRoleInput>;
};

export type MutationDeleteStoreArgs = {
    input?: InputMaybe<DeleteStoreInput>;
};

export type MutationDeleteUserArgs = {
    input?: InputMaybe<DeleteUserInput>;
};

export type MutationEmailConfirmationArgs = {
    confirmation: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};

export type MutationLoginArgs = {
    input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
    field?: InputMaybe<Scalars['String']>;
    files: Array<InputMaybe<Scalars['Upload']>>;
    ref?: InputMaybe<Scalars['String']>;
    refId?: InputMaybe<Scalars['ID']>;
    source?: InputMaybe<Scalars['String']>;
};

export type MutationRegisterArgs = {
    input: UsersPermissionsRegisterInput;
};

export type MutationResetPasswordArgs = {
    code: Scalars['String'];
    password: Scalars['String'];
    passwordConfirmation: Scalars['String'];
};

export type MutationUpdateBrandArgs = {
    input?: InputMaybe<UpdateBrandInput>;
};

export type MutationUpdateFileInfoArgs = {
    id: Scalars['ID'];
    info: FileInfoInput;
};

export type MutationUpdateIngredientArgs = {
    input?: InputMaybe<UpdateIngredientInput>;
};

export type MutationUpdateProductArgs = {
    input?: InputMaybe<UpdateProductInput>;
};

export type MutationUpdateReceipeArgs = {
    input?: InputMaybe<UpdateReceipeInput>;
};

export type MutationUpdateReceipeEntryArgs = {
    input?: InputMaybe<UpdateReceipeEntryInput>;
};

export type MutationUpdateRoleArgs = {
    input?: InputMaybe<UpdateRoleInput>;
};

export type MutationUpdateStoreArgs = {
    input?: InputMaybe<UpdateStoreInput>;
};

export type MutationUpdateUserArgs = {
    input?: InputMaybe<UpdateUserInput>;
};

export type MutationUploadArgs = {
    field?: InputMaybe<Scalars['String']>;
    file: Scalars['Upload'];
    info?: InputMaybe<FileInfoInput>;
    ref?: InputMaybe<Scalars['String']>;
    refId?: InputMaybe<Scalars['ID']>;
    source?: InputMaybe<Scalars['String']>;
};

export type Product = {
    __typename?: 'Product';
    brand?: Maybe<Brand>;
    created_at: Scalars['DateTime'];
    favorite: Scalars['Boolean'];
    id: Scalars['ID'];
    image?: Maybe<UploadFile>;
    ingredient?: Maybe<Ingredient>;
    price?: Maybe<Scalars['Float']>;
    published_at?: Maybe<Scalars['DateTime']>;
    quantity?: Maybe<Scalars['Float']>;
    store?: Maybe<Store>;
    updated_at: Scalars['DateTime'];
};

export type ProductAggregator = {
    __typename?: 'ProductAggregator';
    avg?: Maybe<ProductAggregatorAvg>;
    count?: Maybe<Scalars['Int']>;
    max?: Maybe<ProductAggregatorMax>;
    min?: Maybe<ProductAggregatorMin>;
    sum?: Maybe<ProductAggregatorSum>;
    totalCount?: Maybe<Scalars['Int']>;
};

export type ProductAggregatorAvg = {
    __typename?: 'ProductAggregatorAvg';
    price?: Maybe<Scalars['Float']>;
    quantity?: Maybe<Scalars['Float']>;
};

export type ProductAggregatorMax = {
    __typename?: 'ProductAggregatorMax';
    price?: Maybe<Scalars['Float']>;
    quantity?: Maybe<Scalars['Float']>;
};

export type ProductAggregatorMin = {
    __typename?: 'ProductAggregatorMin';
    price?: Maybe<Scalars['Float']>;
    quantity?: Maybe<Scalars['Float']>;
};

export type ProductAggregatorSum = {
    __typename?: 'ProductAggregatorSum';
    price?: Maybe<Scalars['Float']>;
    quantity?: Maybe<Scalars['Float']>;
};

export type ProductConnection = {
    __typename?: 'ProductConnection';
    aggregate?: Maybe<ProductAggregator>;
    groupBy?: Maybe<ProductGroupBy>;
    values?: Maybe<Array<Maybe<Product>>>;
};

export type ProductConnectionBrand = {
    __typename?: 'ProductConnectionBrand';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ProductConnectionCreatedAt = {
    __typename?: 'ProductConnectionCreated_at';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type ProductConnectionFavorite = {
    __typename?: 'ProductConnectionFavorite';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['Boolean']>;
};

export type ProductConnectionId = {
    __typename?: 'ProductConnectionId';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ProductConnectionImage = {
    __typename?: 'ProductConnectionImage';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ProductConnectionIngredient = {
    __typename?: 'ProductConnectionIngredient';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ProductConnectionPrice = {
    __typename?: 'ProductConnectionPrice';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['Float']>;
};

export type ProductConnectionPublishedAt = {
    __typename?: 'ProductConnectionPublished_at';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type ProductConnectionQuantity = {
    __typename?: 'ProductConnectionQuantity';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['Float']>;
};

export type ProductConnectionStore = {
    __typename?: 'ProductConnectionStore';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ProductConnectionUpdatedAt = {
    __typename?: 'ProductConnectionUpdated_at';
    connection?: Maybe<ProductConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type ProductGroupBy = {
    __typename?: 'ProductGroupBy';
    brand?: Maybe<Array<Maybe<ProductConnectionBrand>>>;
    created_at?: Maybe<Array<Maybe<ProductConnectionCreatedAt>>>;
    favorite?: Maybe<Array<Maybe<ProductConnectionFavorite>>>;
    id?: Maybe<Array<Maybe<ProductConnectionId>>>;
    image?: Maybe<Array<Maybe<ProductConnectionImage>>>;
    ingredient?: Maybe<Array<Maybe<ProductConnectionIngredient>>>;
    price?: Maybe<Array<Maybe<ProductConnectionPrice>>>;
    published_at?: Maybe<Array<Maybe<ProductConnectionPublishedAt>>>;
    quantity?: Maybe<Array<Maybe<ProductConnectionQuantity>>>;
    store?: Maybe<Array<Maybe<ProductConnectionStore>>>;
    updated_at?: Maybe<Array<Maybe<ProductConnectionUpdatedAt>>>;
};

export type ProductInput = {
    brand?: InputMaybe<Scalars['ID']>;
    created_by?: InputMaybe<Scalars['ID']>;
    favorite?: InputMaybe<Scalars['Boolean']>;
    image?: InputMaybe<Scalars['ID']>;
    ingredient?: InputMaybe<Scalars['ID']>;
    price?: InputMaybe<Scalars['Float']>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    quantity?: InputMaybe<Scalars['Float']>;
    store?: InputMaybe<Scalars['ID']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export enum PublicationState {
    Live = 'LIVE',
    Preview = 'PREVIEW',
}

export type Query = {
    __typename?: 'Query';
    brand?: Maybe<Brand>;
    brands?: Maybe<Array<Maybe<Brand>>>;
    brandsConnection?: Maybe<BrandConnection>;
    files?: Maybe<Array<Maybe<UploadFile>>>;
    filesConnection?: Maybe<UploadFileConnection>;
    ingredient?: Maybe<Ingredient>;
    ingredients?: Maybe<Array<Maybe<Ingredient>>>;
    ingredientsConnection?: Maybe<IngredientConnection>;
    me?: Maybe<UsersPermissionsMe>;
    product?: Maybe<Product>;
    products?: Maybe<Array<Maybe<Product>>>;
    productsConnection?: Maybe<ProductConnection>;
    receipe?: Maybe<Receipe>;
    receipeEntries?: Maybe<Array<Maybe<ReceipeEntry>>>;
    receipeEntriesConnection?: Maybe<ReceipeEntryConnection>;
    receipeEntry?: Maybe<ReceipeEntry>;
    receipes?: Maybe<Array<Maybe<Receipe>>>;
    receipesConnection?: Maybe<ReceipeConnection>;
    role?: Maybe<UsersPermissionsRole>;
    /** Retrieve all the existing roles. You can't apply filters on this query. */
    roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
    rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
    store?: Maybe<Store>;
    stores?: Maybe<Array<Maybe<Store>>>;
    storesConnection?: Maybe<StoreConnection>;
    user?: Maybe<UsersPermissionsUser>;
    users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
    usersConnection?: Maybe<UsersPermissionsUserConnection>;
};

export type QueryBrandArgs = {
    id: Scalars['ID'];
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryBrandsArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryBrandsConnectionArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFilesArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFilesConnectionArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryIngredientArgs = {
    id: Scalars['ID'];
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryIngredientsArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryIngredientsConnectionArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryProductArgs = {
    id: Scalars['ID'];
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryProductsArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryProductsConnectionArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryReceipeArgs = {
    id: Scalars['ID'];
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryReceipeEntriesArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryReceipeEntriesConnectionArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryReceipeEntryArgs = {
    id: Scalars['ID'];
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryReceipesArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryReceipesConnectionArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryRoleArgs = {
    id: Scalars['ID'];
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryRolesArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryRolesConnectionArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryStoreArgs = {
    id: Scalars['ID'];
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryStoresArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryStoresConnectionArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryUserArgs = {
    id: Scalars['ID'];
    publicationState?: InputMaybe<PublicationState>;
};

export type QueryUsersArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type QueryUsersConnectionArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type Receipe = {
    __typename?: 'Receipe';
    created_at: Scalars['DateTime'];
    id: Scalars['ID'];
    image?: Maybe<UploadFile>;
    name: Scalars['String'];
    published_at?: Maybe<Scalars['DateTime']>;
    receipe_entries?: Maybe<Array<Maybe<ReceipeEntry>>>;
    updated_at: Scalars['DateTime'];
};

export type ReceipeReceipeEntriesArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type ReceipeAggregator = {
    __typename?: 'ReceipeAggregator';
    count?: Maybe<Scalars['Int']>;
    totalCount?: Maybe<Scalars['Int']>;
};

export type ReceipeConnection = {
    __typename?: 'ReceipeConnection';
    aggregate?: Maybe<ReceipeAggregator>;
    groupBy?: Maybe<ReceipeGroupBy>;
    values?: Maybe<Array<Maybe<Receipe>>>;
};

export type ReceipeConnectionCreatedAt = {
    __typename?: 'ReceipeConnectionCreated_at';
    connection?: Maybe<ReceipeConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type ReceipeConnectionId = {
    __typename?: 'ReceipeConnectionId';
    connection?: Maybe<ReceipeConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ReceipeConnectionImage = {
    __typename?: 'ReceipeConnectionImage';
    connection?: Maybe<ReceipeConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ReceipeConnectionName = {
    __typename?: 'ReceipeConnectionName';
    connection?: Maybe<ReceipeConnection>;
    key?: Maybe<Scalars['String']>;
};

export type ReceipeConnectionPublishedAt = {
    __typename?: 'ReceipeConnectionPublished_at';
    connection?: Maybe<ReceipeConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type ReceipeConnectionUpdatedAt = {
    __typename?: 'ReceipeConnectionUpdated_at';
    connection?: Maybe<ReceipeConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type ReceipeEntry = {
    __typename?: 'ReceipeEntry';
    created_at: Scalars['DateTime'];
    id: Scalars['ID'];
    ingredient?: Maybe<Ingredient>;
    published_at?: Maybe<Scalars['DateTime']>;
    quantity: Scalars['Float'];
    receipe?: Maybe<Receipe>;
    updated_at: Scalars['DateTime'];
};

export type ReceipeEntryAggregator = {
    __typename?: 'ReceipeEntryAggregator';
    avg?: Maybe<ReceipeEntryAggregatorAvg>;
    count?: Maybe<Scalars['Int']>;
    max?: Maybe<ReceipeEntryAggregatorMax>;
    min?: Maybe<ReceipeEntryAggregatorMin>;
    sum?: Maybe<ReceipeEntryAggregatorSum>;
    totalCount?: Maybe<Scalars['Int']>;
};

export type ReceipeEntryAggregatorAvg = {
    __typename?: 'ReceipeEntryAggregatorAvg';
    quantity?: Maybe<Scalars['Float']>;
};

export type ReceipeEntryAggregatorMax = {
    __typename?: 'ReceipeEntryAggregatorMax';
    quantity?: Maybe<Scalars['Float']>;
};

export type ReceipeEntryAggregatorMin = {
    __typename?: 'ReceipeEntryAggregatorMin';
    quantity?: Maybe<Scalars['Float']>;
};

export type ReceipeEntryAggregatorSum = {
    __typename?: 'ReceipeEntryAggregatorSum';
    quantity?: Maybe<Scalars['Float']>;
};

export type ReceipeEntryConnection = {
    __typename?: 'ReceipeEntryConnection';
    aggregate?: Maybe<ReceipeEntryAggregator>;
    groupBy?: Maybe<ReceipeEntryGroupBy>;
    values?: Maybe<Array<Maybe<ReceipeEntry>>>;
};

export type ReceipeEntryConnectionCreatedAt = {
    __typename?: 'ReceipeEntryConnectionCreated_at';
    connection?: Maybe<ReceipeEntryConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type ReceipeEntryConnectionId = {
    __typename?: 'ReceipeEntryConnectionId';
    connection?: Maybe<ReceipeEntryConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ReceipeEntryConnectionIngredient = {
    __typename?: 'ReceipeEntryConnectionIngredient';
    connection?: Maybe<ReceipeEntryConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ReceipeEntryConnectionPublishedAt = {
    __typename?: 'ReceipeEntryConnectionPublished_at';
    connection?: Maybe<ReceipeEntryConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type ReceipeEntryConnectionQuantity = {
    __typename?: 'ReceipeEntryConnectionQuantity';
    connection?: Maybe<ReceipeEntryConnection>;
    key?: Maybe<Scalars['Float']>;
};

export type ReceipeEntryConnectionReceipe = {
    __typename?: 'ReceipeEntryConnectionReceipe';
    connection?: Maybe<ReceipeEntryConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type ReceipeEntryConnectionUpdatedAt = {
    __typename?: 'ReceipeEntryConnectionUpdated_at';
    connection?: Maybe<ReceipeEntryConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type ReceipeEntryGroupBy = {
    __typename?: 'ReceipeEntryGroupBy';
    created_at?: Maybe<Array<Maybe<ReceipeEntryConnectionCreatedAt>>>;
    id?: Maybe<Array<Maybe<ReceipeEntryConnectionId>>>;
    ingredient?: Maybe<Array<Maybe<ReceipeEntryConnectionIngredient>>>;
    published_at?: Maybe<Array<Maybe<ReceipeEntryConnectionPublishedAt>>>;
    quantity?: Maybe<Array<Maybe<ReceipeEntryConnectionQuantity>>>;
    receipe?: Maybe<Array<Maybe<ReceipeEntryConnectionReceipe>>>;
    updated_at?: Maybe<Array<Maybe<ReceipeEntryConnectionUpdatedAt>>>;
};

export type ReceipeEntryInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    ingredient?: InputMaybe<Scalars['ID']>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    quantity?: InputMaybe<Scalars['Float']>;
    receipe?: InputMaybe<Scalars['ID']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type ReceipeGroupBy = {
    __typename?: 'ReceipeGroupBy';
    created_at?: Maybe<Array<Maybe<ReceipeConnectionCreatedAt>>>;
    id?: Maybe<Array<Maybe<ReceipeConnectionId>>>;
    image?: Maybe<Array<Maybe<ReceipeConnectionImage>>>;
    name?: Maybe<Array<Maybe<ReceipeConnectionName>>>;
    published_at?: Maybe<Array<Maybe<ReceipeConnectionPublishedAt>>>;
    updated_at?: Maybe<Array<Maybe<ReceipeConnectionUpdatedAt>>>;
};

export type ReceipeInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    image?: InputMaybe<Scalars['ID']>;
    name: Scalars['String'];
    published_at?: InputMaybe<Scalars['DateTime']>;
    receipe_entries?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type RoleInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    description?: InputMaybe<Scalars['String']>;
    name: Scalars['String'];
    permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    type?: InputMaybe<Scalars['String']>;
    updated_by?: InputMaybe<Scalars['ID']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type Store = {
    __typename?: 'Store';
    created_at: Scalars['DateTime'];
    id: Scalars['ID'];
    name: Scalars['String'];
    products?: Maybe<Array<Maybe<Product>>>;
    published_at?: Maybe<Scalars['DateTime']>;
    updated_at: Scalars['DateTime'];
};

export type StoreProductsArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type StoreAggregator = {
    __typename?: 'StoreAggregator';
    count?: Maybe<Scalars['Int']>;
    totalCount?: Maybe<Scalars['Int']>;
};

export type StoreConnection = {
    __typename?: 'StoreConnection';
    aggregate?: Maybe<StoreAggregator>;
    groupBy?: Maybe<StoreGroupBy>;
    values?: Maybe<Array<Maybe<Store>>>;
};

export type StoreConnectionCreatedAt = {
    __typename?: 'StoreConnectionCreated_at';
    connection?: Maybe<StoreConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type StoreConnectionId = {
    __typename?: 'StoreConnectionId';
    connection?: Maybe<StoreConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type StoreConnectionName = {
    __typename?: 'StoreConnectionName';
    connection?: Maybe<StoreConnection>;
    key?: Maybe<Scalars['String']>;
};

export type StoreConnectionPublishedAt = {
    __typename?: 'StoreConnectionPublished_at';
    connection?: Maybe<StoreConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type StoreConnectionUpdatedAt = {
    __typename?: 'StoreConnectionUpdated_at';
    connection?: Maybe<StoreConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type StoreGroupBy = {
    __typename?: 'StoreGroupBy';
    created_at?: Maybe<Array<Maybe<StoreConnectionCreatedAt>>>;
    id?: Maybe<Array<Maybe<StoreConnectionId>>>;
    name?: Maybe<Array<Maybe<StoreConnectionName>>>;
    published_at?: Maybe<Array<Maybe<StoreConnectionPublishedAt>>>;
    updated_at?: Maybe<Array<Maybe<StoreConnectionUpdatedAt>>>;
};

export type StoreInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    name: Scalars['String'];
    products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type UploadFile = {
    __typename?: 'UploadFile';
    alternativeText?: Maybe<Scalars['String']>;
    caption?: Maybe<Scalars['String']>;
    created_at: Scalars['DateTime'];
    ext?: Maybe<Scalars['String']>;
    formats?: Maybe<Scalars['JSON']>;
    hash: Scalars['String'];
    height?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
    mime: Scalars['String'];
    name: Scalars['String'];
    previewUrl?: Maybe<Scalars['String']>;
    provider: Scalars['String'];
    provider_metadata?: Maybe<Scalars['JSON']>;
    related?: Maybe<Array<Maybe<Morph>>>;
    size: Scalars['Float'];
    updated_at: Scalars['DateTime'];
    url: Scalars['String'];
    width?: Maybe<Scalars['Int']>;
};

export type UploadFileRelatedArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
    __typename?: 'UploadFileAggregator';
    avg?: Maybe<UploadFileAggregatorAvg>;
    count?: Maybe<Scalars['Int']>;
    max?: Maybe<UploadFileAggregatorMax>;
    min?: Maybe<UploadFileAggregatorMin>;
    sum?: Maybe<UploadFileAggregatorSum>;
    totalCount?: Maybe<Scalars['Int']>;
};

export type UploadFileAggregatorAvg = {
    __typename?: 'UploadFileAggregatorAvg';
    height?: Maybe<Scalars['Float']>;
    size?: Maybe<Scalars['Float']>;
    width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
    __typename?: 'UploadFileAggregatorMax';
    height?: Maybe<Scalars['Float']>;
    size?: Maybe<Scalars['Float']>;
    width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
    __typename?: 'UploadFileAggregatorMin';
    height?: Maybe<Scalars['Float']>;
    size?: Maybe<Scalars['Float']>;
    width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
    __typename?: 'UploadFileAggregatorSum';
    height?: Maybe<Scalars['Float']>;
    size?: Maybe<Scalars['Float']>;
    width?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
    __typename?: 'UploadFileConnection';
    aggregate?: Maybe<UploadFileAggregator>;
    groupBy?: Maybe<UploadFileGroupBy>;
    values?: Maybe<Array<Maybe<UploadFile>>>;
};

export type UploadFileConnectionAlternativeText = {
    __typename?: 'UploadFileConnectionAlternativeText';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCaption = {
    __typename?: 'UploadFileConnectionCaption';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCreatedAt = {
    __typename?: 'UploadFileConnectionCreated_at';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionExt = {
    __typename?: 'UploadFileConnectionExt';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionFormats = {
    __typename?: 'UploadFileConnectionFormats';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionHash = {
    __typename?: 'UploadFileConnectionHash';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionHeight = {
    __typename?: 'UploadFileConnectionHeight';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['Int']>;
};

export type UploadFileConnectionId = {
    __typename?: 'UploadFileConnectionId';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type UploadFileConnectionMime = {
    __typename?: 'UploadFileConnectionMime';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionName = {
    __typename?: 'UploadFileConnectionName';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionPreviewUrl = {
    __typename?: 'UploadFileConnectionPreviewUrl';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider = {
    __typename?: 'UploadFileConnectionProvider';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProviderMetadata = {
    __typename?: 'UploadFileConnectionProvider_metadata';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionSize = {
    __typename?: 'UploadFileConnectionSize';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['Float']>;
};

export type UploadFileConnectionUpdatedAt = {
    __typename?: 'UploadFileConnectionUpdated_at';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionUrl = {
    __typename?: 'UploadFileConnectionUrl';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionWidth = {
    __typename?: 'UploadFileConnectionWidth';
    connection?: Maybe<UploadFileConnection>;
    key?: Maybe<Scalars['Int']>;
};

export type UploadFileGroupBy = {
    __typename?: 'UploadFileGroupBy';
    alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
    caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
    created_at?: Maybe<Array<Maybe<UploadFileConnectionCreatedAt>>>;
    ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
    formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
    hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
    height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
    id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
    mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
    name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
    previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
    provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
    provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProviderMetadata>>>;
    size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
    updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdatedAt>>>;
    url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
    width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
};

export type UserInput = {
    blocked?: InputMaybe<Scalars['Boolean']>;
    confirmationToken?: InputMaybe<Scalars['String']>;
    confirmed?: InputMaybe<Scalars['Boolean']>;
    created_by?: InputMaybe<Scalars['ID']>;
    email: Scalars['String'];
    password?: InputMaybe<Scalars['String']>;
    provider?: InputMaybe<Scalars['String']>;
    resetPasswordToken?: InputMaybe<Scalars['String']>;
    role?: InputMaybe<Scalars['ID']>;
    updated_by?: InputMaybe<Scalars['ID']>;
    username: Scalars['String'];
};

export type UserPermissionsPasswordPayload = {
    __typename?: 'UserPermissionsPasswordPayload';
    ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
    identifier: Scalars['String'];
    password: Scalars['String'];
    provider?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsLoginPayload = {
    __typename?: 'UsersPermissionsLoginPayload';
    jwt?: Maybe<Scalars['String']>;
    user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
    __typename?: 'UsersPermissionsMe';
    blocked?: Maybe<Scalars['Boolean']>;
    confirmed?: Maybe<Scalars['Boolean']>;
    email: Scalars['String'];
    id: Scalars['ID'];
    role?: Maybe<UsersPermissionsMeRole>;
    username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
    __typename?: 'UsersPermissionsMeRole';
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    name: Scalars['String'];
    type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPermission = {
    __typename?: 'UsersPermissionsPermission';
    action: Scalars['String'];
    controller: Scalars['String'];
    enabled: Scalars['Boolean'];
    id: Scalars['ID'];
    policy?: Maybe<Scalars['String']>;
    role?: Maybe<UsersPermissionsRole>;
    type: Scalars['String'];
};

export type UsersPermissionsRegisterInput = {
    email: Scalars['String'];
    password: Scalars['String'];
    username: Scalars['String'];
};

export type UsersPermissionsRole = {
    __typename?: 'UsersPermissionsRole';
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    name: Scalars['String'];
    permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
    type?: Maybe<Scalars['String']>;
    users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsRolePermissionsArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleUsersArgs = {
    limit?: InputMaybe<Scalars['Int']>;
    sort?: InputMaybe<Scalars['String']>;
    start?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
    __typename?: 'UsersPermissionsRoleAggregator';
    count?: Maybe<Scalars['Int']>;
    totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
    __typename?: 'UsersPermissionsRoleConnection';
    aggregate?: Maybe<UsersPermissionsRoleAggregator>;
    groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
    values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
};

export type UsersPermissionsRoleConnectionDescription = {
    __typename?: 'UsersPermissionsRoleConnectionDescription';
    connection?: Maybe<UsersPermissionsRoleConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionId = {
    __typename?: 'UsersPermissionsRoleConnectionId';
    connection?: Maybe<UsersPermissionsRoleConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleConnectionName = {
    __typename?: 'UsersPermissionsRoleConnectionName';
    connection?: Maybe<UsersPermissionsRoleConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionType = {
    __typename?: 'UsersPermissionsRoleConnectionType';
    connection?: Maybe<UsersPermissionsRoleConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleGroupBy = {
    __typename?: 'UsersPermissionsRoleGroupBy';
    description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
    id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
    name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
    type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
    __typename?: 'UsersPermissionsUser';
    blocked?: Maybe<Scalars['Boolean']>;
    confirmed?: Maybe<Scalars['Boolean']>;
    created_at: Scalars['DateTime'];
    email: Scalars['String'];
    id: Scalars['ID'];
    provider?: Maybe<Scalars['String']>;
    role?: Maybe<UsersPermissionsRole>;
    updated_at: Scalars['DateTime'];
    username: Scalars['String'];
};

export type UsersPermissionsUserAggregator = {
    __typename?: 'UsersPermissionsUserAggregator';
    count?: Maybe<Scalars['Int']>;
    totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
    __typename?: 'UsersPermissionsUserConnection';
    aggregate?: Maybe<UsersPermissionsUserAggregator>;
    groupBy?: Maybe<UsersPermissionsUserGroupBy>;
    values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsUserConnectionBlocked = {
    __typename?: 'UsersPermissionsUserConnectionBlocked';
    connection?: Maybe<UsersPermissionsUserConnection>;
    key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionConfirmed = {
    __typename?: 'UsersPermissionsUserConnectionConfirmed';
    connection?: Maybe<UsersPermissionsUserConnection>;
    key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionCreatedAt = {
    __typename?: 'UsersPermissionsUserConnectionCreated_at';
    connection?: Maybe<UsersPermissionsUserConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionEmail = {
    __typename?: 'UsersPermissionsUserConnectionEmail';
    connection?: Maybe<UsersPermissionsUserConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionId = {
    __typename?: 'UsersPermissionsUserConnectionId';
    connection?: Maybe<UsersPermissionsUserConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionProvider = {
    __typename?: 'UsersPermissionsUserConnectionProvider';
    connection?: Maybe<UsersPermissionsUserConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionRole = {
    __typename?: 'UsersPermissionsUserConnectionRole';
    connection?: Maybe<UsersPermissionsUserConnection>;
    key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionUpdatedAt = {
    __typename?: 'UsersPermissionsUserConnectionUpdated_at';
    connection?: Maybe<UsersPermissionsUserConnection>;
    key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionUsername = {
    __typename?: 'UsersPermissionsUserConnectionUsername';
    connection?: Maybe<UsersPermissionsUserConnection>;
    key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserGroupBy = {
    __typename?: 'UsersPermissionsUserGroupBy';
    blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
    confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
    created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreatedAt>>>;
    email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
    id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
    provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
    role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
    updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdatedAt>>>;
    username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
};

export type CreateBrandInput = {
    data?: InputMaybe<BrandInput>;
};

export type CreateBrandPayload = {
    __typename?: 'createBrandPayload';
    brand?: Maybe<Brand>;
};

export type CreateIngredientInput = {
    data?: InputMaybe<IngredientInput>;
};

export type CreateIngredientPayload = {
    __typename?: 'createIngredientPayload';
    ingredient?: Maybe<Ingredient>;
};

export type CreateProductInput = {
    data?: InputMaybe<ProductInput>;
};

export type CreateProductPayload = {
    __typename?: 'createProductPayload';
    product?: Maybe<Product>;
};

export type CreateReceipeEntryInput = {
    data?: InputMaybe<ReceipeEntryInput>;
};

export type CreateReceipeEntryPayload = {
    __typename?: 'createReceipeEntryPayload';
    receipeEntry?: Maybe<ReceipeEntry>;
};

export type CreateReceipeInput = {
    data?: InputMaybe<ReceipeInput>;
};

export type CreateReceipePayload = {
    __typename?: 'createReceipePayload';
    receipe?: Maybe<Receipe>;
};

export type CreateRoleInput = {
    data?: InputMaybe<RoleInput>;
};

export type CreateRolePayload = {
    __typename?: 'createRolePayload';
    role?: Maybe<UsersPermissionsRole>;
};

export type CreateStoreInput = {
    data?: InputMaybe<StoreInput>;
};

export type CreateStorePayload = {
    __typename?: 'createStorePayload';
    store?: Maybe<Store>;
};

export type CreateUserInput = {
    data?: InputMaybe<UserInput>;
};

export type CreateUserPayload = {
    __typename?: 'createUserPayload';
    user?: Maybe<UsersPermissionsUser>;
};

export type DeleteBrandInput = {
    where?: InputMaybe<InputId>;
};

export type DeleteBrandPayload = {
    __typename?: 'deleteBrandPayload';
    brand?: Maybe<Brand>;
};

export type DeleteFileInput = {
    where?: InputMaybe<InputId>;
};

export type DeleteFilePayload = {
    __typename?: 'deleteFilePayload';
    file?: Maybe<UploadFile>;
};

export type DeleteIngredientInput = {
    where?: InputMaybe<InputId>;
};

export type DeleteIngredientPayload = {
    __typename?: 'deleteIngredientPayload';
    ingredient?: Maybe<Ingredient>;
};

export type DeleteProductInput = {
    where?: InputMaybe<InputId>;
};

export type DeleteProductPayload = {
    __typename?: 'deleteProductPayload';
    product?: Maybe<Product>;
};

export type DeleteReceipeEntryInput = {
    where?: InputMaybe<InputId>;
};

export type DeleteReceipeEntryPayload = {
    __typename?: 'deleteReceipeEntryPayload';
    receipeEntry?: Maybe<ReceipeEntry>;
};

export type DeleteReceipeInput = {
    where?: InputMaybe<InputId>;
};

export type DeleteReceipePayload = {
    __typename?: 'deleteReceipePayload';
    receipe?: Maybe<Receipe>;
};

export type DeleteRoleInput = {
    where?: InputMaybe<InputId>;
};

export type DeleteRolePayload = {
    __typename?: 'deleteRolePayload';
    role?: Maybe<UsersPermissionsRole>;
};

export type DeleteStoreInput = {
    where?: InputMaybe<InputId>;
};

export type DeleteStorePayload = {
    __typename?: 'deleteStorePayload';
    store?: Maybe<Store>;
};

export type DeleteUserInput = {
    where?: InputMaybe<InputId>;
};

export type DeleteUserPayload = {
    __typename?: 'deleteUserPayload';
    user?: Maybe<UsersPermissionsUser>;
};

export type EditBrandInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    name?: InputMaybe<Scalars['String']>;
    products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditFileInput = {
    alternativeText?: InputMaybe<Scalars['String']>;
    caption?: InputMaybe<Scalars['String']>;
    created_by?: InputMaybe<Scalars['ID']>;
    ext?: InputMaybe<Scalars['String']>;
    formats?: InputMaybe<Scalars['JSON']>;
    hash?: InputMaybe<Scalars['String']>;
    height?: InputMaybe<Scalars['Int']>;
    mime?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    previewUrl?: InputMaybe<Scalars['String']>;
    provider?: InputMaybe<Scalars['String']>;
    provider_metadata?: InputMaybe<Scalars['JSON']>;
    related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    size?: InputMaybe<Scalars['Float']>;
    updated_by?: InputMaybe<Scalars['ID']>;
    url?: InputMaybe<Scalars['String']>;
    width?: InputMaybe<Scalars['Int']>;
};

export type EditIngredientInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    image?: InputMaybe<Scalars['ID']>;
    name?: InputMaybe<Scalars['String']>;
    products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    receipe_entries?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    unit?: InputMaybe<EnumIngredientUnit>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditLocaleInput = {
    code?: InputMaybe<Scalars['String']>;
    created_by?: InputMaybe<Scalars['ID']>;
    name?: InputMaybe<Scalars['String']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditProductInput = {
    brand?: InputMaybe<Scalars['ID']>;
    created_by?: InputMaybe<Scalars['ID']>;
    favorite?: InputMaybe<Scalars['Boolean']>;
    image?: InputMaybe<Scalars['ID']>;
    ingredient?: InputMaybe<Scalars['ID']>;
    price?: InputMaybe<Scalars['Float']>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    quantity?: InputMaybe<Scalars['Float']>;
    store?: InputMaybe<Scalars['ID']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditReceipeEntryInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    ingredient?: InputMaybe<Scalars['ID']>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    quantity?: InputMaybe<Scalars['Float']>;
    receipe?: InputMaybe<Scalars['ID']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditReceipeInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    image?: InputMaybe<Scalars['ID']>;
    name?: InputMaybe<Scalars['String']>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    receipe_entries?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditRoleInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    description?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    type?: InputMaybe<Scalars['String']>;
    updated_by?: InputMaybe<Scalars['ID']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type EditStoreInput = {
    created_by?: InputMaybe<Scalars['ID']>;
    name?: InputMaybe<Scalars['String']>;
    products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    published_at?: InputMaybe<Scalars['DateTime']>;
    updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditUserInput = {
    blocked?: InputMaybe<Scalars['Boolean']>;
    confirmationToken?: InputMaybe<Scalars['String']>;
    confirmed?: InputMaybe<Scalars['Boolean']>;
    created_by?: InputMaybe<Scalars['ID']>;
    email?: InputMaybe<Scalars['String']>;
    password?: InputMaybe<Scalars['String']>;
    provider?: InputMaybe<Scalars['String']>;
    resetPasswordToken?: InputMaybe<Scalars['String']>;
    role?: InputMaybe<Scalars['ID']>;
    updated_by?: InputMaybe<Scalars['ID']>;
    username?: InputMaybe<Scalars['String']>;
};

export type UpdateBrandInput = {
    data?: InputMaybe<EditBrandInput>;
    where?: InputMaybe<InputId>;
};

export type UpdateBrandPayload = {
    __typename?: 'updateBrandPayload';
    brand?: Maybe<Brand>;
};

export type UpdateIngredientInput = {
    data?: InputMaybe<EditIngredientInput>;
    where?: InputMaybe<InputId>;
};

export type UpdateIngredientPayload = {
    __typename?: 'updateIngredientPayload';
    ingredient?: Maybe<Ingredient>;
};

export type UpdateProductInput = {
    data?: InputMaybe<EditProductInput>;
    where?: InputMaybe<InputId>;
};

export type UpdateProductPayload = {
    __typename?: 'updateProductPayload';
    product?: Maybe<Product>;
};

export type UpdateReceipeEntryInput = {
    data?: InputMaybe<EditReceipeEntryInput>;
    where?: InputMaybe<InputId>;
};

export type UpdateReceipeEntryPayload = {
    __typename?: 'updateReceipeEntryPayload';
    receipeEntry?: Maybe<ReceipeEntry>;
};

export type UpdateReceipeInput = {
    data?: InputMaybe<EditReceipeInput>;
    where?: InputMaybe<InputId>;
};

export type UpdateReceipePayload = {
    __typename?: 'updateReceipePayload';
    receipe?: Maybe<Receipe>;
};

export type UpdateRoleInput = {
    data?: InputMaybe<EditRoleInput>;
    where?: InputMaybe<InputId>;
};

export type UpdateRolePayload = {
    __typename?: 'updateRolePayload';
    role?: Maybe<UsersPermissionsRole>;
};

export type UpdateStoreInput = {
    data?: InputMaybe<EditStoreInput>;
    where?: InputMaybe<InputId>;
};

export type UpdateStorePayload = {
    __typename?: 'updateStorePayload';
    store?: Maybe<Store>;
};

export type UpdateUserInput = {
    data?: InputMaybe<EditUserInput>;
    where?: InputMaybe<InputId>;
};

export type UpdateUserPayload = {
    __typename?: 'updateUserPayload';
    user?: Maybe<UsersPermissionsUser>;
};

export type BrandsQueryVariables = Exact<{ [key: string]: never }>;

export type BrandsQuery = {
    __typename?: 'Query';
    brands?: Array<{ __typename?: 'Brand'; id: string; name: string } | null> | null;
};

export type StoresQueryVariables = Exact<{ [key: string]: never }>;

export type StoresQuery = {
    __typename?: 'Query';
    stores?: Array<{ __typename?: 'Store'; id: string; name: string } | null> | null;
};

export type CreateBrandMutationVariables = Exact<{
    data?: InputMaybe<CreateBrandInput>;
}>;

export type CreateBrandMutation = {
    __typename?: 'Mutation';
    createBrand?: {
        __typename?: 'createBrandPayload';
        brand?: { __typename?: 'Brand'; id: string; name: string } | null;
    } | null;
};

export type UpdateBrandMutationVariables = Exact<{
    data?: InputMaybe<UpdateBrandInput>;
}>;

export type UpdateBrandMutation = {
    __typename?: 'Mutation';
    updateBrand?: {
        __typename?: 'updateBrandPayload';
        brand?: { __typename?: 'Brand'; id: string; name: string } | null;
    } | null;
};

export type DeleteBrandMutationVariables = Exact<{
    id: Scalars['ID'];
}>;

export type DeleteBrandMutation = {
    __typename?: 'Mutation';
    deleteBrand?: {
        __typename?: 'deleteBrandPayload';
        brand?: { __typename?: 'Brand'; id: string } | null;
    } | null;
};

export type IngredientsQueryVariables = Exact<{ [key: string]: never }>;

export type IngredientsQuery = {
    __typename?: 'Query';
    ingredients?: Array<{
        __typename?: 'Ingredient';
        id: string;
        name: string;
        unit: EnumIngredientUnit;
        image?: { __typename?: 'UploadFile'; url: string } | null;
    } | null> | null;
};

export type IngredientQueryVariables = Exact<{
    id: Scalars['ID'];
}>;

export type IngredientQuery = {
    __typename?: 'Query';
    ingredient?: {
        __typename?: 'Ingredient';
        id: string;
        name: string;
        unit: EnumIngredientUnit;
        image?: { __typename?: 'UploadFile'; id: string; url: string } | null;
        products?: Array<{
            __typename?: 'Product';
            id: string;
            price?: number | null;
            quantity?: number | null;
            favorite: boolean;
            image?: { __typename?: 'UploadFile'; id: string; url: string } | null;
            brand?: { __typename?: 'Brand'; name: string } | null;
        } | null> | null;
    } | null;
};

export type CreateIngredientMutationVariables = Exact<{
    input?: InputMaybe<CreateIngredientInput>;
}>;

export type CreateIngredientMutation = {
    __typename?: 'Mutation';
    createIngredient?: {
        __typename?: 'createIngredientPayload';
        ingredient?: { __typename?: 'Ingredient'; id: string; name: string } | null;
    } | null;
};

export type DeleteIngredientMutationVariables = Exact<{
    id: Scalars['ID'];
}>;

export type DeleteIngredientMutation = {
    __typename?: 'Mutation';
    deleteIngredient?: {
        __typename?: 'deleteIngredientPayload';
        ingredient?: { __typename?: 'Ingredient'; id: string } | null;
    } | null;
};

export type UpdateIngredientMutationVariables = Exact<{
    input?: InputMaybe<UpdateIngredientInput>;
}>;

export type UpdateIngredientMutation = {
    __typename?: 'Mutation';
    updateIngredient?: {
        __typename?: 'updateIngredientPayload';
        ingredient?: {
            __typename?: 'Ingredient';
            id: string;
            name: string;
            unit: EnumIngredientUnit;
            image?: { __typename?: 'UploadFile'; url: string } | null;
            products?: Array<{
                __typename?: 'Product';
                id: string;
                price?: number | null;
                quantity?: number | null;
                favorite: boolean;
                image?: { __typename?: 'UploadFile'; id: string; url: string } | null;
                brand?: { __typename?: 'Brand'; name: string } | null;
            } | null> | null;
        } | null;
    } | null;
};

export type ProductQueryVariables = Exact<{
    id: Scalars['ID'];
}>;

export type ProductQuery = {
    __typename?: 'Query';
    product?: {
        __typename?: 'Product';
        price?: number | null;
        quantity?: number | null;
        ingredient?: { __typename?: 'Ingredient'; unit: EnumIngredientUnit } | null;
        brand?: { __typename?: 'Brand'; id: string; name: string } | null;
        store?: { __typename?: 'Store'; id: string; name: string } | null;
        image?: { __typename?: 'UploadFile'; url: string } | null;
    } | null;
};

export type CreateProductMutationVariables = Exact<{
    data?: InputMaybe<CreateProductInput>;
}>;

export type CreateProductMutation = {
    __typename?: 'Mutation';
    createProduct?: {
        __typename?: 'createProductPayload';
        product?: { __typename?: 'Product'; id: string } | null;
    } | null;
};

export type UpdateProductMutationVariables = Exact<{
    data?: InputMaybe<UpdateProductInput>;
}>;

export type UpdateProductMutation = {
    __typename?: 'Mutation';
    updateProduct?: {
        __typename?: 'updateProductPayload';
        product?: { __typename?: 'Product'; id: string } | null;
    } | null;
};

export type DeleteProductMutationVariables = Exact<{
    id: Scalars['ID'];
}>;

export type DeleteProductMutation = {
    __typename?: 'Mutation';
    deleteProduct?: {
        __typename?: 'deleteProductPayload';
        product?: { __typename?: 'Product'; id: string } | null;
    } | null;
};

export type ReceipeQueryVariables = Exact<{
    id: Scalars['ID'];
}>;

export type ReceipeQuery = {
    __typename?: 'Query';
    receipe?: {
        __typename?: 'Receipe';
        id: string;
        name: string;
        image?: { __typename?: 'UploadFile'; url: string } | null;
        receipe_entries?: Array<{
            __typename?: 'ReceipeEntry';
            id: string;
            quantity: number;
            ingredient?: {
                __typename?: 'Ingredient';
                id: string;
                name: string;
                unit: EnumIngredientUnit;
                image?: { __typename?: 'UploadFile'; url: string } | null;
                products?: Array<{
                    __typename?: 'Product';
                    price?: number | null;
                    quantity?: number | null;
                } | null> | null;
            } | null;
        } | null> | null;
    } | null;
};

export type ReceipesQueryVariables = Exact<{ [key: string]: never }>;

export type ReceipesQuery = {
    __typename?: 'Query';
    receipes?: Array<{
        __typename?: 'Receipe';
        id: string;
        name: string;
        image?: { __typename?: 'UploadFile'; url: string } | null;
    } | null> | null;
};

export type ReceipeEntriesMutationVariables = Exact<{
    input?: InputMaybe<CreateReceipeEntryInput>;
}>;

export type ReceipeEntriesMutation = {
    __typename?: 'Mutation';
    createReceipeEntry?: {
        __typename?: 'createReceipeEntryPayload';
        receipeEntry?: { __typename?: 'ReceipeEntry'; id: string } | null;
    } | null;
};

export type UpdateReceipeMutationVariables = Exact<{
    data?: InputMaybe<UpdateReceipeInput>;
}>;

export type UpdateReceipeMutation = {
    __typename?: 'Mutation';
    updateReceipe?: {
        __typename?: 'updateReceipePayload';
        receipe?: { __typename?: 'Receipe'; id: string } | null;
    } | null;
};

export type CreateReceipeMutationVariables = Exact<{
    data?: InputMaybe<CreateReceipeInput>;
}>;

export type CreateReceipeMutation = {
    __typename?: 'Mutation';
    createReceipe?: {
        __typename?: 'createReceipePayload';
        receipe?: { __typename?: 'Receipe'; id: string } | null;
    } | null;
};

export type DeleteReceipeMutationVariables = Exact<{
    id: Scalars['ID'];
}>;

export type DeleteReceipeMutation = {
    __typename?: 'Mutation';
    deleteReceipe?: {
        __typename?: 'deleteReceipePayload';
        receipe?: {
            __typename?: 'Receipe';
            id: string;
            name: string;
            image?: { __typename?: 'UploadFile'; url: string } | null;
            receipe_entries?: Array<{
                __typename?: 'ReceipeEntry';
                id: string;
                quantity: number;
                ingredient?: {
                    __typename?: 'Ingredient';
                    id: string;
                    name: string;
                    unit: EnumIngredientUnit;
                    image?: { __typename?: 'UploadFile'; url: string } | null;
                    products?: Array<{
                        __typename?: 'Product';
                        price?: number | null;
                        quantity?: number | null;
                    } | null> | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};

export type DeleteReceipeEntryMutationVariables = Exact<{
    id: Scalars['ID'];
}>;

export type DeleteReceipeEntryMutation = {
    __typename?: 'Mutation';
    deleteReceipeEntry?: {
        __typename?: 'deleteReceipeEntryPayload';
        receipeEntry?: { __typename?: 'ReceipeEntry'; id: string } | null;
    } | null;
};

export type GetReceipeFragment = {
    __typename?: 'Receipe';
    id: string;
    name: string;
    image?: { __typename?: 'UploadFile'; url: string } | null;
    receipe_entries?: Array<{
        __typename?: 'ReceipeEntry';
        id: string;
        quantity: number;
        ingredient?: {
            __typename?: 'Ingredient';
            id: string;
            name: string;
            unit: EnumIngredientUnit;
            image?: { __typename?: 'UploadFile'; url: string } | null;
            products?: Array<{
                __typename?: 'Product';
                price?: number | null;
                quantity?: number | null;
            } | null> | null;
        } | null;
    } | null> | null;
};

export type CreateStoreMutationVariables = Exact<{
    data?: InputMaybe<CreateStoreInput>;
}>;

export type CreateStoreMutation = {
    __typename?: 'Mutation';
    createStore?: {
        __typename?: 'createStorePayload';
        store?: { __typename?: 'Store'; id: string; name: string } | null;
    } | null;
};

export type UpdateStoreMutationVariables = Exact<{
    data?: InputMaybe<UpdateStoreInput>;
}>;

export type UpdateStoreMutation = {
    __typename?: 'Mutation';
    updateStore?: {
        __typename?: 'updateStorePayload';
        store?: { __typename?: 'Store'; id: string; name: string } | null;
    } | null;
};

export type DeleteStoreMutationVariables = Exact<{
    id: Scalars['ID'];
}>;

export type DeleteStoreMutation = {
    __typename?: 'Mutation';
    deleteStore?: {
        __typename?: 'deleteStorePayload';
        store?: { __typename?: 'Store'; id: string } | null;
    } | null;
};

export const GetReceipeFragmentDoc = `
    fragment getReceipe on Receipe {
  id
  name
  image {
    url
  }
  receipe_entries {
    id
    ingredient {
      id
      name
      image {
        url
      }
      unit
      products(where: {favorite: true}) {
        price
        quantity
      }
    }
    quantity
  }
}
    `;
export const BrandsDocument = `
    query brands {
  brands {
    id
    name
  }
}
    `;
export const useBrandsQuery = <TData = BrandsQuery, TError = unknown>(
    variables?: BrandsQueryVariables,
    options?: UseQueryOptions<BrandsQuery, TError, TData>,
) =>
    useQuery<BrandsQuery, TError, TData>(
        variables === undefined ? ['brands'] : ['brands', variables],
        fetcher<BrandsQuery, BrandsQueryVariables>(BrandsDocument, variables),
        options,
    );
export const StoresDocument = `
    query stores {
  stores {
    id
    name
  }
}
    `;
export const useStoresQuery = <TData = StoresQuery, TError = unknown>(
    variables?: StoresQueryVariables,
    options?: UseQueryOptions<StoresQuery, TError, TData>,
) =>
    useQuery<StoresQuery, TError, TData>(
        variables === undefined ? ['stores'] : ['stores', variables],
        fetcher<StoresQuery, StoresQueryVariables>(StoresDocument, variables),
        options,
    );
export const CreateBrandDocument = `
    mutation createBrand($data: createBrandInput) {
  createBrand(input: $data) {
    brand {
      id
      name
    }
  }
}
    `;
export const useCreateBrandMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        CreateBrandMutation,
        TError,
        CreateBrandMutationVariables,
        TContext
    >,
) =>
    useMutation<CreateBrandMutation, TError, CreateBrandMutationVariables, TContext>(
        ['createBrand'],
        (variables?: CreateBrandMutationVariables) =>
            fetcher<CreateBrandMutation, CreateBrandMutationVariables>(
                CreateBrandDocument,
                variables,
            )(),
        options,
    );
export const UpdateBrandDocument = `
    mutation updateBrand($data: updateBrandInput) {
  updateBrand(input: $data) {
    brand {
      id
      name
    }
  }
}
    `;
export const useUpdateBrandMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        UpdateBrandMutation,
        TError,
        UpdateBrandMutationVariables,
        TContext
    >,
) =>
    useMutation<UpdateBrandMutation, TError, UpdateBrandMutationVariables, TContext>(
        ['updateBrand'],
        (variables?: UpdateBrandMutationVariables) =>
            fetcher<UpdateBrandMutation, UpdateBrandMutationVariables>(
                UpdateBrandDocument,
                variables,
            )(),
        options,
    );
export const DeleteBrandDocument = `
    mutation deleteBrand($id: ID!) {
  deleteBrand(input: {where: {id: $id}}) {
    brand {
      id
    }
  }
}
    `;
export const useDeleteBrandMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        DeleteBrandMutation,
        TError,
        DeleteBrandMutationVariables,
        TContext
    >,
) =>
    useMutation<DeleteBrandMutation, TError, DeleteBrandMutationVariables, TContext>(
        ['deleteBrand'],
        (variables?: DeleteBrandMutationVariables) =>
            fetcher<DeleteBrandMutation, DeleteBrandMutationVariables>(
                DeleteBrandDocument,
                variables,
            )(),
        options,
    );
export const IngredientsDocument = `
    query ingredients {
  ingredients {
    id
    name
    unit
    image {
      url
    }
  }
}
    `;
export const useIngredientsQuery = <TData = IngredientsQuery, TError = unknown>(
    variables?: IngredientsQueryVariables,
    options?: UseQueryOptions<IngredientsQuery, TError, TData>,
) =>
    useQuery<IngredientsQuery, TError, TData>(
        variables === undefined ? ['ingredients'] : ['ingredients', variables],
        fetcher<IngredientsQuery, IngredientsQueryVariables>(IngredientsDocument, variables),
        options,
    );
export const IngredientDocument = `
    query ingredient($id: ID!) {
  ingredient(id: $id) {
    id
    name
    image {
      id
      url
    }
    unit
    products {
      id
      price
      quantity
      favorite
      image {
        id
        url
      }
      brand {
        name
      }
    }
  }
}
    `;
export const useIngredientQuery = <TData = IngredientQuery, TError = unknown>(
    variables: IngredientQueryVariables,
    options?: UseQueryOptions<IngredientQuery, TError, TData>,
) =>
    useQuery<IngredientQuery, TError, TData>(
        ['ingredient', variables],
        fetcher<IngredientQuery, IngredientQueryVariables>(IngredientDocument, variables),
        options,
    );
export const CreateIngredientDocument = `
    mutation createIngredient($input: createIngredientInput) {
  createIngredient(input: $input) {
    ingredient {
      id
      name
    }
  }
}
    `;
export const useCreateIngredientMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        CreateIngredientMutation,
        TError,
        CreateIngredientMutationVariables,
        TContext
    >,
) =>
    useMutation<CreateIngredientMutation, TError, CreateIngredientMutationVariables, TContext>(
        ['createIngredient'],
        (variables?: CreateIngredientMutationVariables) =>
            fetcher<CreateIngredientMutation, CreateIngredientMutationVariables>(
                CreateIngredientDocument,
                variables,
            )(),
        options,
    );
export const DeleteIngredientDocument = `
    mutation deleteIngredient($id: ID!) {
  deleteIngredient(input: {where: {id: $id}}) {
    ingredient {
      id
    }
  }
}
    `;
export const useDeleteIngredientMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        DeleteIngredientMutation,
        TError,
        DeleteIngredientMutationVariables,
        TContext
    >,
) =>
    useMutation<DeleteIngredientMutation, TError, DeleteIngredientMutationVariables, TContext>(
        ['deleteIngredient'],
        (variables?: DeleteIngredientMutationVariables) =>
            fetcher<DeleteIngredientMutation, DeleteIngredientMutationVariables>(
                DeleteIngredientDocument,
                variables,
            )(),
        options,
    );
export const UpdateIngredientDocument = `
    mutation updateIngredient($input: updateIngredientInput) {
  updateIngredient(input: $input) {
    ingredient {
      id
      name
      unit
      image {
        url
      }
      products {
        id
        price
        quantity
        favorite
        image {
          id
          url
        }
        brand {
          name
        }
      }
    }
  }
}
    `;
export const useUpdateIngredientMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        UpdateIngredientMutation,
        TError,
        UpdateIngredientMutationVariables,
        TContext
    >,
) =>
    useMutation<UpdateIngredientMutation, TError, UpdateIngredientMutationVariables, TContext>(
        ['updateIngredient'],
        (variables?: UpdateIngredientMutationVariables) =>
            fetcher<UpdateIngredientMutation, UpdateIngredientMutationVariables>(
                UpdateIngredientDocument,
                variables,
            )(),
        options,
    );
export const ProductDocument = `
    query product($id: ID!) {
  product(id: $id) {
    price
    quantity
    ingredient {
      unit
    }
    brand {
      id
      name
    }
    store {
      id
      name
    }
    image {
      url
    }
  }
}
    `;
export const useProductQuery = <TData = ProductQuery, TError = unknown>(
    variables: ProductQueryVariables,
    options?: UseQueryOptions<ProductQuery, TError, TData>,
) =>
    useQuery<ProductQuery, TError, TData>(
        ['product', variables],
        fetcher<ProductQuery, ProductQueryVariables>(ProductDocument, variables),
        options,
    );
export const CreateProductDocument = `
    mutation createProduct($data: createProductInput) {
  createProduct(input: $data) {
    product {
      id
    }
  }
}
    `;
export const useCreateProductMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        CreateProductMutation,
        TError,
        CreateProductMutationVariables,
        TContext
    >,
) =>
    useMutation<CreateProductMutation, TError, CreateProductMutationVariables, TContext>(
        ['createProduct'],
        (variables?: CreateProductMutationVariables) =>
            fetcher<CreateProductMutation, CreateProductMutationVariables>(
                CreateProductDocument,
                variables,
            )(),
        options,
    );
export const UpdateProductDocument = `
    mutation updateProduct($data: updateProductInput) {
  updateProduct(input: $data) {
    product {
      id
    }
  }
}
    `;
export const useUpdateProductMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        UpdateProductMutation,
        TError,
        UpdateProductMutationVariables,
        TContext
    >,
) =>
    useMutation<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>(
        ['updateProduct'],
        (variables?: UpdateProductMutationVariables) =>
            fetcher<UpdateProductMutation, UpdateProductMutationVariables>(
                UpdateProductDocument,
                variables,
            )(),
        options,
    );
export const DeleteProductDocument = `
    mutation deleteProduct($id: ID!) {
  deleteProduct(input: {where: {id: $id}}) {
    product {
      id
    }
  }
}
    `;
export const useDeleteProductMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        DeleteProductMutation,
        TError,
        DeleteProductMutationVariables,
        TContext
    >,
) =>
    useMutation<DeleteProductMutation, TError, DeleteProductMutationVariables, TContext>(
        ['deleteProduct'],
        (variables?: DeleteProductMutationVariables) =>
            fetcher<DeleteProductMutation, DeleteProductMutationVariables>(
                DeleteProductDocument,
                variables,
            )(),
        options,
    );
export const ReceipeDocument = `
    query receipe($id: ID!) {
  receipe(id: $id) {
    ...getReceipe
  }
}
    ${GetReceipeFragmentDoc}`;
export const useReceipeQuery = <TData = ReceipeQuery, TError = unknown>(
    variables: ReceipeQueryVariables,
    options?: UseQueryOptions<ReceipeQuery, TError, TData>,
) =>
    useQuery<ReceipeQuery, TError, TData>(
        ['receipe', variables],
        fetcher<ReceipeQuery, ReceipeQueryVariables>(ReceipeDocument, variables),
        options,
    );
export const ReceipesDocument = `
    query receipes {
  receipes {
    id
    name
    image {
      url
    }
  }
}
    `;
export const useReceipesQuery = <TData = ReceipesQuery, TError = unknown>(
    variables?: ReceipesQueryVariables,
    options?: UseQueryOptions<ReceipesQuery, TError, TData>,
) =>
    useQuery<ReceipesQuery, TError, TData>(
        variables === undefined ? ['receipes'] : ['receipes', variables],
        fetcher<ReceipesQuery, ReceipesQueryVariables>(ReceipesDocument, variables),
        options,
    );
export const ReceipeEntriesDocument = `
    mutation receipeEntries($input: createReceipeEntryInput) {
  createReceipeEntry(input: $input) {
    receipeEntry {
      id
    }
  }
}
    `;
export const useReceipeEntriesMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        ReceipeEntriesMutation,
        TError,
        ReceipeEntriesMutationVariables,
        TContext
    >,
) =>
    useMutation<ReceipeEntriesMutation, TError, ReceipeEntriesMutationVariables, TContext>(
        ['receipeEntries'],
        (variables?: ReceipeEntriesMutationVariables) =>
            fetcher<ReceipeEntriesMutation, ReceipeEntriesMutationVariables>(
                ReceipeEntriesDocument,
                variables,
            )(),
        options,
    );
export const UpdateReceipeDocument = `
    mutation updateReceipe($data: updateReceipeInput) {
  updateReceipe(input: $data) {
    receipe {
      id
    }
  }
}
    `;
export const useUpdateReceipeMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        UpdateReceipeMutation,
        TError,
        UpdateReceipeMutationVariables,
        TContext
    >,
) =>
    useMutation<UpdateReceipeMutation, TError, UpdateReceipeMutationVariables, TContext>(
        ['updateReceipe'],
        (variables?: UpdateReceipeMutationVariables) =>
            fetcher<UpdateReceipeMutation, UpdateReceipeMutationVariables>(
                UpdateReceipeDocument,
                variables,
            )(),
        options,
    );
export const CreateReceipeDocument = `
    mutation createReceipe($data: createReceipeInput) {
  createReceipe(input: $data) {
    receipe {
      id
    }
  }
}
    `;
export const useCreateReceipeMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        CreateReceipeMutation,
        TError,
        CreateReceipeMutationVariables,
        TContext
    >,
) =>
    useMutation<CreateReceipeMutation, TError, CreateReceipeMutationVariables, TContext>(
        ['createReceipe'],
        (variables?: CreateReceipeMutationVariables) =>
            fetcher<CreateReceipeMutation, CreateReceipeMutationVariables>(
                CreateReceipeDocument,
                variables,
            )(),
        options,
    );
export const DeleteReceipeDocument = `
    mutation deleteReceipe($id: ID!) {
  deleteReceipe(input: {where: {id: $id}}) {
    receipe {
      ...getReceipe
    }
  }
}
    ${GetReceipeFragmentDoc}`;
export const useDeleteReceipeMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        DeleteReceipeMutation,
        TError,
        DeleteReceipeMutationVariables,
        TContext
    >,
) =>
    useMutation<DeleteReceipeMutation, TError, DeleteReceipeMutationVariables, TContext>(
        ['deleteReceipe'],
        (variables?: DeleteReceipeMutationVariables) =>
            fetcher<DeleteReceipeMutation, DeleteReceipeMutationVariables>(
                DeleteReceipeDocument,
                variables,
            )(),
        options,
    );
export const DeleteReceipeEntryDocument = `
    mutation deleteReceipeEntry($id: ID!) {
  deleteReceipeEntry(input: {where: {id: $id}}) {
    receipeEntry {
      id
    }
  }
}
    `;
export const useDeleteReceipeEntryMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        DeleteReceipeEntryMutation,
        TError,
        DeleteReceipeEntryMutationVariables,
        TContext
    >,
) =>
    useMutation<DeleteReceipeEntryMutation, TError, DeleteReceipeEntryMutationVariables, TContext>(
        ['deleteReceipeEntry'],
        (variables?: DeleteReceipeEntryMutationVariables) =>
            fetcher<DeleteReceipeEntryMutation, DeleteReceipeEntryMutationVariables>(
                DeleteReceipeEntryDocument,
                variables,
            )(),
        options,
    );
export const CreateStoreDocument = `
    mutation createStore($data: createStoreInput) {
  createStore(input: $data) {
    store {
      id
      name
    }
  }
}
    `;
export const useCreateStoreMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        CreateStoreMutation,
        TError,
        CreateStoreMutationVariables,
        TContext
    >,
) =>
    useMutation<CreateStoreMutation, TError, CreateStoreMutationVariables, TContext>(
        ['createStore'],
        (variables?: CreateStoreMutationVariables) =>
            fetcher<CreateStoreMutation, CreateStoreMutationVariables>(
                CreateStoreDocument,
                variables,
            )(),
        options,
    );
export const UpdateStoreDocument = `
    mutation updateStore($data: updateStoreInput) {
  updateStore(input: $data) {
    store {
      id
      name
    }
  }
}
    `;
export const useUpdateStoreMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        UpdateStoreMutation,
        TError,
        UpdateStoreMutationVariables,
        TContext
    >,
) =>
    useMutation<UpdateStoreMutation, TError, UpdateStoreMutationVariables, TContext>(
        ['updateStore'],
        (variables?: UpdateStoreMutationVariables) =>
            fetcher<UpdateStoreMutation, UpdateStoreMutationVariables>(
                UpdateStoreDocument,
                variables,
            )(),
        options,
    );
export const DeleteStoreDocument = `
    mutation deleteStore($id: ID!) {
  deleteStore(input: {where: {id: $id}}) {
    store {
      id
    }
  }
}
    `;
export const useDeleteStoreMutation = <TError = unknown, TContext = unknown>(
    options?: UseMutationOptions<
        DeleteStoreMutation,
        TError,
        DeleteStoreMutationVariables,
        TContext
    >,
) =>
    useMutation<DeleteStoreMutation, TError, DeleteStoreMutationVariables, TContext>(
        ['deleteStore'],
        (variables?: DeleteStoreMutationVariables) =>
            fetcher<DeleteStoreMutation, DeleteStoreMutationVariables>(
                DeleteStoreDocument,
                variables,
            )(),
        options,
    );
