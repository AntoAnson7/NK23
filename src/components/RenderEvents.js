import React, { useEffect, useState } from 'react'
import './RenderEvents.css'
import { event_banner_path } from '../pages/Events/eventDeets'
import {getDoc,doc, updateDoc, arrayUnion} from 'firebase/firestore'
import {db} from '../Firebase/config'
import { useNavigate } from 'react-router-dom'
import { useAppData } from '../AppContext/AppContext' 
import {motion} from 'framer-motion'

export function RenderEvents({name}) {

  const [{user},dispatch]=useAppData()

  const navigate=useNavigate()
  const [Event,setEvent]=useState([])


  const getEvent=async()=>{
    const res= await getDoc(doc(db,"Events","NK007"))//Add {name} as ID here 
    setEvent(res.data())
  }

  useEffect(()=>{
    getEvent()
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

  
  return (
    <motion.div className='render-main'
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{x:0,transition:{duration:1}}}
    
    >
        <div className="left">
          <img className='banner-img' src={event_banner_path["test"]} alt="" style={{width:"600px"}}/>
          {/* {user.uid?<button className='reg-button' onClick={{initiateRegistration}}>Register Now</button>:<button className='reg-button'>Sign in to Register</button>} */}
          <button className='reg-button' onClick={initiateRegistration}>Register Now</button>
        </div>

        <div className="right">

          <div className="title-bar">
            <h1>{Event.name}</h1>
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

        </div>  
        
    </motion.div>
  )
}
