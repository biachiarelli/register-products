import './index.scss';
import Image from '../../assets/images/illustration-register.png';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    api
      .get(`/user?search=${email}`)
      .then((res) => {
        console.log(res);

        if (res.data[0]) {
          const user = res.data[0];
          if (user.senha === password) {
            localStorage.setItem('token', user.token);
            navigate('/products');
          } else {
            setSnackbar({
              open: true,
              type: 'error',
              message: 'Senha incorreta',
            });
          }
        } else {
          setSnackbar({
            open: true,
            type: 'error',
            message: 'Usuário não cadastrado',
          });
        }
      })
      .catch(() => {
        setSnackbar({
          open: true,
          type: 'error',
          message: 'Credenciais inválidas',
        });
      });
  };

  return (
    <div className="login">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className="login-content">
        <img className="login-image" src={Image} />
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__title">Login</h1>
          <p className="login-form__text">
            Faça o login para entrar na plataforma
          </p>

          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>

          <div className="login-form__footer">
            <p className="login-form__text">
              Ainda não tem conta?{' '}
              <a href="/register" className="login-form__link">
                Criar conta
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
