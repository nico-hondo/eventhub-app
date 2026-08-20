import { IoSend } from "react-icons/io5";
import { useParams } from "react-router";
/**
 * 
 * @param {Dispatch<Set>} props 
 * @returns 
 */

function Discuss({getReview}){
    const getUser = localStorage.getItem('session');

    const dataUser = JSON.parse(getUser);
    // console.log(dataUser.nama);

    const firstLetter = dataUser.nama.split(' ').map(val => val[0]).join("");

    const {id, slug} = useParams();

    // console.log(id, slug);
    return(
        <section className="w-full flex-1 flex justify-start items-center">
            <div className="w-full flex-1 flex justify-center items-center gap-10 text-center">
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        const message = e.target.discuss.value;
                        const user = dataUser.nama;
                        const email = dataUser.email;
                        const objUlasan = {id, slug, message, user, email}; //simpan kedalam object, sehingga nantinya object didalam array datanya

                        const localUlasan = JSON.parse(localStorage.getItem("discuss"));

                        if(!localUlasan){
                            localStorage.setItem("discuss", JSON.stringify([objUlasan]));
                            getReview([objUlasan]); //using props
                        }else{
                            const addUlasan = [...localUlasan, objUlasan];
                            getReview(addUlasan)

                            localStorage.setItem("discuss", JSON.stringify(addUlasan));
                            // console.log(getReview)
                        }

                        e.target.nama.value = "";
                        e.target.ulasan.value = "";
                    }}
                
                className="w-full flex gap-3 items-center">
                    <span className="text-xs p-3 rounded-full bg-orange-600 text-gray-100 font-medium">{firstLetter}</span>
                    <div className="relative flex-1 ">
                        <textarea name="discuss" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs" placeholder="Start a discussion..."></textarea>
                        <button type="submit" className="absolute top-5 right-5 cursor-pointer w-fit"><IoSend className="text-orange-600"/></button>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default Discuss;