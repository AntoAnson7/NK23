import { useAppData } from '../../AppContext/AppContext'
import '../../Styles_temp/ca.css'
import {WhatsappShareButton,WhatsappIcon} from 'react-share'




export const CAEvent=()=>{
        const [{CA}]=useAppData()
        const shareText=`Hey guys use my refferal code to register for events at Nakshatra 2023 code: *${CA.refCode}*`

    return (
        <div className='is-CA'>
            <div className="code">
                <p>{CA.refCode}</p>
                <div className="share-whatsapp">
                    <WhatsappShareButton url={shareText}>
                        <WhatsappIcon/>
                    </WhatsappShareButton>
                </div>
            </div>
            <div className='score'>
                <h1>{CA.count*1000}</h1>
            </div>
            

        </div>
    )
}


