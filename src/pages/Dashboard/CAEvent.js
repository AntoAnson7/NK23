import { useAppData } from '../../AppContext/AppContext'
import '../../Styles_temp/ca.css'
import {WhatsappShareButton,WhatsappIcon} from 'react-share'
import {doc,getDoc} from 'firebase/firestore'
import {db} from '../../Firebase/config'
import { useEffect, useState } from 'react'


export const CAEvent=()=>{
    //TEMP
    const temp=[{name:"Anto",score:1500},{name:"Afevo",score:1540},{name:"Aevsdo",score:250},{name:"Adsds",score:50},{name:"Afevo",score:5400},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540},{name:"Afevo",score:540}]
    temp.sort((a,b)=>{
        return b.score-a.score
    })
    //TEMP
    const [{user}]=useAppData()
    const [tempUser,setUser]=useState([])
    const CA={
        count:100,
        refCode:"DHD"
    }

    const shareText=`Unleash your potential to grab opportunities to be a part of NK'23 Here's my code to join the club🥂 …… *${tempUser.refcode}*`

    const getCAinfo=async()=>{
        const res = await getDoc(doc(db,"users",user.uid))
        setUser(res.data())
    }
    useEffect(()=>{
        getCAinfo()
    },[])

    return (
        <div className='is-CA'>
            <div className="CA-top">
                    <p>{tempUser?.refcode}</p>
                    <div className="share-whatsapp">
                        <WhatsappShareButton url={shareText} >
                            <WhatsappIcon className='share'/>
                        </WhatsappShareButton>
                </div>

            </div>

            <div className="CA-bot">    
                    <div className='score'>
                        <h2>Score</h2>
                        <div className="items">
                            <div className='orange'></div>
                            <h1>{tempUser.refcount*100}</h1>
                            <div className='blue'></div>
                        </div>
                    </div>

                <div className="leaderboard">
                    <div className="podium">
                        <div className="p1-m">
                            <div className='p1'><p>1200</p></div>
                            <p>Antony Anson</p>
                        </div>

                        <div className="p2-m">
                            <div className='p2'><p>2500</p></div>
                            <p>Antony Michael Anson</p>
                        </div>

                        <div className="p3-m">
                            <div className='p3'><p>300</p></div>
                            <p>C Jacob Thomas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


