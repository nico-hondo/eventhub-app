import {useContext} from 'react';
import { Link } from 'react-router';

//getData from store
import communities from '../../../data/communities.json';

//kita butuh component reusabel from eventCommunities
import EventCommunities from '../../../components/communities/EventCommunities';

import themeContext from '../../../context/theme/themeContext';
import { useSelector } from "react-redux";
import { selectSession, selectUser } from "../../auth/store/authSelectors";

function ProfileCommunity() {
    const {theme} = useContext(themeContext);
    const session = useSelector(selectSession);
    const users = useSelector(selectUser);
  
    const user = users.filter((val) => val.email === session?.email);
  
    // guard: session/user belum siap (misal persist belum rehydrate) -> jangan lanjut proses
    if (!session?.email || user.length === 0) {
      return null; // atau tampilin loading skeleton
    }
    
    const joinedCommunityIds = user[0]?.community_id ?? [];
    const joinedData = communities.filter((val) => joinedCommunityIds.includes(val.id));
  
  return (
    <>
      <div className="w-full max-w-5xl min-h-100 flex justify-center items-center">
        {joinedData ? (
            <div className="grid grid-cols-3 gap-5">
                {joinedData.map((val) => (
                    <EventCommunities
                        key={val.id}
                        id={val.id}
                        title={val.name}
                        desc={val.description}
                        type={val.tags}
                        member={val.member_count}
                        agenda={val.upcoming_events_count}
                        pict={val.banner_url}
                    />
                ))}
            </div>
        ) : (
            <div className="text-center py-10">
                <p className={`text-xs ${theme === 'light' ? 'text-gray-800' : 'text-gray-400'} font-medium mb-4`}>No community joining.</p>
                <Link to="/communities">
                    <button className="w-45 h-10 text-xs bg-orange-600 text-white font-bold rounded-lg cursor-pointer">
                        Explore Communities →
                    </button>
                </Link>
            </div>
        )}
      </div>
    </>
  )
}

export default ProfileCommunity