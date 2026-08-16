import { IoClose } from "react-icons/io5";
import { IoWarning } from "react-icons/io5";

function Alert({errors, close}) {
    const objError = Object.entries(errors);

    if(objError.length === 0){
        return null;
    }
    return (
        <div className="w-60 flex justify-center items-center border border-gray-300 rounded-xl p-3 absolute top-10 right-5 z-20 bg-white shadow-md">
            <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                        <IoWarning className="text-yellow-500 text-sm"/>
                        <h5 className="text-red-700 text-xs font-medium">Perbaiki Error Berikut: </h5>
                    </div>
                    <button type="button" className="text-gray-400 hover:text-gray-700 cursor-pointer"
                        onClick={close}
                    >
                        <IoClose/>
                    </button>
                </div>
                <div className="grid gap-2">
                    {objError.map(([field, message], idx) => {
                        return(
                            <div
                                key={field}
                                className="grid grid-cols-6 text-[12px] text-red-500"
                            >
                                <div className="w-6 h-6 flex justify-center items-center rounded-full bg-red-600 text-gray-200">
                                    <span>{idx + 1}</span>
                                </div>
                                <span className="col-span-5 leading-4 font-medium">{message}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Alert