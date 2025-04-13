import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductFormPage from './pages/ProductFormPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
          element={
            token ? 
            <ProtectedRoute>
              <ProductListPage />
            </ProtectedRoute>
            : <Login />
            } 
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Pages */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form-product"
          element={
            <ProtectedRoute>
              <ProductFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetailsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="*"
          element={
             token ?
            <ProtectedRoute>
              <NotFoundPage />
            </ProtectedRoute> 
            :
            <NotFoundPage />
          }
        /> 
      </Routes>
    </BrowserRouter>
  );
}
