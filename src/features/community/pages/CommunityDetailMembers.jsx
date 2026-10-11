import { useSelector } from 'react-redux';

function CommunityDetailMembers() {

  const {communityDetail} = useSelector((state) => state.community)
  console.log(communityDetail)

  return (
    <>
      {communityDetail !== null ? 

        <div className="max-w-6xl flex-1 grid grid-cols-3 py-4 gap-4 rounded-xl">
          {communityDetail?.members?.map((member) => {
              return(
                  <div className="w-full flex flex-col border border-gray-300 rounded-lg text-xs p-3">
                      <span className="font-medium text-gray-800">{member.name}</span> 
                      <span>{member.job}</span>
                  </div>
              )
          })}
      </div> : <div className="text-center mt-10">Community not Found</div>
      }
      
    </>
  )
}

export default CommunityDetailMembers