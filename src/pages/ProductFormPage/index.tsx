import { useParams } from 'react-router-dom';
import './index.scss';
import { useEffect } from 'react';
import { Product } from '../../models/Product';
import api from '../../services/api';
import { AxiosResponse } from 'axios';

export default function ProductFormPage() {
  const { id } = useParams<{ id: string }>(); 

  const getProductById = async () => {
    if (!id) return; 
    
    api
      .get<unknown, AxiosResponse<Product>>(`/produto/${id}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.error('Erro ao buscar produto', err);
      });
  };
  

  useEffect(() => {
    getProductById();
  }, [id]); 

  return (
    <div className="product-form">
      <div className="product-list-header">
        <h1 className="product-list-header__title"> {id ? 'Editar produto' : 'Cadastrar novo produto'}</h1>
      </div>
    </div>
  );
}
