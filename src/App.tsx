import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Receipe from './Pages/Receipe';
import Ingredient from './Pages/Ingredient';
import Ingredients from './Pages/Ingredients';
import Receipes from './Pages/Receipes';
import Layout from './Pages/Layout';
import CreateReceipe from './Pages/CreateReceipe';
import EditReceipe from './Pages/EditReceipe';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="receipes">
                        <Route index element={<Receipes />} />
                        <Route path="new" element={<CreateReceipe />} />
                        <Route path=":receipeId" element={<Receipe />} />
                        <Route path=":receipeId/edit" element={<EditReceipe />} />
                    </Route>
                    <Route path="ingredients" element={<Ingredients />}>
                        <Route path=":ingredientId" element={<Ingredient />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
