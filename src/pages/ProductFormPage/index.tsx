import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import { useEffect } from 'react';
import { Product } from '../../models/Product';
import api from '../../services/api';
import { AxiosResponse } from 'axios';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 

  const goToDeatils = () => {
    navigate(`/product/${id}`);
  }

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
      <div className="product-form-header">
        { id && 
          <IconButton color='secondary' onClick={() => goToDeatils()} >
            <ArrowBackIcon />
          </IconButton>
        }
        <h1 className="product-form-header__title"> {id ? 'Editar produto' : 'Cadastrar novo produto'}</h1>
      </div>
    </div>
  );
}
