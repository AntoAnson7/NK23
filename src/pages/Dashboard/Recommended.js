import { useNavigate } from "react-router-dom"
import { useAppData } from "../../AppContext/AppContext"
import { useEffect } from "react"
import { event_banner_path } from "../Events/eventDeets"
import './styles/Reccomended.css'

export const Recommended=()=>{
    const navigate=useNavigate()
    const [{user}]=useAppData()
    const Events=["NK007","test","NK066","NK038","NK065","NK067"]

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