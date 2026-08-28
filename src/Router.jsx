import { Routes, Route, Link } from "react-router";
import HomePage from "./features/home/pages/HomePage.jsx";
import EventPage from "./features/event/pages/EventPage.jsx";
import CommunityPage from "./features/community/pages/CommunityPage.jsx";
import SignIn from './features/auth/pages/SignIn.jsx';
import SignUp from './features/auth/pages/SignUp.jsx';
import ForgotPass from './features/auth/pages/ForgotPass.jsx';
import MainLayout from "./components/layout/MainLayout.jsx";
import MyEvents from "./features/saved/pages/MyEvents.jsx";
import UpcomingEvent from "./features/saved/component/UpcomingEvent.jsx";
import SavedEvent from "./features/saved/component/SavedEvent.jsx";
import PastEvent from "./features/saved/component/PastEvent.jsx";

//Detail - pages
import DetailEvent from "./features/event/pages/DetailEvent.jsx";
import DetailCommunity from "./features/community/pages/DetailCommunity.jsx";

//community - pages
import CommunityDetailDiscuss from "./features/community/pages/CommunityDetailDiscuss.jsx";
import CommunityDetailMembers from "./features/community/pages/CommunityDetailMembers.jsx";
import CommunityDetailUpcomingEv from "./features/community/pages/CommunityDetailUpcomingEv.jsx";

//notification - pages
import NotifLayout from "./features/notification/component/NotifLayout.jsx";
import AllNotif from "./features/notification/page/AllNotif.jsx";
import UnReadNotif from "./features/notification/page/UnReadNotif.jsx";
import { IoIosArrowRoundForward } from "react-icons/io";

//profile - pages
import ProfileLayout from "./features/profile/components/ProfileLayout.jsx";
import ProfileEvents from "./features/profile/pages/ProfileEvents.jsx";
import ProfileCommunity from "./features/profile/pages/ProfileCommunity.jsx";
import ProfileSaved from "./features/profile/pages/ProfileSaved.jsx";

//dashboard - organizer
import DashboardOrganizer from "./features/organizer/pages/Dashboard.jsx";
import CreateEvent from "./features/organizer/pages/CreateEvent.jsx";
import BasicInformationCreate from "./features/organizer/components/BasicInformationCreate.jsx";
import DetailCreate from "./features/organizer/components/DetailCreate.jsx";
import SpeakerAndReview from "./features/organizer/components/SpeakerAndReview.jsx";
import FinishCreated from "./features/organizer/components/FinishCreated.jsx";

//dashboard - admin
import AdminDashboard from "./features/admin/components/AdminLayout.jsx";
import Users from "./features/admin/pages/Users.jsx";
import Overview from "./features/admin/pages/Overview.jsx";
import Events from "./features/admin/pages/Events.jsx";
import Communities from "./features/admin/pages/Communities.jsx";

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
        <Route path="my-events" element={<MyEvents/>}>
          <Route index element={< UpcomingEvent/>}/>
          <Route path="past-event" element={<PastEvent/>}/>
          <Route path="saved-event" element={<SavedEvent/>}/>
        </Route>
        <Route path="notification" element={<NotifLayout/>}>
          <Route index element={<AllNotif/>}/>
          <Route path="unread" element={<UnReadNotif/>}/>
        </Route>
        <Route path="profile" element={<ProfileLayout/>}>
          <Route index element={<ProfileEvents/>}/>
          <Route path="community" element={<ProfileCommunity/>}/>
          <Route path="saved" element={<ProfileSaved/>}/>
        </Route>
        <Route path="organizer">
          <Route index element={<DashboardOrganizer/>}/>
          <Route path="create-event" element={<CreateEvent/>}> 
            <Route index element={<BasicInformationCreate/>}/>
            <Route path="detail" element={<DetailCreate/>}/>
            <Route path="review" element={<SpeakerAndReview/>}/>
            <Route path="success" element={<FinishCreated/>} />
          </Route>
        </Route>
        <Route path="admin" element={<AdminDashboard/>}>
          <Route index element={<Overview/>}/>
          <Route path="users" element={<Users/>} />
          <Route path="events" element={<Events/>} />
          <Route path="communities" element={<Communities/>} />
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
      </Route>
      <Route path="auth">
          <Route index element={<SignIn/>}/>
          <Route path="/auth/register" element={<SignUp role="attendee" />} />
          <Route path="/auth/register-organizer" element={<SignUp role="organizer" />} />
          <Route path="forgot-pass" element={<ForgotPass/>} />
      </Route>
    </Routes>
  );
}

function NotFoundPage(){
  return(
    <>
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <p className="text-orange-600 font-bold">404</p>
        <p className="text-xl text-gray-900 font-bold">Page not found</p>
        <p className="text-sm text-gray-700">Sorry, we couldn’t find the page you’re looking for</p>
        <Link to="/">
          <button className="flex items-center gap-2 text-xs text-orange-600 cursor-pointer"><IoIosArrowRoundForward className="text-lg rotate-180"/> Back to home</button>
        </Link>
      </div>
    </>
  )
}

export default Router;