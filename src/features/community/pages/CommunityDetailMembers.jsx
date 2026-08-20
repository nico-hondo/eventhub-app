import { useParams } from 'react-router';
import communities from '../../../data/communities.json';

function CommunityDetailMembers() {
    const {id} = useParams();

    const foundCommunity = communities.find(
        (communi) => communi.id === id
    )

  return (
    <>
      {foundCommunity !== null ? 

        <div className="max-w-6xl flex-1 grid grid-cols-3 py-4 gap-4 rounded-xl">
          {foundCommunity.members.map((val) => {
              return(
                  <div className="w-full flex flex-col border border-gray-300 rounded-lg text-xs p-3">
                      <span className="font-medium text-gray-800">{val.name}</span> 
                      <span>{val.role}</span>
                  </div>
              )
          })}
      </div> : <div className="text-center mt-10">Community not Found</div>
      }
      
    </>
  )
}

export default CommunityDetailMembers