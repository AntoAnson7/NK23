import { useEffect, useState } from "react"
import { useAppData } from "../../AppContext/AppContext"
import { useNavigate } from "react-router-dom"
import { getDocs,setDoc,doc, addDoc, collection, updateDoc, getDoc } from 'firebase/firestore'
import {usersDatabase,regDatabase, CADatabase} from '../../Firebase/DBtables'
import { UserEvents } from "./UserEvents"
import {db} from '../../Firebase/config'
import {CAEvent} from './CAEvent'
import { Recommended } from "./Recommended"
import '../../Styles_temp/dash.css'
import {motion} from 'framer-motion'
import { get } from "react-hook-form"
// import './Dashboard.css'
 
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
                            <h2>You havent registered for any events</h2>}

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
                        </div>:<button className="ca-reg-button" onClick={()=>setRegCheck(true)}>Register Now</button>}
                        
                    </div>
                        
                </div>


                {/* DASHBOARD RIGHT */}
                <div className="dashboard-right">
                    <Recommended/>
                </div>
        </motion.div>
    )
}
