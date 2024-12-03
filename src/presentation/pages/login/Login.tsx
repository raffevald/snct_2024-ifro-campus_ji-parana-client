import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/AuthService';

import Spinner from '../../components/loadings/Spinner';

import { staticOptions } from '../../../helpers/constants/staticOptions';

import '../../../styles/pages/Login.css';

const Login: React.FC = () => {
    document.title = staticOptions.pages.login.title;
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);
            await AuthService.login(username, password);
            setLoading(false);
            navigate(staticOptions.pages.home.home.route);
        } catch (error) {
            setLoading(false);
            setError('Login falhou. Verifique suas credenciais.');
        }
    };

    const goToForgotPassword = () => {

    };

    return (
        <div className="loginPage_container">
            <div className="loginPage_form">
                <h2 className="loginPage_form-h2">Login - JWT e .NET - (SNCT 2024) - IFRO/Campus Ji-Paraná</h2>
                {error && <p className="loginPage_form-p color-red" >{ error }</p>}
            <input 
                className="loginPage_form-input"
                type="email" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Email" 
                required 
            />
            <input 
                className="loginPage_form-input"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Senha" 
                required 
            />
            
            <button className="loginPage_form-button" onClick={handleLogin}> Entrar </button>
            <div className='margin-top-10-px display-flex justify-content-center' >
                { loading && <Spinner/> }
            </div>
            <p className="loginPage_form-p" onClick={goToForgotPassword} style={{ cursor: 'pointer', color: '#8b4513', textAlign: 'center' }}>
                Esqueceu a senha?
            </p>
            </div>
        </div>
    );
};

export default Login;
