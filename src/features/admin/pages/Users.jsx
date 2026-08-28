import { useRef, useCallback, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";

function Users() {
    const users = [
        {name: 'alex kim', email: 'alex.kim@example.com', role: 'attendee', status: 'active', joined: 'Mar 2025'},
        {name: 'rizky pratama', email: 'rizky@example.com', role: 'organizer', status: 'active', joined: 'Jan 2025'},
        {name: 'siti rahayu', email: 'siti@example.com', role: 'attendee', status: 'active', joined: 'Apr 2025'},
        {name: 'hendra wijaya', email: 'hendra@example.com', role: 'organizer', status: 'suspended', joined: 'Feb 2025'},
        {name: 'anisa putri', email: 'anisa@example.com', role: 'attendee', status: 'active', joined: 'May 2025'},
    ]

    const {register, watch} = useForm();
    const searchValue = watch('search');
    const handleTimeOut = useRef(null);

    const handleSearch = useCallback((value) => {
        console.log("Cek yang disearch: ", value);
        // const filter = users.filter
    }, [])

    useEffect(() => {
        if(handleTimeOut.current){
            clearTimeout(handleTimeOut.current);
        }

        handleTimeOut.current = setTimeout(() => {
            handleSearch(searchValue);
        }, 2000);

        return() => {
            if(handleTimeOut.current){
                clearTimeout(handleTimeOut.current);
            }
        };
    }, [searchValue, handleSearch]);


    return(
        <section className="w-full flex flex-col items-center gap-6">
            <div className="w-full max-w-5xl flex-1 flex flex-col gap-2">
                <form className="w-full h-10 relative flex gap-2">
                    <CiSearch className="absolute top-3 left-3"/>
                    <input
                    type="search"
                    id="search"
                    {...register("search")} placeholder='Search Users' className="w-full h-full text-sm px-9 focus:outline-none border border-gray-200 bg-white rounded-lg"/>
                </form>
                <div className="w-full bg-white border border-gray-200 px-4 rounded-xl">
                    <table className="w-full">
                        <thead>
                            <tr className="uppercase text-xs text-left text-gray-600 h-10 border-b border-gray-100">
                                <th>user</th>
                                <th>role</th>
                                <th>status</th>
                                <th>joined</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((val) => {
                                return(
                                    <tr className="text-xs h-10 border-b border-gray-100">
                                        <td><p className="text-gray-900 font-medium capitalize">{val.name}</p><p className="text-[11px] text-gray-400">{val.email}</p></td>
                                        <td><span className={`text-[12px] px-2 rounded-lg ${val.role === 'attendee' ? 'bg-gray-200 text-gray-700' : 'bg-orange-200 text-orange-700'}`}>{val.role}</span></td>
                                        <td><span className={`text-[12px] px-2 rounded-lg ${val.status === 'active' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>{val.status}</span></td>
                                        <td className="text-gray-400">{val.joined}</td>
                                        <td><SlOptions className="cursor-pointer"/></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Users