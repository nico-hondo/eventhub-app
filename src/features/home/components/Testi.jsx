import { useState } from "react";
import TestiComponent from "../../../components/testi/TestiComponent";
import { testi } from "../services/data-dummy";

function Testi() {
    const [data] = useState(testi);
  return (
    <section className="w-full flex justify-center items-center py-4">
        <div className="max-w-6xl flex-1 flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-lg text-gray-800 font-medium">What the community says</h3>
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
                {data.map((val) => {
                    return(
                        <TestiComponent
                            key={val.id}
                            name={val.name}
                            role={val.role}
                            company={val.company}
                            conf={val.conf}
                        />
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Testi