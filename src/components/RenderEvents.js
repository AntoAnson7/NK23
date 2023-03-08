import React, { useEffect, useState } from 'react'
import './RenderEvents.css'
import { event_banner_path } from '../pages/Events/eventDeets'
import {getDoc,doc, updateDoc, collection, arrayUnion} from 'firebase/firestore'
import {db} from '../Firebase/config'
import { useNavigate } from 'react-router-dom'
import { useAppData } from '../AppContext/AppContext' 
import {motion} from 'framer-motion'

export function RenderEvents({name}) {

  const [{user},dispatch]=useAppData()
  const [loginStat,setloginStat]=useState(false)
  const navigate=useNavigate()
  const [Event,setEvent]=useState([])

  
  const getEvent=async()=>{
    const res= await getDoc(doc(db,"Events",name))//Add {name} as ID here 
    setEvent(res.data().category==undefined?"NK007":res.data())
  }


  useEffect(()=>{
    getEvent()
    if(user.uid!=null){
      setloginStat(true)
    }
  },[])

  const initiateRegistration=()=>{

    dispatch({
      type:'SET_EVENT_TEMP',
      eventTemp:Event.eventid
    })
    dispatch({
      type:'SET_EVENT',
      RegEvent:Event
    })

    navigate("/events/registration")
  }

  const regFree=async()=>{
    await updateDoc(doc(db,"EventRegs",Event.eventid),{
      registrations:arrayUnion(user.uid)
    })
  }

  console.log(Event.eventid)
  return (
    <motion.div className='render-main'
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{x:0,transition:{duration:1}}}
    
    >
        <div className="left">
          
          <img className='banner-img' src={event_banner_path[Event.eventid?Event.eventid:"test"]} alt="" style={{width:"600px"}}/>
          
          {loginStat?
          (Event.eventid=="NK066"?<button className='reg-button' onClick={regFree}>Register Free</button>:(
            Event.isActive?
            <button className='reg-button' onClick={initiateRegistration}>Register Now</button>:
            <button className='reg-button'>Registration closed</button>
          )):<button className='reg-button'>Sign in to Register</button>}
          
        </div>

        <div className="right">

          <div className="title-bar">
            <h1>{`${Event.name} (${name})`}</h1>
            <div className='deet'>
              <p>{Event.isTeam?"Team":"Individual"}</p>
              <p>{`Fee : ${Event.regfee}`}</p>
              <p>{`Seats left: ${Event.spots}`}</p>
            </div>
          </div>
          
          <p className='cat-tags'>{`${Event.category} | ${Event.subcategory}`}</p>
          <p className='descr-tag' dangerouslySetInnerHTML={{__html:Event.description}}></p>

          <div className='coord-deets'>
            <p>{`Head : ${Event.headName} | ${Event.headPhno}`}</p>
            <p>{`Subhead : ${Event.sub1Name} | ${Event.sub1Phno}`}</p>
            <p>{`Subhead : ${Event.sub2Name} | ${Event.sub2Phno}`}</p>
          </div>

          {Event.rules?(
              <div className="rules-section">
                <h1 className='rules'>Rules and Regulations</h1>
                <p dangerouslySetInnerHTML={{__html:Event.rules}}></p>
              </div>
          ):<></>}
          <div className="medals-a">
              <div className="first-a">
                  <img src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca1.png?alt=media&token=fa2f32cc-94fc-48d1-a981-10555f1c0a6c" alt="" style={{width:"35px"}}/>
                  <p>{`${Event.first}/-`}</p>
              </div>
              <div className="second-a">
                  <img src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca2.png?alt=media&token=e9764347-f604-47c0-abc2-189fbf62e000" alt="" style={{width:"35px"}}/>
                  <p>{`${Event.second}/-`}</p>
              </div>
          </div>

        </div>  
        
    </motion.div>
  )
}
