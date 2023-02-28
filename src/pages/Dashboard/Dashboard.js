import { useEffect, useState } from "react"
import { useAppData } from "../../AppContext/AppContext"
import { useNavigate } from "react-router-dom"
import '../../Styles_temp/dash.css'
import {getDocs} from 'firebase/firestore'
import {usersDatabase,regDatabase} from '../../Firebase/DBtables'
import { UserEvents } from "./UserEvents"
import {CAEvent} from './CAEvent'
 
export const Dashboard=()=>{

    const [dbUsers,setdbUsers]=useState([])
    const [registeredEvents,setregisteredEvents]=useState([])
    const navigate=useNavigate()
    const [{user,isVerified,isCA,code},dispatch]=useAppData()

    const getUsersFromDatabase=async()=>{
        const userData=await getDocs(usersDatabase)
        setdbUsers(userData.docs)
    }

    const getRegisteredUsers=async()=>{
        let temp=[]
        const res= await getDocs(regDatabase)
        res.docs.map((doc)=>{
            if(doc._document.data.value.mapValue.fields.userid.stringValue===user.uid){
                temp.push(doc._document.data.value.mapValue.fields.eventid.stringValue)
            }
        })
        setregisteredEvents(temp)
    }

    useEffect(() => {
        getUsersFromDatabase()

        if(user.uid==null){
            navigate("/")
        }

        getRegisteredUsers()

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
        
        dispatch({
            type:'SET_CA_CODE',
            code:null
        })
    }

    const checkUser=()=>{
        let status=false
        let ctr=0

        for(let i=0;i<dbUsers.length;i++){
            if(dbUsers[i]._document.data.value.mapValue.fields.id.stringValue===user.uid){
                status=true
                ctr=i
                console.log("check")
                break
            }
        }
        if(status==true){
            const newLocalUser={
                name:dbUsers[ctr]._document.data.value.mapValue.fields.name.stringValue,
                email:dbUsers[ctr]._document.data.value.mapValue.fields.email.stringValue,
                sem:dbUsers[ctr]._document.data.value.mapValue.fields.sem.integerValue,
                branch:dbUsers[ctr]._document.data.value.mapValue.fields.branch.stringValue,
                college:dbUsers[ctr]._document.data.value.mapValue.fields.college.stringValue,
                id:dbUsers[ctr]._document.data.value.mapValue.fields.id.stringValue,
                isCA:dbUsers[ctr]._document.data.value.mapValue.fields.isCA.booleanValue
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
                isCA:dbUsers[ctr]._document.data.value.mapValue.fields.isCA.booleanValue
            })

            console.log(isVerified)
        }
        else{
            navigate("/signup")
        }

    }
  
    return (
        <div className="dashboard">

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
                            
                            {registeredEvents?.length>0?(registeredEvents?.map((_event)=>(
                                // TODO: CREATE COMPONENT TO RENDER EVENTS _event is eventid
                                <UserEvents event={_event}/>
                                //TODO
                            ))):<h2>You havent registered for any events</h2>}

                        </div>

                    </div>
                    
                    {/* CAMPUS AMBASSADOR */}
                    <div className="campus-ambassador">
                        {isCA?<h1>{code?code:"nocode"}</h1>:(<CAEvent/>)}
                    </div>

                </div>


                {/* DASHBOARD RIGHT */}
                <div className="dashboard-right">
                    {/* Y-Scroll recommended events */}
                </div>
        </div>
    )
}


//userData.docs[0]._document.data.value.mapValue.fields.sem
