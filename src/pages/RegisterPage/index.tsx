import './index.scss';
import Image from '../../assets/images/illustration-register.png';
import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';  // Importando o adaptador para o DateFns
import { ptBR } from 'date-fns/locale';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const validationSchemaPersonalData = Yup.object({
  nome: Yup.string().required('Nome é obrigatório'),
  sobrenome: Yup.string().required('Sobrenome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string().required('Senha é obrigatória'),
  sexo: Yup.string().required('Sexo é obrigatório'),
  dt_nascimento: Yup.date().required('Data de nascimento é obrigatória'),
});

const validationSchemaAddressData = Yup.object({
  cep: Yup.string().required('CEP é obrigatório'),
  cidade: Yup.string().required('Cidade é obrigatória'),
  estado: Yup.string().required('Estado é obrigatório'),
  logradouro: Yup.string().required('Logradouro é obrigatório'),
  bairro: Yup.string().required('Bairro é obrigatório'),
  complemento: Yup.string(),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const steps = ['Dados Pessoais', 'Endereço'];
  const [activeStep, setActiveStep] = useState(0);
  const [addressData, setAddressData] = useState({
    cep: '',
    cidade: '',
    estado: '',
    logradouro: '',
    bairro: '',
    complemento: '',
    disabledFields: false,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if(activeStep === 0) {
      navigate('/')
    }
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    setAddressData((prev) => ({ ...prev, cep }));

    if (cep.length === 8) {
      try {
        const res = await api.get(`https://viacep.com.br/ws/${cep}/json`);
        setAddressData({
          ...addressData,
          cidade: res.data.localidade,
          estado: res.data.uf,
          logradouro: res.data.logradouro,
          bairro: res.data.bairro,
          complemento: res.data.complemento,
          disabledFields: true,
        });
      } catch (err) {
        console.error('Erro ao buscar o endereço:', err);
      }
    }
  };

  return (
    <div className="register">
      <div className="register-content">
        <div className="register-create">
          <h1 className="register-create__title">Criar conta</h1>
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
              //validationSchema={activeStep === 0 ? validationSchemaPersonalData : validationSchemaAddressData}
              onSubmit={(values) => {
                if (activeStep === 0) {
                  handleNext();
                } else {
                  console.log('Cadastro finalizado:', values);
                }
              }}
            >
              {({ values, handleChange, setFieldValue, errors, touched }) => (
                <Form className="register-form">
                    {activeStep === 0 && (
                      <>
                        <Field
                          name="nome"
                          label="Nome"
                          fullWidth
                          component={TextField}
                          margin="normal"
                        />
                        <Field
                          name="sobrenome"
                          label="Sobrenome"
                          fullWidth
                          component={TextField}
                          margin="normal"
                        />
                        <Field
                          name="cpf"
                          label="CPF"
                          fullWidth
                          component={TextField}
                          margin="normal"
                        />
                        <Field
                          name="email"
                          label="Email"
                          fullWidth
                          component={TextField}
                          margin="normal"
                        />
                        <Field
                          name="senha"
                          label="Senha"
                          type="password"
                          fullWidth
                          component={TextField}
                          margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Sexo</InputLabel>
                          <Field
                            name="sexo"
                            as={Select}
                            value={values.sexo}
                            onChange={handleChange}
                          >
                            <MenuItem value="Masculino">Masculino</MenuItem>
                            <MenuItem value="Feminino">Feminino</MenuItem>
                            <MenuItem value="Outro">Outro</MenuItem>
                          </Field>
                        </FormControl>
                        { /* 
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                          <Field
                            name="dt_nascimento"
                            label="Data de Nascimento"
                            component={DatePicker}
                            value={values.dt_nascimento}
                            onChange={(date: any) => setFieldValue('dt_nascimento', date)}
                            renderInput={(params: any) => <TextField {...params} fullWidth />}
                          />
                        </LocalizationProvider>*/
                        }
                      </>
                    )}

                    {activeStep === 1 && (
                      <>
                        <Field
                          name="cep"
                          label="CEP"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.cep}
                          onChange={handleCepChange}
                          disabled={addressData.disabledFields}
                        />
                        <Field
                          name="cidade"
                          label="Cidade"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.cidade}
                          onChange={handleChange}
                          disabled={addressData.disabledFields}
                        />
                        <Field
                          name="estado"
                          label="Estado"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.estado}
                          onChange={handleChange}
                          disabled={addressData.disabledFields}
                        />
                        <Field
                          name="logradouro"
                          label="Logradouro"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.logradouro}
                          onChange={handleChange}
                          disabled={addressData.disabledFields}
                        />
                        <Field
                          name="bairro"
                          label="Bairro"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.bairro}
                          onChange={handleChange}
                          disabled={addressData.disabledFields}
                        />
                        <Field
                          name="complemento"
                          label="Complemento"
                          fullWidth
                          component={TextField}
                          margin="normal"
                          value={values.complemento}
                          onChange={handleChange}
                          disabled={addressData.disabledFields}
                        />
                      </>
                    )}

                  <div className="register-form__buttons">
                    <Button
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
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <img className="register-image" src={Image} />
      </div>
    </div>
  );
}
