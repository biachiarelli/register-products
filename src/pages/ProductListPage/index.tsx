import './index.scss';
import { AxiosResponse } from "axios";
import api from "../../services/api";
import { Product } from "../../models/Product";
import { useEffect, useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function ProductListPage() {
  const navigate = useNavigate();
  const [ products, setProducts ] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // resetar para a primeira página
  };

  const getProducts = () => {
    api
      .get<unknown, AxiosResponse<Product[]>>(`/produto`)
      .then((res) => {
        setProducts(res.data)
      })
      .catch(() => {

      });
  };

  const goToProductForm = (id?: string) => {
    if(id)
      navigate('/form-product')

    
    navigate('/form-product')
  }
  

  useEffect(()=> {
    getProducts()
  }, []);

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h1 className="product-list-header__title">Lista de produtos</h1>
        
        <Button
            variant="contained"
            color="secondary"
            onClick={() => goToProductForm()}
          >
            Cadastrar novo produto
          </Button>
      </div>
      
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
            </TableRow>
          </TableHead>
          <TableBody>
          {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Avatar src={product.avatar} alt={product.nome}  />
              </TableCell>
              <TableCell>{product.nome}</TableCell>
              <TableCell>{product.marca}</TableCell>
              <TableCell>{Number(product.qt_estoque) ? `${Number(product.qt_estoque)}` : '-'  }</TableCell>
              <TableCell>{Number(product.qt_vendas) ? `${Number(product.qt_vendas)}` : '-'  }</TableCell>
              <TableCell>{ Number(product.preco) ? `R$ ${Number(product.preco).toFixed(2)}` : product.preco }</TableCell>
              <TableCell>{format(new Date(product.createdAt), 'dd/MM/yyyy HH:mm')} </TableCell>

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

