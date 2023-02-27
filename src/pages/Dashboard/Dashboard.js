import { useEffect, useState } from "react"
import { useAppData } from "../../AppContext/AppContext"
import { Navigate, useNavigate } from "react-router-dom"
import '../../Styles_temp/dash.css'
import {getDocs} from 'firebase/firestore'
import {getCollection} from '../../Firebase/connection'
 
export const Dashboard=()=>{

    const [dbUsers,setdbUsers]=useState([])
    const usersDatabase=getCollection("users")

    const navigate=useNavigate()
    const [{user,isVerified},dispatch]=useAppData()

    const getUsersFromDatabase=async()=>{
        const userData=await getDocs(usersDatabase)
        setdbUsers(userData.docs)
    }

    useEffect(() => {
        getUsersFromDatabase()
        if(user.uid==null){
            navigate("/")
        }
      }, []);

    const signUpUser=()=>{
        let status=false
        let ctr=0
        console.log(dbUsers[0]._document.data.value.mapValue.fields.id)
        // console.log(dbUsers.length)
        for(let i=0;i<dbUsers.length;i++){
            console.log(user.uid)
            // console.log("USER: "+dbUsers[i]._document.data.value.mapValue.fields.id.stringValue)
            if(dbUsers[i]._document.data.value.mapValue.fields.id.stringValue===user.uid){
                status=true
                ctr=i
                console.log("check")
                break
            }
        }
        console.log(dbUsers[ctr]._document.data.value.mapValue.fields)//TEST
        if(status==true){
            
            const newLocalUser={
                name:dbUsers[ctr]._document.data.value.mapValue.fields.name.stringValue,
                email:dbUsers[ctr]._document.data.value.mapValue.fields.email.stringValue,
                sem:dbUsers[ctr]._document.data.value.mapValue.fields.sem.integerValue,
                branch:dbUsers[ctr]._document.data.value.mapValue.fields.branch.stringValue,
                college:dbUsers[ctr]._document.data.value.mapValue.fields.college.stringValue,
                id:dbUsers[ctr]._document.data.value.mapValue.fields.id.stringValue
            }

            dispatch({
                type:'SET_NEW_LOCAL_USER',
                userLocal:newLocalUser
            })
            dispatch({
                type:'SET_VERIFICATION',
                status:true
            })
            navigate("/")
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
                                {isVerified?<p>{user.displayName}</p>:<button onClick={signUpUser}>Complete my Profile</button>}
                            </div>
                        </div>


                        {/* REGISTERED EVENTS SECTION */}
                        <div className={isVerified?"events":"events-un"}>
                            {isVerified?"":<p>Complete your profile to access more options</p>}
                            {/* X-Scroll Registered events */}
                        </div>

                    </div>
                    
                    {/* CAMPUS AMBASSADOR */}
                    <div className={isVerified?"campus-ambassador":"campus-ambassador-un"}>
                        {isVerified?"":<p>Complete your profile to access more options</p>}
                        {/* Campus Ambassador event */}
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

//tuszKz66X3dk5L2ABKAWA9MA27S2