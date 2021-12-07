import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Receipe from './Pages/Receipe';
import Ingredient from './Pages/Ingredient';
import Ingredients from './Pages/Ingredients';
import Receipes from './Pages/Receipes';
import Layout from './Pages/Layout';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="receipes" element={<Receipes />}>
                        <Route path=":receipeId" element={<Receipe />} />
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
