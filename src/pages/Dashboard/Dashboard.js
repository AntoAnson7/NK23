import { useEffect, useState } from "react"
import { useAppData } from "../../AppContext/AppContext"
import { Link, useNavigate } from "react-router-dom"
import { getDocs,setDoc,doc, addDoc, collection, updateDoc, getDoc } from 'firebase/firestore'
import {usersDatabase,regDatabase, CADatabase} from '../../Firebase/DBtables'
import { UserEvents } from "./UserEvents"
import {db} from '../../Firebase/config'
import {CAEvent} from './CAEvent'
import { Recommended } from "./Recommended"
import '../../Styles_temp/dash.css'
import {motion} from 'framer-motion'

 
export const Dashboard=()=>{
    const [regCheck,setRegCheck]=useState(false)
    const [dbUsers,setdbUsers]=useState([])
    const [registeredEvents,setregisteredEvents]=useState([])
    const [CAinfo,setCAinfo]=useState([])
    const [refCode,setrefCode]=useState("")
    const [CA,setCA]=useState()
    const navigate=useNavigate()

    const [{user,isVerified,isCA,userLocal},dispatch]=useAppData()


    const getUsersFromDatabase=async()=>{
        const userData=await getDocs(usersDatabase)
        setdbUsers(userData.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }

    const getRegistrations=async()=>{
        const res=await getDoc(doc(db,"users",user.uid))
        setregisteredEvents(res.data().registered)
    }

    useEffect(() => {
        if(user.uid==null){
            navigate("/")
        }
        getUsersFromDatabase()        
        getRegistrations()
        
      },[]);

    const logout=()=>{
        dispatch({
            type:'SET_VERIFICATION',
            status:false
        })
        dispatch({
            type:'SET_USER',
            user:{}
        })
        dispatch({
            type:'SET_NEW_LOCAL_USER',
            userLocal:{    
                name:null,
                email:null,
                sem:null,
                branch:null,
                college:null,
                id:null,
            }
        })
        dispatch({
            type:'SET_CA',
            isCA:false
        })
    }

    const checkUser=()=>{
        console.log(usersDatabase)
        console.log(user.uid)
        let status=false
        let ctr=0

        CAinfo.map((CA)=>{
            if(CA.userid==user.uid){
                dispatch({
                    type:"SET_CA_DOC",
                    doc:CA
                })
            }    
        })

        for(let i=0;i<dbUsers.length;i++){
            console.log(dbUsers[i].uid)
            if(dbUsers[i].uid===user.uid){
                status=true
                ctr=i
                console.log("check")
                break
            }
        }
        if(status==true){
            const newLocalUser={
                name:dbUsers[ctr].name,
                email:dbUsers[ctr].email,
                sem:dbUsers[ctr].sem,
                branch:dbUsers[ctr].branch,
                college:dbUsers[ctr].college,
                uid:dbUsers[ctr].uid,
                isCA:dbUsers[ctr].isCA
            }

            dispatch({
                type:'SET_NEW_LOCAL_USER',
                userLocal:newLocalUser
            })
            dispatch({
                type:'SET_VERIFICATION',
                status:true
            })
            dispatch({
                type:'SET_CA',
                isCA:dbUsers[ctr].isCA
            })
        }
        else{
            navigate("/signup")
        }

    }

    const makeUserCA=async()=>{

        let code=""
        for(let i=0;i<4;i++){
            if(userLocal.name[i]==" ")
            {
                code+="X"
            }
            else{
                code+=userLocal.name[i]
            }
            
        }
        for(let i=0;i<6;i++){
            code+=user?.uid[i]
        }

        setrefCode(code.toUpperCase())

        dispatch({
            type:'SET_CA',
            isCA:true
        })

        dispatch({
            type:"SET_CA_DOC",
            doc:{
                name:userLocal.name,
                userid:user.uid,
                refCode:code.toUpperCase(),
                count:0
            }
        })

        await updateDoc(doc(db,"users",user.uid),{
            isCA:true,
            refcode:code.toUpperCase(),
            refcount:0
        })

        await setDoc(doc(db,"CAMap",code.toUpperCase()),{
            uid:user.uid
        })
    }

    return (
        <motion.div className="dashboard">

                {/* DASHBOARD LEFT */}
                <div className="dashboard-left">
                    <div className="user-events">

                        {/* USER-INFO SECTION */}
                        <div className="user">

                            <div className="pfp">
                                {user.uid?<img src={user.photoURL} alt="" />:<i></i>}
                            </div>

                            <div className="user-info">
                                {isVerified?<h3>{user.displayName}</h3>:checkUser()}
                            </div>
                            
                            <div className="logout">
                                <button onClick={logout}>Logout</button>
                            </div> 
                        </div>


                        {/* REGISTERED EVENTS SECTION */}
                        <div className="events">
                            {isVerified?"":<p>Complete your profile to access more options</p>}
                            {registeredEvents?.length>0?(<UserEvents event={registeredEvents}/>):
                            <h2>You havent registered for any <strong>{<Link to="/events">Events</Link>}</strong></h2>}

                        </div>

                    </div>
                    
                    {/* CAMPUS AMBASSADOR */}
                    <div className="campus-ambassador">
                        {isCA?<CAEvent/>:regCheck?<div className="ca-reg-inter">
                            <p>Are you sure you want to become a Campus Ambassador</p>
                            <div className="butts">
                                <button onClick={()=>setRegCheck(false)}>Cancel</button>
                                <button onClick={makeUserCA}>Ok</button>
                            </div>
                        </div>:
                        <div className="unregistered">
                            <div className="caleft">
                                <div className="cadescr">
                                <h2>Campus <strong>Ambassador</strong></h2><br /><br />
                                <p>Have you dreamed of being a superhero ? Who needs superheroes when you can be a campus ambassador.
                                    “With great power comes great responsibility”.    
                                    Here’s an opportunity to explore your inner influencer.
                                    Let’s see who will become the next face of Nakshatra 🎭.  
                                    It all starts with you...</p>

                                    <div className="medals">
                                        <div className="first">
                                            <img src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca1.png?alt=media&token=fa2f32cc-94fc-48d1-a981-10555f1c0a6c" alt="" style={{width:"35px"}}/>
                                            <p>₹ 7000</p>
                                        </div>
                                        <div className="second">
                                            <img src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca2.png?alt=media&token=e9764347-f604-47c0-abc2-189fbf62e000" alt="" style={{width:"35px"}}/>
                                            <p>₹ 3000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="caright">
                                <div className="carules">
                                    <h1>Rules and Regulations</h1><br /><br />
                                    <ul>
                                        <li>Each participant will have a unique referral code, and the points won't start accruing until the other participants use the code to register for other events.</li><br />
                                        <li> Referral codes generated through either app or website can only be used for event registrations and sign-ups.</li> <br />
                                        <li> If tied, prize money will be shared.</li><br />
                                        <li>The winners should submit their valid college id cards to get the cash prize.</li> <br />
                                        <li>Certificates will be provided to the winners only.</li>   <br />
                                        <li>Committee decisions will be final.</li>
                                    </ul>
                                </div>
                                
                                <button className="ca-reg-button" onClick={()=>setRegCheck(true)}>Register Now</button>
                            </div>
                            
                        </div>}
                        
                    </div>
                        
                </div>


                {/* DASHBOARD RIGHT */}
                <div className="dashboard-right">
                    <Recommended/>
                </div>
        </motion.div>
    )
}
