import './index.scss';
import Image from '../../assets/images/illustration-register.png';
import SuccessImage from '../../assets/images/illustration-register-success.png';
import { useState } from 'react';
import { Alert, AlertColor, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function RegisterPage() {
  const navigate = useNavigate();
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });

  const steps = ['Dados Pessoais', 'Endereço'];
  const [activeStep, setActiveStep] = useState(0);
  const [imageSrc, setImageSrc] = useState(Image);
  const [disabledFields, setDisabledFields] = useState(true);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const goToLogin = () => {
    navigate('/')
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCepChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const cep = e.target.value;

    setFieldValue('cep', cep);

    if (/^\d{8}$/.test(cep)) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        const data = await res.json();

        setFieldValue('cidade', data.localidade || '');
        setFieldValue('estado', data.uf || '');
        setFieldValue('logradouro', data.logradouro || '');
        setFieldValue('bairro', data.bairro || '');
        setFieldValue('complemento', data.complemento || '');
  
        setDisabledFields(false);

        setSnackbar({
          open: true,
          type: 'success',
          message: 'CEP encontrado',
        });

    
      } catch (err) {
        console.error('Erro ao buscar o endereço:', err);

        setDisabledFields(true);

        setSnackbar({
          open: true,
          type: 'error',
          message: 'Ocorreu um erro ao buscar o endereço',
        });
      }
    } else {  
      setDisabledFields(true);
      setFieldValue('cidade', '');
      setFieldValue('estado', '');
      setFieldValue('logradouro', '');
      setFieldValue('bairro', '');
      setFieldValue('complemento', '');
    }
  };

  const setField = (
    field: string, 
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const value = e.target.value;

    setFieldValue(field, value);
  }

  return (
    <div className="register">
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
      <div className="register-content">
        <div className="register-create">
          <div className="register-create__title">
            <IconButton color='secondary' onClick={() => goToLogin()} >
                <ArrowBackIcon />
              </IconButton>

          <h1 className="register-create__title">Criar conta</h1>
          </div>
          <p className="register-create__text">
            Preencha todos os campos para criar sua conta
          </p>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            <Formik
              initialValues={{
                nome: '',
                sobrenome: '',
                cpf: '',
                email: '',
                senha: '',
                sexo: '',
                dt_nascimento: null,
                cep: '',
                cidade: '',
                estado: '',
                logradouro: '',
                bairro: '',
                complemento: '',
              }}
              onSubmit={(values) => {
                if(activeStep === 1) {      
                  api
                  .post(`/user`, values)
                  .then(() => {
                    handleNext();
                    setImageSrc(SuccessImage)
                  })
                  .catch(() => { 
                    setSnackbar({
                      open: true,
                      type: '',
                      message: 'Ocorreu um erro cadastrar o usuário',
                    })
                  });
                } else {
                  handleNext();
                }
              }}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                    {activeStep === 0 && (
                      <div className="register-form">
                        <Field
                          name="nome"
                          label="Nome"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          required
                        />
                        <Field
                          name="sobrenome"
                          label="Sobrenome"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          required
                        />
                        <Field
                          name="cpf"
                          label="CPF"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          required
                        />
                        <Field
                          name="email"
                          label="Email"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          required
                        />
                        <Field
                          name="senha"
                          label="Senha"
                          type="password"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          required
                        />
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Sexo</InputLabel>
                          <Field
                            name="sexo"
                            as={Select}
                            value={values.sexo}
                            onChange={handleChange}
                            required
                          >
                            <MenuItem value="Masculino">Masculino</MenuItem>
                            <MenuItem value="Feminino">Feminino</MenuItem>
                            <MenuItem value="Outro">Outro</MenuItem>
                          </Field>
                        </FormControl>
                        <Field
                          name="dt_nascimento"
                          label="Data de Nascimento"
                          component={TextField}
                          required
                        />
                        
                      </div>
                    )}

                    {activeStep === 1 && (
                      <div className="register-form">
                        <Field
                          name="cep"
                          label="CEP"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.cep}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCepChange(e, setFieldValue)}
                          required
                        />
                        <Field
                          name="cidade"
                          label="Cidade"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.cidade}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField('cidade', e, setFieldValue)}
                          disabled={disabledFields}
                          required
                        />
                        <Field
                          name="estado"
                          label="Estado"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.estado}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField('estado', e, setFieldValue)}
                          disabled={disabledFields}
                          required
                        />
                        <Field
                          name="logradouro"
                          label="Logradouro"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.logradouro}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField('logradouro', e, setFieldValue)}
                          disabled={disabledFields}
                          required
                        />
                        <Field
                          name="bairro"
                          label="Bairro"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.bairro}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField('bairro', e, setFieldValue)}
                          disabled={disabledFields}
                          required
                        />
                        <Field
                          name="complemento"
                          label="Complemento"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.complemento}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField('complemento', e, setFieldValue)}
                          disabled={disabledFields}
                          required
                        />
                      </div>
                    )}
                  { activeStep < 2 && 
                    <div className="register-form__buttons">
                      <Button
                        disabled={activeStep === 0}
                        variant="contained"
                        onClick={handleBack}
                      >
                        Voltar
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                      >
                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                      </Button>
                    </div>
                  }
                  
                  { activeStep === 2 &&
                      <div className='register-success'>
                      <h1 className='register-success__title'>
                        Cadastro realizado com sucesso
                      </h1>
                      <p className='register-success__text'>Faça login com seu e-mail e senha para entrar na plataforma</p>
                      <div>
                        <Button
                          color='secondary'
                          variant="contained"
                          onClick={goToLogin}
                        >
                          Ir para login 
                        </Button>
                      </div>
                    </div>
                  }
                  
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="register-image">
          <img src={imageSrc} />
        </div>
      </div>
    </div>
  );
}
