import { Routes, Route } from "react-router";
import HomePage from "./features/home/pages/HomePage.jsx";
import SignIn from './features/auth/pages/SignIn.jsx';
import SignUp from './features/auth/pages/SignUp.jsx';
import ForgotPass from './features/auth/pages/ForgotPass.jsx';

function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />}/>
        <Route path="auth">
            <Route index element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
            <Route path="forgot-pass" element={<ForgotPass/>} />
        </Route>
      </Route>
      
    </Routes>
  );
}

export default Router;