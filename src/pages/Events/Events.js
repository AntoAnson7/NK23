import {storage} from '../../Firebase/config'
import { getDownloadURL, listAll,ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useAppData } from '../../AppContext/AppContext'
import { useNavigate } from 'react-router-dom'
import {eventsDatabase} from '../../Firebase/DBtables'
import {getDocs} from 'firebase/firestore'
import { EventTemplate } from './EventTemplate'
import '../../Styles_temp/events.css'


export const Events=()=>{
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
            {/* <div className="disp-events">
                {Events?.map((event)=>(
                    <EventTemplate event={event}/>
                ))}
            </div> */}
        </div>
    )
}