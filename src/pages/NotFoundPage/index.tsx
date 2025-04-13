import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import Image from '../../assets/images/illustration-not-found.png';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const goToInit = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <h1 className="not-found-title">Página não encontrada</h1>
      <img className="not-found-image" src={Image} alt="Não encontrado" />
      <p className="not-found-text">Não achamos a página que esta procurando</p>
      <Button variant="contained" color="primary" onClick={() => goToInit()}>
        Ir para início
      </Button>
    </div>
  );
}
