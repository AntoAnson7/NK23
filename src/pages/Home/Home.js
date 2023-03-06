import { useAppData } from "../../AppContext/AppContext"
import {event_banner_path} from '../Events/eventDeets'
import {Footer} from '../../components/Footer'
import './Home.css'

export const Home=()=>{
    const [{user,userLocal,isCA}]=useAppData()
    return (
        <div className="home-parent"> 
            <div className="home-main">
                <div className="nk-text">
                    <img src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/nktext.png?alt=media&token=981f2431-cc5a-4920-8f0d-51530394d0f2" alt="" />
                </div>
            </div>

            <div className="home-about-us" id="about">
                s
            </div>

            <div className="home-events">
                
                <div className="flage-top">
                    <img src={event_banner_path["test"]} alt="" />
                    <img src={event_banner_path["test"]} alt="" />
                    <img src={event_banner_path["test"]} alt="" />
                </div>

                <div className="flage-bot">
                    <img src={event_banner_path["test"]} alt="" />
                    <img src={event_banner_path["test"]} alt="" />
                </div>
            </div>
                <Footer/>
        </div>
    )
}