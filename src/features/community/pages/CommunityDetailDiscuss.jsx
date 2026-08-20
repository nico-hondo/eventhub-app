import { useState } from "react";
import { useParams } from "react-router";
import Discuss from "../../../components/communities/Discuss";
import community from "../../../data/communities";

function CommunityDetailDiscuss() {
  const [discuss, setDiscuss] = useState(
    JSON.parse(localStorage.getItem("discuss")) || []
  );

  const { id } = useParams();

  const foundCommunity = community.find(
    (val) => String(val.id) === String(id)
  );

  return (
    <div className="max-w-6xl flex-1 flex flex-col py-4 gap-4 rounded-xl">
      <Discuss getReview={setDiscuss} />

      <section className="w-full flex-1 flex flex-col gap-2">
        {foundCommunity?.discussions?.map((res) => (
          <div
            key={res.id}
            className="w-full flex gap-3 items-center"
          >
            <span className="text-xs text-gray-200 font-medium bg-blue-500 border border-amber-200 p-3 rounded-full w-fit">
              {res.user_name
                  .split(' ')
                  .map(val => val[0])
                  .join("")}
            </span>

            <div className="flex-1">
              <textarea
                disabled
                name="discuss"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 shadow-md"
                value={res.message}
                readOnly
              />
            </div>
          </div>
        ))}
        {discuss?.map((val) => {
          return(
          <div
            className="w-full flex gap-3 items-center"
          >
            <span className="text-xs text-gray-200 font-medium bg-blue-500 border border-amber-200 p-3 rounded-full w-fit">
              {val.user
                  .split(' ')
                  .map(val => val[0])
                  .join("")}
            </span>

            <div className="flex-1">
              <textarea
                disabled
                name="discuss"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 shadow-md"
                value={val.message}
                readOnly
              />
            </div>
          </div>
          )
        })}
      </section>
    </div>
  );
}

export default CommunityDetailDiscuss;