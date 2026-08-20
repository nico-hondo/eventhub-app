import { useParams } from "react-router";
import communities from '../../../data/communities.json';
import BreadCrumb from "../../../components/common/BreadCrumb";
import DetailLayout from '../component/DetailLayout';

function DetailCommunity() {
    const {id} = useParams();

    const foundCommunity = communities.find(
        (communi) => communi.id === id
    )

    if(!foundCommunity){
        return <div className="text-center mt-10">Community not Found</div>
    }

  return (
    <>
        <BreadCrumb isString={"communities"}/>
        <DetailLayout data={foundCommunity}/>
    </>
  )
}

export default DetailCommunity