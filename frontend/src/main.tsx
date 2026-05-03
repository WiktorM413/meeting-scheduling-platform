import './index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './Routes/routes.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import Header from './Templates/Header/Header.tsx';
import Footer from './Templates/Footer/Footer.tsx';

function AppRoutes()
{
	return useRoutes(routes);
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Header />
				<AppRoutes />
				<Footer />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
)
