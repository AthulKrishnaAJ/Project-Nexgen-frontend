
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
    <>
    <Toaster richColors position='top-center'/>
    <Provider store={store}>
        <App/>
    </Provider>
    </>
)
