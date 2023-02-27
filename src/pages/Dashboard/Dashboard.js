import { useEffect } from "react"
import { useAppData } from "../../AppContext/AppContext"
import { Navigate, useNavigate } from "react-router-dom"
import '../../Styles_temp/dash.css'


export const Dashboard=()=>{
    const navigate=useNavigate()
    const [{user,isVerified},dispatch]=useAppData()

    const verifyUser=()=>{
        dispatch({
            type:'SET_VERIFICATION',
            status:true
        })
    }
    
    useEffect(() => {
        if(user.uid==null){
            navigate("/")
        }
      }, []);
  
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
                                {isVerified?<p>{user.displayName}</p>:<button onClick={verifyUser}>Complete my Profile</button>}
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