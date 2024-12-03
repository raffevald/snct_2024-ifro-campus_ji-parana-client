import { SessionProvider } from './presentation/contexts/SessionContext';
import AppRoutes from './presentation/routes/AppRoutes';

import './styles/Global.css';

function App() {
    return (
        <div className="App">
            <SessionProvider>
                <AppRoutes />
            </SessionProvider>
        </div>
    );
}

export default App;
