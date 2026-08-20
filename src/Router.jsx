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
import DetailCommunity from "./features/community/pages/DetailCommunity.jsx";

//community - pages
import CommunityDetailDiscuss from "./features/community/pages/CommunityDetailDiscuss.jsx";
import CommunityDetailMembers from "./features/community/pages/CommunityDetailMembers.jsx";
import CommunityDetailUpcomingEv from "./features/community/pages/CommunityDetailUpcomingEv.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage />}/>
        <Route path="events">
          <Route index element={<EventPage/>} />
          <Route path=":id/:slug" element={<DetailEvent/>}/>
        </Route>
        <Route path="communities">
          <Route index  element={<CommunityPage/>}/>
          <Route path=":id/:slug" element={<DetailCommunity/>}>
            <Route index element={<CommunityDetailUpcomingEv/>}/>
            <Route path="members" element={<CommunityDetailMembers />}/>
            <Route path="discuss" element={<CommunityDetailDiscuss />}/>
          </Route>
          
        </Route>
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