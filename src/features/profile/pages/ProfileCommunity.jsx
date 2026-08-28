import {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router';

//getData from store
import communities from '../../../data/communities.json';

//kita butuh component reusabel from eventCommunities
import EventCommunities from '../../../components/communities/EventCommunities';

import themeContext from '../../../context/theme/themeContext';

function ProfileCommunity() {
    const {theme} = useContext(themeContext);
  const navigate = useNavigate();

  const [joinCommunity] = useState(() => {
    const joinCommunity = localStorage.getItem('joinCommunity');

    return joinCommunity ? JSON.parse(joinCommunity) : [];
  });

  const [dataCommunity, setDataCommunity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const session = localStorage.getItem('session');
  const dataSesi = JSON.parse(session);

  console.log(dataSesi['email']);
  //cek apakah user yang sedang login, ada atau tidak data communitynya di localstorage, jikalau ada, maka berikan list community apa saja yang dia joined, jika tidak, maka berikan sebuah halaman yang mengarahkan ke community page

  const isJoined = joinCommunity.some(val => {
    return String(val.email) === String(dataSesi['email'])
  })
  // console.log(isJoined);
  //misal user yang sekarang sudah joined ke beberapa community, maka kita sesuaikan data dari localStorage(community) dengan data store kita di community.json, lalu filter yang dimana kita buat ke dalam sebuah array baru. Lalu set ke state dataCommunity, dan di map.
  useEffect(() => {
    if (!session) {
        return navigate('auth');
    }

    try {
        setIsLoading(true);

        // ambil semua community yang di-join OLEH USER YANG LAGI LOGIN aja
        const myJoinedCommunities = joinCommunity.filter(
            val => String(val.email) === String(dataSesi['email'])
        );

        // ambil id community dari data join tsb
        const myJoinedIds = myJoinedCommunities.map(val => val.id);

        // filter communities.json biar cuma ambil yang id-nya match
        const joined = communities.filter(val => myJoinedIds.includes(val.id));

        setDataCommunity(joined);
    } catch (err) {
        console.log(err.message);
    } finally {
        setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div className="w-full max-w-5xl min-h-100 flex justify-center items-center">
        {isLoading ? (
            <p>Loading...</p>
        ) : isJoined ? (
            <div className="grid grid-rows-2 grid-cols-3 gap-5">
                {dataCommunity.map((val) => (
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