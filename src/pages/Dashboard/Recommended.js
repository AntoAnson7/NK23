import { useNavigate } from "react-router-dom"
import { useAppData } from "../../AppContext/AppContext"
import { useState,useEffect } from "react"
import { eventsDatabase } from "../../Firebase/DBtables"
import { getDocs } from "firebase/firestore"
import { event_banner_path } from "../Events/event_banner_path"
import '../../Styles_temp/reco.css'

export const Recommended=()=>{
    const navigate=useNavigate()
    const [{user}]=useAppData()

    const [Events,setEvents]=useState([])
    
    const getEvents=async()=>{
        const res= await getDocs(eventsDatabase)
        setEvents(res.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }

    useEffect(()=>{
        if(user.uid==null){
            navigate("/")
        }
        getEvents()
    },[])

    return (
        <div>
            <div className="rec-events">
                <img className="ban" src={event_banner_path["CS069"]} alt="" />
                <img className="ban" src={event_banner_path["DC021"]} alt="" />
                <img className="ban" src={event_banner_path["MC076"]} alt="" />
                <img className="ban" src={event_banner_path["PC034"]} alt="" />
            </div>
        </div>
    )
}