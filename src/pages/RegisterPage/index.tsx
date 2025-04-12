import './index.scss';
import Image from '../../assets/images/illustration-register.png';

export default function LoginPage() {
  return (
    <div className="register">
      <div className="register-content">
        <div className="register-form">
          <h1 className="register-form__title">Criar conta</h1>
          <p className="register-form__text">
            Preencha todos os campos para criar sua conta
          </p>
        </div>

        <img className="register-image" src={Image} />
      </div>
    </div>
  );
}
