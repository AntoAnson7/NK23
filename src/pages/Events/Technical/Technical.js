import './Technical.css'
import { useNavigate } from 'react-router-dom'

export const Technical=()=>{
    const navigate=useNavigate()
    return (
        <div className="technical-events-main">
            <div className='technical-events-sub'>


                
                <div className="workshops">
                    {/* MAKE THIS BUTTON IMAGE */}
                    <button onClick={()=>navigate("/events/technical/workshops")}>Workshops</button>
                </div>

                <div className="competitions">
                    {/* MAKE THIS BUTTON IMAGE */}
                    <button onClick={()=>navigate("/events/technical/competitions")}>Competitions</button>
                </div>

            </div>
        </div>
    )
}