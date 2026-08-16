import { IoPause } from "react-icons/io5";

function TestiComponent({name, role, company, conf}) {

    const firstLetter = name.split(' ').map(val => val[0]).join("");
  return (
    <>
        <article className="w-full grid grid-rows-5 border border-gray-100 shadow-xl rounded-xl p-5 gap-4">
            <IoPause className="text-orange-600 text-xs"/>
            <div className="row-span-4 grid grid-rows-2 gap-4">
                <p className="row-span-2 text-xs text-gray-600 tracking-wide leading-4.5">{conf}</p>
                <div className="flex gap-2">
                    <div className="flex justify-center items-center text-xs text-gray-100 w-10 rounded-full bg-blue-600 font-medium"><span>{firstLetter}</span></div>
                    <div>
                        <span className="text-sm text-gray-900 font-medium">{name}</span>
                        <p className="text-xs text-gray-400">{role} <span>●</span> {company}</p>
                    </div>
                </div>
            </div>
        </article>
    </>
  )
}

export default TestiComponent