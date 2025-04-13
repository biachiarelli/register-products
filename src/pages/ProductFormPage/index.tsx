import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../models/Product';
import api from '../../services/api';
import { AxiosResponse } from 'axios';
import { Alert, AlertColor, Button, IconButton, Snackbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

export default function ProductFormPage() {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });
  const { id } = useParams<{ id: string }>();
  const [, setProduct] = useState<Product | null>(null);
  const [initialValues, setInitialValues] = useState({
    nome: '',
    avatar: '',
    preco: '',
    qt_estoque: 0,
    qt_vendas: 0,
    marca: '',
  });

  const goToDeatils = () => {
    navigate(`/product/${id}`);
  };

  const getProductById = useCallback(async () => {
    if (!id) return;

    try {
      const res = await api.get<unknown, AxiosResponse<Product>>(
        `/produto/${id}`
      );
      setProduct(res.data);
      setInitialValues({
        nome: res.data.nome,
        avatar: res.data.avatar,
        preco: res.data.preco,
        qt_estoque: res.data.qt_estoque,
        qt_vendas: res.data.qt_vendas,
        marca: res.data.marca,
      });
    } catch (err) {
      console.error('Erro ao buscar produto', err);
    }
  }, [id]);

  useEffect(() => {
    getProductById();
  }, [getProductById]);

  return (
    <div className="product-form">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type as AlertColor}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className="product-form-header">
        {id && (
          <IconButton color="secondary" onClick={() => goToDeatils()}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <h1 className="product-form-header__title">
          {' '}
          {id ? 'Editar produto' : 'Cadastrar novo produto'}
        </h1>
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);

          if (id) {
            api
              .put<unknown, AxiosResponse<Product>>(`/produto/${id}`, values)
              .then(() => {
                setSnackbar({
                  open: true,
                  type: 'success',
                  message: 'Produto salvo com sucesso!',
                });
                resetForm();
              })
              .catch((err) => {
                console.error('Erro ao buscar produto', err);
                setSnackbar({
                  open: true,
                  type: 'error',
                  message: 'Ocorreu um erro ao salvar o produto',
                });
              });
          } else {
            api
              .post<unknown, AxiosResponse<Product>>(`/produto`, values)
              .then(() => {
                setSnackbar({
                  open: true,
                  type: 'success',
                  message: 'Produto salvo com sucesso!',
                });
                resetForm();
              })
              .catch((err) => {
                console.error('Erro ao buscar produto', err);
                setSnackbar({
                  open: true,
                  type: 'error',
                  message: 'Ocorreu um erro ao salvar o produto',
                });
              });
          }
        }}
      >
        {() => (
          <Form className="product-form-content">
            <Field
              name="nome"
              label="Nome"
              fullWidth
              margin="normal"
              component={TextField}
              required
            />
            <Field
              name="avatar"
              label="Imagem (URL)"
              fullWidth
              margin="normal"
              component={TextField}
              required
            />
            <Field
              name="preco"
              label="Preço"
              fullWidth
              margin="normal"
              component={TextField}
              required
            />
            <Field
              name="qt_estoque"
              label="Quantidade em estoque"
              fullWidth
              margin="normal"
              type="number"
              component={TextField}
              required
            />
            <Field
              name="qt_vendas"
              label="Quantidade de vendas"
              fullWidth
              margin="normal"
              type="number"
              component={TextField}
              required
            />
            <Field
              name="marca"
              label="Marca"
              fullWidth
              margin="normal"
              component={TextField}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Salvar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
