import { Link } from "react-router-dom"
import { useAppData } from "../AppContext/AppContext"
import { signInWithPopup } from 'firebase/auth'
import { auth,provider } from '../Firebase/config'
import { useNavigate } from "react-router-dom"
import '../Styles_temp/nav.css'
import {RxHamburgerMenu} from 'react-icons/rx'
import { useState } from "react"
import {motion} from 'framer-motion'

export const Navbar=()=>{
    
    const navigate=useNavigate()
    const [{user},dispatch]=useAppData()

    const [menu,setMenu]=useState(false)

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
        <motion.div className="nav"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        >
            <div className="navbar">
                <div className="links">
                    <a href="">About Us</a>
                    <a href="">Contact Us</a>
                    <Link to="/">Home</Link>
                    <Link to="/events">Events</Link>
                    {user.uid?<Link to="/dashboard">Dashboard</Link>:<button onClick={googleLogin}>Sign In</button>}
                </div>
            </div>
            
            <div className="nav2">
                <RxHamburgerMenu className="ham" onClick={()=>setMenu(!menu)}/>
            </div>
            {menu?<div className="menu">
                <h1 onClick={()=>{
                    setMenu(false)
                    navigate("/")}}>Home
                    </h1>

                <h1>About Us</h1>
                <h1 >Contact Us</h1>
                <h1 onClick={()=>{
                    navigate("/events")
                    setMenu(false)}}>Events</h1>
                <h1 >Dashboard</h1>
            </div>:<></>}
        </motion.div>
    )
}
