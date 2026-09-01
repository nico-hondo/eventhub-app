import { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";

function Users() {
    const users = useMemo(() => [ 
        {name: 'alex kim', email: 'alex.kim@example.com', role: 'attendee', status: 'active', joined: 'Mar 2025'},
        {name: 'rizky pratama', email: 'rizky@example.com', role: 'organizer', status: 'active', joined: 'Jan 2025'},
        {name: 'siti rahayu', email: 'siti@example.com', role: 'attendee', status: 'active', joined: 'Apr 2025'},
        {name: 'hendra wijaya', email: 'hendra@example.com', role: 'organizer', status: 'suspended', joined: 'Feb 2025'},
        {name: 'anisa putri', email: 'anisa@example.com', role: 'attendee', status: 'active', joined: 'May 2025'},
    ], [])

    const [findUsers, setFindUsers] = useState(users); // default: tampilkan semua

    const { register, watch } = useForm();
    const searchValue = watch('search', ''); // default string kosong
    const debounceTimeout = useRef(null);

    const handleSearch = useCallback((value) => {
        if (!value) {
            setFindUsers(users); // kalau kosong, balikin semua
            return;
        }

        const keyword = value.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(keyword)
        );
        setFindUsers(filtered);
        console.log("Hasil search:", filtered.length, "data");
    }, [users]) // dependency cuma users

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            handleSearch(searchValue);
        }, 300); // 300ms udah cukup. 2000ms kelamaan

        return () => {
            clearTimeout(debounceTimeout.current);
        };
    }, [searchValue, handleSearch]);

    return(
        <section className="w-full flex flex-col items-center gap-6">
            <div className="w-full max-w-5xl flex-1 flex flex-col gap-2">
                <form className="w-full h-10 relative flex gap-2">
                    <CiSearch className="absolute top-3 left-3 text-gray-400"/>
                    <input
                    type="search"
                    id="search"
                    {...register("search")}
                    placeholder='Search Users...'
                    className="w-full h-full text-xs px-9 focus:outline-none border-gray-200 bg-white rounded-lg"/>
                </form>
                <div className="w-full bg-white border-gray-200 px-4 rounded-xl">
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
                            {findUsers.length > 0? (
                                findUsers.map((val, index) => (
                                    <tr key={index} className="text-xs h-10 border-b border-gray-100"> 
                                        <td>
                                            <p className="text-gray-900 font-medium capitalize">{val.name}</p>
                                            <p className="text-[11px] text-gray-400">{val.email}</p>
                                        </td>
                                        <td>
                                            <span className={`text-[12px] px-2 rounded-lg ${val.role === 'attendee'? 'bg-gray-200 text-gray-700' : 'bg-orange-200 text-orange-700'}`}>
                                                {val.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`text-[12px] px-2 rounded-lg ${val.status === 'active'? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                                {val.status}
                                            </span>
                                        </td>
                                        <td className="text-gray-400">{val.joined}</td>
                                        <td><SlOptions className="cursor-pointer"/></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-600 text-xs">
                                        User tidak ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Users;