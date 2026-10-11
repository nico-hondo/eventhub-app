import { useEffect} from "react";
import TestiComponent from "../../../components/testi/TestiComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimony } from "../../../redux/slices/testiSlice";

function Testi({theme}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTestimony())
    }, [dispatch])

    const {testimony, error} = useSelector((state) => state.testimony)

    console.log(testimony)
    if (error){
        console.log(error);
    }
  return (
    <section className="w-full flex justify-center items-center py-4">
        <div className="max-w-6xl flex-1 flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h3 className={`text-lg ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'} font-medium`}>What the community says</h3>
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
                {testimony.map((val) => {
                    return(
                        <TestiComponent
                            key={val.id}
                            name={val.name}
                            role={val.job}
                            company={val.workplace}
                            conf={val.comment}
                            theme={theme}
                        />
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Testi