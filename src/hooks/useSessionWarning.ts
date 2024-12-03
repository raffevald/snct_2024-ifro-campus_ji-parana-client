import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import AuthService from '../services/AuthService'; // Importe seu serviço de autenticação


const useSessionWarning = (cookieName: string) => {
    const [showWarning, setShowWarning] = useState(false);
    const [isActiveShowWarning, setIsActiveShowWarning] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    useEffect(() => {
        if ( !isActiveShowWarning) {
            const checkCookieExpiration = () => {
                const cookieValue = Cookies.get(cookieName);
                if (!cookieValue) return; // Se o cookie não existir, não faz nada

                // Decodifica o token para obter o tempo de expiração
                const decoded: any = jwtDecode(cookieValue);
                const tokenExpires = decoded.exp * 1000; // Expiração em milissegundos

                const currentTime = Date.now();
                const timeRemaining = tokenExpires - currentTime;

                // Verifica se restam 3 minutos (3 * 60 * 1000 milissegundos)
                if (timeRemaining <= 3 * 60 * 1000 && timeRemaining > 0 && !isActive) {
                    setShowWarning(true);
                    setIsActiveShowWarning(true);
                } else {
                    setShowWarning(false);
                }
            };

            const resetTimer = () => {
                if (timeoutId) clearTimeout(timeoutId); // Limpa o temporizador anterior

                // Reinicia a contagem do temporizador para 5 minutos (5 * 60 * 1000 ms)
                const id = window.setTimeout(() => {
                    setIsActive(false); // Define como inativo após 5 minutos
                }, 5 * 60 * 1000);

                setTimeoutId(id); // Armazena o ID do temporizador
                setIsActive(true); // Define como ativo
            };

            // Detecta a atividade do usuário
            const events = ['mousemove', 'keydown', 'click', 'scroll'];
            events.forEach(event => {
                window.addEventListener(event, resetTimer);
            });

            // Executa a verificação inicialmente e a cada 30 segundos
            checkCookieExpiration();
            // const interval = setInterval(checkCookieExpiration, 30000);
            const interval = setInterval(checkCookieExpiration, 30000);

            return () => {
                // Limpa o intervalo e os event listeners ao desmontar o componente
                clearInterval(interval);
                events.forEach(event => {
                    window.removeEventListener(event, resetTimer);
                });
                if (timeoutId) clearTimeout(timeoutId);
            };
        }
        
    }, [cookieName, isActive, timeoutId]);

    // Função para renovar o cookie
    const renewSession = async () => {
        try {
            // Chama um método de renovação do seu serviço de autenticação
            await AuthService.refreshToken();
            // Cookies.set(cookieName, newToken); // Atualiza o cookie com o novo token
            setShowWarning(false); // Esconde o aviso
            // resetTimer(); // Reseta o temporizador
        } catch (error) {
            console.error('Erro ao renovar o token:', error);
        }
    };

    return { showWarning, renewSession };
};

export default useSessionWarning;
