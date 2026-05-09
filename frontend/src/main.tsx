import './index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './Routes/routes.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import Header from './Templates/Header/Header.tsx';
import Footer from './Templates/Footer/Footer.tsx';
import PopupRenderer from './Components/MspPopup/PopupRenderer.tsx';

function AppRoutes()
{
	return useRoutes(routes);
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<div className="msp">
					<Header />
					<main className="msp-content">
					<AppRoutes />
					</main>
					<Footer />
					<PopupRenderer />
				</div>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
)
