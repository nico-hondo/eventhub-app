import { Routes, Route } from "react-router";
import HomePage from "./features/home/pages/HomePage.jsx";
import EventPage from "./features/event/pages/EventPage.jsx";
import CommunityPage from "./features/community/pages/CommunityPage.jsx";
import SignIn from './features/auth/pages/SignIn.jsx';
import SignUp from './features/auth/pages/SignUp.jsx';
import ForgotPass from './features/auth/pages/ForgotPass.jsx';
import MainLayout from "./components/layout/MainLayout.jsx";
import MyEvents from "./features/saved/pages/MyEvents.jsx";

//Detail - pages
import DetailEvent from "./features/event/pages/DetailEvent.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage />}/>
        <Route path="events">
          <Route index element={<EventPage/>} />
          <Route path=":id/:slug" element={<DetailEvent/>}/>
        </Route>
        <Route path="communities" element={<CommunityPage/>} />
        <Route path="my-events" element={<MyEvents/>} />
      </Route>
      <Route path="auth">
          <Route index element={<SignIn/>}/>
          <Route path="sign-up" element={<SignUp/>}/>
          <Route path="forgot-pass" element={<ForgotPass/>} />
      </Route>
    </Routes>
  );
}

export default Router;