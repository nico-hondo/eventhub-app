import { useParams } from "react-router";
import BreadCrumb from "../../../components/common/BreadCrumb";
import DetailContent from "../component/DetailContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchEventById } from "../../../redux/slices/eventSlice";

function DetailEvent() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id){
            dispatch(fetchEventById(id))
        }
    }, [dispatch, id]);

    // Ambil eventDetail dan status loading dari Redux
    const { eventDetail, isLoading, error } = useSelector((state) => state.events);

    console.log(eventDetail);
    if (isLoading) {
        return <div className="text-center mt-10">Loading detail event...</div>;
    }

    if (error || !eventDetail) {
        return <div className="text-center mt-10">Event not found</div>;
    }

    return (
        <>
            <BreadCrumb isString={"events"} />
            <DetailContent data={eventDetail} />
        </>
    );
}

export default DetailEvent;