// import { useEffect, useState } from "react";
import { useParams } from "react-router"
import events from '../../../data/events.json';
import BreadCrumb from "../component/detail/BreadCrumb";
import DetailContent from "../component/DetailContent";

function DetailEvent() {
    const {id} = useParams();

    const foundEvent = events.find(
        (event) => event.id === id
    );

    if(!foundEvent){
        return <div className="text-center mt-10">Event not found</div>
    }

  return (
    <>
        <BreadCrumb/>
        <DetailContent data={foundEvent}/>
    </>
  )
}

export default DetailEvent