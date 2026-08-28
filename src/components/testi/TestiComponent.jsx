import { IoPause } from "react-icons/io5";

function TestiComponent({name, role, company, conf, theme}) {

    const firstLetter = name.split(' ').map(val => val[0]).join("");
  return (
    <>
        <article className={`w-full grid grid-rows-5 border ${theme === 'light' ? 'border-gray-100' : 'border-gray-800 shadow-sm shadow-gray-900'} shadow-xl rounded-xl p-5 gap-4`}>
            <IoPause className="text-orange-600 text-xs"/>
            <div className="row-span-4 grid grid-rows-2 gap-4">
                <p className={`row-span-2 text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} tracking-wide leading-4.5`}>{conf}</p>
                <div className="flex gap-2">
                    <div className="flex justify-center items-center text-xs text-gray-100 w-10 rounded-full bg-blue-600 font-medium"><span>{firstLetter}</span></div>
                    <div>
                        <span className={`text-sm ${theme === 'light' ? 'text-gray-900' : 'text-gray-400'} font-medium`}>{name}</span>
                        <p className={`text-xs ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>{role} <span>●</span> {company}</p>
                    </div>
                </div>
            </div>
        </article>
    </>
  )
}

export default TestiComponent