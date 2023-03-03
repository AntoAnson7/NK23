import {regDatabase} from '../../Firebase/DBtables'
import {addDoc} from 'firebase/firestore'
import { useAppData } from '../../AppContext/AppContext'
import { getDownloadURL, listAll,ref } from 'firebase/storage'
import {storage} from '../../Firebase/config'
import { useEffect, useState } from 'react'
import '../../Styles_temp/events.css'
import {event_banner_path} from './eventDeets'

export const EventTemplate=({event})=>{
    const [images,setImages]=useState([])
    const [{user,userLocal}]=useAppData()

    const imgRef=ref(storage,"images/")
    const testRef=ref(storage,"test/")

    const getImages=()=>{
        listAll(imgRef).then((res)=>{
        res.items.forEach((item)=>{
            getDownloadURL(item).then((url)=>{
                setImages((prev)=>[...prev,url])
                })
            })
        })     
    }
    useEffect(()=>{
        // getImages() //!FETCHES IMAGES MULTIPLE TIMES
    },[])  

    // TODO: Resolve a method to map image to coresponding event
    // TODO: Solve image re-fetch issue
    const regUser=async()=>{
        await addDoc(regDatabase,{
            userid:user.uid,
            eventid:event.eventid,
            username:userLocal.name
        })
        console.log("registered")
    }

    return (
        <div className="template">
            <div className="imgs">
                    <div className="template-struct">
                        <img src={event_banner_path[`${event?.eventid}`]} alt="" />
                        <h1>{event?.name}</h1>
                        <button onClick={regUser}>Register</button>
                    </div>
            </div>
        </div>
    )
}

