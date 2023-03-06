import { event_banner_path } from "../Events/eventDeets"
import {eventsDatabase} from '../../Firebase/DBtables'
import {getDocs} from 'firebase/firestore'
import { useState,useEffect } from "react"
import { useAppData } from "../../AppContext/AppContext"
import { useNavigate } from "react-router-dom"
import './styles/userEvents.css'
import QRCode from "react-qr-code"

export const UserEvents=({event})=>{
    const navigate=useNavigate()
    const [flag,setFlag]=useState(false)
    const [{user,userLocal}]=useAppData()

    useEffect(()=>{
        if(user.uid==null){
            navigate("/")
        }
    },[])
    const str=`{
        Name : ${userLocal.name},
        ID : NK-${user.uid.substring(0,4).toUpperCase()},
        Events: NK001 | NK006 |NK063
    }`

    return (
        <div>
            <div className="user-events-temp">
                {event.map((e)=>(
                    <div className="sub">
                        <img src={event_banner_path[e]} alt="" style={{width:"8rem"}}/>
                        <p className="deets">Click to view ticket</p>
                    </div>
                ))}
            </div>

            <button className="vt" onClick={()=>setFlag(!flag)}>View ticket</button>
            
            {flag?<div className="ticket">
                <button onClick={()=>setFlag(!flag)}>X</button>
                <div className="qr-div">
                    <QRCode className="qr" value={str}/>
                </div>
            </div>:<></>}
        </div>
    )
}