import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import SignIn from './pages/auth/SignIn'
// import SignUp from './pages/auth/SignUp'
import ForgotPass from './pages/auth/ForgotPass'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ForgotPass />
  </StrictMode>,
)
