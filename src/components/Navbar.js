import { Link } from "react-router-dom"
import { useAppData } from "../AppContext/AppContext"
import { signInWithPopup } from 'firebase/auth'
import { auth,provider } from '../Firebase/config'
import { useNavigate } from "react-router-dom"
import '../Styles_temp/nav.css'

export const Navbar=()=>{
    
    const navigate=useNavigate()
    const [{user},dispatch]=useAppData()

    const googleLogin=async()=>{
        try{
            const res=await signInWithPopup(auth,provider)

            dispatch({
                type:'SET_USER',
                user:res.user
            })

            navigate("/dashboard")
        }

        catch(e){
            console.log(`Google sign in failed: ${e}`)
            alert("Oops server down please try again after some time!")
        }
    }

    return(
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                {user.uid?<Link to="/dashboard">Dashboard</Link>:<button onClick={googleLogin}>Sign In</button>}
            </div>
        </div>
    )
}
