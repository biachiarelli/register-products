import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FormProduct from './pages/FormProduct';
import Products from './pages/Register';
import Register from './pages/Products';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/create" element={<FormProduct />} />
      <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
    </Routes>
    </BrowserRouter>
  );
}
