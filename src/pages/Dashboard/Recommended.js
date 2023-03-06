import { useNavigate } from "react-router-dom"
import { useAppData } from "../../AppContext/AppContext"
import { useState,useEffect } from "react"
import { eventsDatabase } from "../../Firebase/DBtables"
import { getDocs } from "firebase/firestore"
import { event_banner_path } from "../Events/eventDeets"
import '../../Styles_temp/dash.css'

export const Recommended=()=>{
    const navigate=useNavigate()
    const [{user}]=useAppData()
    const Events=["NK007","test"]

    useEffect(()=>{
        if(user.uid==null){
            navigate("/")
        }
    },[])

    return (
        <div className="rec-events">
            <h3>Recommeded Events</h3>
            {Events.map((e)=>(
                <div className="rec-sub">
                    <img src={event_banner_path[e]} alt="" />
                </div>
            ))}
        </div>
    )
}