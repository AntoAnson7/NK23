import { useState } from 'react'
import {RenderEvents} from './RenderEvents'
import {event_banner_path} from '../pages/Events/eventDeets'
import './Subpage.css'

export function RenderSubPage({subEvent}) {
  
    const [code,setCode]=useState("")
  const list = subEvent.map((event, index) => (
      <div className="image-text-wrap">
        <img className='sub-page-event-banner' src={event_banner_path["test"]} key={index} onClick={()=>{
          setCode(event)
          }}/>
        <p>View Details...</p>
      </div>
  ))

  return (
      <div className='render-sub-main'>
        {code?(<div className="render-true">
          <RenderEvents name={code}/>
          <button className='close' onClick={()=>setCode("")}
          style={
            {position:"absolute",
            right:"20px",
            top:"100px",
            width:"70px",
            height:"70px",
            borderRadius: "50%"}
            }>
              X</button>
        </div>):console.log("none")}
        <div className="sub-page-events">
          {list}
          </div>
      </div>
  )
}
