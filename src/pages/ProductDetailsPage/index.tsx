import './index.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../models/Product';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import fallbackAvatar from '../../assets/images/product-icon.png';
import { format } from 'date-fns';

export default function ProductDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(fallbackAvatar);

  const handleEdit = () => {
    navigate(`/form-product/${id}`);
  };

  const goToList = () => {
    navigate(`/products`);
  };

  const handleDelete = () => {
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    if (!id) return;

    api
      .delete<unknown, AxiosResponse<Product>>(`/product/${id}`)
      .then(() => {
        navigate('/product');
      })
      .catch((err) => {
        setOpenModal(false);
        console.error('Erro ao buscar product', err);
      });
  };

  const handleCancelDelete = () => {
    setOpenModal(false);
  };

  const handleAvatarError = () => {
    setAvatarSrc(fallbackAvatar);
  };

  const getProductById = useCallback(async () => {
    if (!id) return;

    api
      .get<unknown, AxiosResponse<Product>>(`/produto/${id}`)
      .then((res) => {
        setProduct(res.data);
        setAvatarSrc(res.data.avatar);
      })
      .catch((err) => {
        console.error('Erro ao buscar product', err);
      });
  }, [id]);

  useEffect(() => {
    getProductById();
  }, [getProductById]);

  return (
    <div className="product-details">
      <div className="product-details-header">
        <div className="product-details-header__title">
          <IconButton color="secondary" onClick={() => goToList()}>
            <ArrowBackIcon />
          </IconButton>
          <h1>Detalhes do produto</h1>
        </div>

        <div className="product-details-header__buttons">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </div>
      </div>
      <div className="product-details-content">
        <div className="content-data">
          <Avatar
            src={avatarSrc}
            alt={product?.nome}
            sx={{ width: 100, height: 100, marginBottom: 2 }}
            onError={handleAvatarError}
          />
        </div>

        <div className="content-grid">
          <div className="content-data">
            <p className="content-data__title">Nome</p>
            <p className="content-data__text">{product?.nome || '-'}</p>
          </div>
          <div className="content-data">
            <p className="content-data__title">Marca</p>
            <p className="content-data__text">{product?.marca || '-'}</p>
          </div>

          <div className="content-data">
            <p className="content-data__title">Data de criação</p>
            <p className="content-data__text">
              {product?.createdAt
                ? format(new Date(product?.createdAt), 'dd/MM/yyyy HH:mm')
                : '-'}
            </p>
          </div>

          <div className="content-data">
            <p className="content-data__title">Preço</p>
            <p className="content-data__text">
              {product?.preco
                ? Number(product.preco)
                  ? `R$ ${Number(product.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : product.preco
                : '-'}
            </p>
          </div>

          <div className="content-data">
            <p className="content-data__title">Qtd. Estoque</p>
            <p className="content-data__text">{product?.qt_estoque || '-'}</p>
          </div>

          <div className="content-data">
            <p className="content-data__title">Qtd. Vendidos</p>
            <p className="content-data__text">{product?.qt_vendas || '-'}</p>
          </div>
        </div>
      </div>
      <Dialog open={openModal} onClose={handleCancelDelete}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir este product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
