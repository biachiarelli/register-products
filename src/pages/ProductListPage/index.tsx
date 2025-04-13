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
} from '@mui/material';
import { format } from 'date-fns';

export default function ProductListPage() {
  const [ products, setProducts ] = useState<Product[]>([]);

  const getProducts = () => {
    api
      .get<unknown, AxiosResponse<Product[]>>(`/produto`)
      .then((res) => {
        setProducts(res.data)
      })
      .catch(() => {

      });
  };
  

  useEffect(()=> {
    getProducts()
  }, []);

  return (
    <div className="product-list">
      <h1 className="product-list-title">Lista de produtos</h1>
      
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Imagem</TableCell>
            <TableCell>Criado em</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Estoque</TableCell>
            <TableCell>Vendas</TableCell>
            <TableCell>Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Avatar src={product.avatar} alt={product.nome}  />
              </TableCell>
              <TableCell>{format(new Date(product.createdAt), 'dd/MM/yyyy HH:mm')} </TableCell>
              <TableCell>{product.nome}</TableCell>
              <TableCell>{product.marca}</TableCell>
              <TableCell>{Number(product.qt_estoque) ? `${Number(product.qt_estoque)}` : '-'  }</TableCell>
              <TableCell>{Number(product.qt_vendas) ? `${Number(product.qt_vendas)}` : '-'  }</TableCell>
              <TableCell>{ Number(product.preco) ? `R$ ${Number(product.preco).toFixed(2)}` : product.preco }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </div>
  );
}

