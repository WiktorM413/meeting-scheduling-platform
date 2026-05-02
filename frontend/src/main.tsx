import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from './Routes/routes.tsx'
import './index.scss'
import { AuthProvider } from './context/AuthContext.tsx'

function AppRoutes()
{
	return useRoutes(routes);
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
)
