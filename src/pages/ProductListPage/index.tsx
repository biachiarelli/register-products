import './index.scss';
import { AxiosResponse } from 'axios';
import api from '../../services/api';
import { Product } from '../../models/Product';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AvatarWithFallback from '../../components/AvatarWithFallback';

export default function ProductListPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchValue, setSearchValue] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getProducts = (search = '') => {
    api
      .get<unknown, AxiosResponse<Product[]>>(`/produto`, {
        params: {
          search: search || undefined,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => {});
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    getProducts(value);
  };

  const goToProductForm = () => {
    navigate('/form-product');
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h1 className="product-list-header__title">Lista de produtos</h1>

        <Button variant="contained" color="secondary" onClick={goToProductForm}>
          Cadastrar novo produto
        </Button>
      </div>

      <TextField
        label="Buscar produto"
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={handleSearchChange}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagem</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell>Vendas</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Criado em</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => (
                <TableRow key={`${product.id}-${index}`}>
                  <TableCell>
                    <AvatarWithFallback
                      src={product.avatar}
                      alt={product.nome}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell>{product.nome}</TableCell>
                  <TableCell>{product.marca}</TableCell>
                  <TableCell>{Number(product.qt_estoque) || '-'}</TableCell>
                  <TableCell>{Number(product.qt_vendas) || '-'}</TableCell>
                  <TableCell>
                    {Number(product.preco)
                      ? `R$ ${Number(product.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : product.preco}
                  </TableCell>
                  <TableCell>
                    {format(new Date(product.createdAt), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Ver detalhes">
                      <IconButton
                        color="secondary"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
