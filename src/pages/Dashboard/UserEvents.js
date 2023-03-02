import { event_banner_path } from "../Events/event_banner_path"
import {eventsDatabase} from '../../Firebase/DBtables'
import {getDocs} from 'firebase/firestore'
import { useState,useEffect } from "react"
import { useAppData } from "../../AppContext/AppContext"
import { useNavigate } from "react-router-dom"

export const UserEvents=({event})=>{
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
            <div className="user-events-temp">
                {Events?.map((_event)=>{
                    if(_event.eventid == event){
                        return (                           
                            <div className="registered-events">
                                <img src={event_banner_path[`${_event.eventid}`]} alt="" style={{width:"110px"}}/>
                                <p>{_event.name}</p>
                            </div>
                        )                                                                     
                    }
                })}

            </div>
        </div>
    )
}