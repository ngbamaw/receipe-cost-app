import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import ReceipeType from './pages/Receipe';
import Product from './pages/Product';
import Ingredients from './pages/Ingredients';
import Brands from './pages/Brands';
import Stores from './pages/Stores';
import Receipes from './pages/Receipes';
import Layout from './pages/Layout';
import EditReceipe from './pages/EditReceipe';
import EditProduct from './pages/EditProduct';
import Products from './pages/Products';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="receipes">
                            <Route index element={<Receipes />} />
                            <Route path="new" element={<EditReceipe />} />
                            <Route path=":receipeId" element={<ReceipeType />} />
                            <Route path=":receipeId/edit" element={<EditReceipe />} />
                        </Route>
                        <Route path="ingredients">
                            <Route index element={<Ingredients />} />
                            <Route path=":ingredientId">
                                <Route index element={<Products />} />
                                <Route path="new" element={<EditProduct />} />
                                <Route path=":productId" element={<Product />} />
                                <Route path=":productId/edit" element={<EditProduct />} />
                            </Route>
                        </Route>
                        <Route path="marques">
                            <Route index element={<Brands />} />
                        </Route>
                        <Route path="magasins">
                            <Route index element={<Stores />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
