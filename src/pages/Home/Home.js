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
                <div className="top">
                    <div className="nk-log">
                        <img src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Untitled-3.png?alt=media&token=45b45e98-7f32-471e-9044-c604aa009a41" alt="" />
                    </div>
                    <div className="gits-log">
                        <img src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Saintgits%20New%20logo.png?alt=media&token=b0f6f0d6-db66-472b-9d6f-748a5eb7762c" alt="" />
                    </div>
                </div>
                <div className="bot">
                <p>Place yourself in the middle of the stream of power and wisdom which animates all whom it floats, and you are without effort impelled to truth, to right and a perfect contentment – Spiritual laws. This is what SAINTGITS COLLEGE OF ENGINEERING has been precisely doing since its commencement in 2002. In contemplation to this Saintgits College of Engineering presents NAKSHATRA 2022, the annual techno-cultural fest. It is hosted every year to recognise fledging engineers who have a flair of technical expertise and artistry. It is one of the largest and eminent fests with more than 4000 entrants from across the nation. This extravaganza unfolds to you a two-day mega event full of merry and rapture.</p>
                </div>
            </div>

            <div className="home-events">
                
                <div className="flage-top">
                    <img src={event_banner_path["NK038"]} alt="" />
                    <img src={event_banner_path["NK009"]} alt="" />
                    <img src={event_banner_path["NK068"]} alt="" />
                </div>

                <div className="flage-bot">
                    <img src={event_banner_path["NK057"]} alt="" />
                    <img src={event_banner_path["NK035"]} alt="" />
                </div>
            </div>
                <Footer/>
        </div>
    )
}