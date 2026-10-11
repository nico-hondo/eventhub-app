import { useParams } from "react-router";
import BreadCrumb from "../../../components/common/BreadCrumb";
import DetailLayout from '../component/DetailLayout';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCommunityById } from "../../../redux/slices/communitySlice";

function DetailCommunity() {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if(id){
            dispatch(fetchCommunityById(id));
        }
    }, [dispatch, id])

    const {communityDetail, isLoading, error} = useSelector((state) => state.community);

    console.log(communityDetail)

    if (isLoading) {
        return <div className="text-center mt-10">Loading detail community...</div>;
    }

    if (error || !communityDetail) {
        return <div className="text-center mt-10">Community not found</div>;
    }

  return (
    <>
        <BreadCrumb isString={"communities"}/>
        <DetailLayout data={communityDetail}/>
    </>
  )
}

export default DetailCommunity