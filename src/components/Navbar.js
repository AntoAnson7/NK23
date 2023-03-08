// import { Link } from "react-router-dom"
// import { useAppData } from "../AppContext/AppContext"
// import { signInWithPopup } from 'firebase/auth'
// import { auth,provider } from '../Firebase/config'
// import { useNavigate } from "react-router-dom"
// import '../Styles_temp/nav.css'
// import {RxHamburgerMenu} from 'react-icons/rx'
// import { useState } from "react"
// import {motion} from 'framer-motion'

// export const Navbar=()=>{
    
//     const navigate=useNavigate()
//     const [{user},dispatch]=useAppData()

//     const [menu,setMenu]=useState(false)

//     const googleLogin=async()=>{
//         try{
//             const res=await signInWithPopup(auth,provider)

//             dispatch({
//                 type:'SET_USER',
//                 user:res.user
//             })

//             navigate("/dashboard")
//         }

//         catch(e){
//             console.log(`Google sign in failed: ${e}`)
//             alert("Oops server down please try again after some time!")
//         }
//     }

//     return(
//         <motion.div className="nav"
//         initial={{opacity:0}}
//         animate={{opacity:1}}
//         exit={{opacity:0}}
//         >
//             <div className="navbar">
//                 <div className="links">
//                     <a href="">About Us</a>
//                     <a href="">Contact Us</a>
//                     <Link to="/">Home</Link>
//                     <Link to="/events">Events</Link>
//                     {user.uid?<Link to="/dashboard">Dashboard</Link>:<button onClick={googleLogin}>Sign In</button>}
//                 </div>
//             </div>
            
//             <div className="nav2">
//                 <RxHamburgerMenu className="ham" onClick={()=>setMenu(!menu)}/>
//             </div>
//             {menu?<div className="menu">
//                 <h1 onClick={()=>{
//                     setMenu(false)
//                     navigate("/")}}>Home
//                     </h1>

//                 <h1>About Us</h1>
//                 <h1 >Contact Us</h1>
//                 <h1 onClick={()=>{
//                     navigate("/events")
//                     setMenu(false)}}>Events</h1>
//                 <h1 >Dashboard</h1>
//             </div>:<></>}
//         </motion.div>
//     )
// }


import { Link } from "react-router-dom"
import { useAppData } from "../AppContext/AppContext"
import { signInWithPopup } from 'firebase/auth'
import { auth,provider } from '../Firebase/config'
import { useNavigate } from "react-router-dom"
import '../Styles_temp/nav.css'
import logo from "./logo.png"
import {GiHamburgerMenu} from "react-icons/gi"
import {BiUserCircle} from "react-icons/bi"
import {IoClose} from "react-icons/io5"
import { useState } from "react"


export const Navbar=()=>{
    
    const navigate=useNavigate()
    const [{user},dispatch]=useAppData()
    const [showNavbar, setShowNavbar] = useState(false)
      
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
      }

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
            {/* Desktop Navbar */}
            <div className="links">
                <Link to="/contact-us">
                    <p>Contact Us</p></Link>
                <a href="#about">
                    <p>About Us</p>
                </a>
                <div id="logo">
                   <Link to="/"><img src={logo} alt="logo"/></Link>
                </div>
                <Link to="/events">
                    <p>Events</p>
                </Link>
                {user.uid?<Link to="/dashboard"><p>Dashboard</p></Link>:<p onClick={googleLogin}>Sign In</p>}
            </div>

            {/* Hamburger side bar */}
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
              <div id="sidebarLinks"> 
                <div id="userBox">
                <BiUserCircle fontSize={"30px"}/>  
                {user.uid?<Link to="/dashboard"><p>Dashboard</p></Link>:<p onClick={googleLogin}>Sign In</p>}
               </div>
               <Link to="/">
                <p>Home</p> 
              </Link>
                <p>About US</p>
                <Link to="/events">
                    <p>Events</p>
                </Link>
              </div> 
            </div>
            {/* Mobile Navbar */}
            <div id="smallNav">
            <div onClick={handleShowNavbar}>
                {showNavbar ?<IoClose fontSize={"25px"}/> : <GiHamburgerMenu fontSize={"20px"}/>}
            
            </div>
               <div>
                    <img className="logo-small" src={logo} alt="" />
                    {/* <h2 id="headinglogo">NAKSHATRA '23</h2> */}
               </div>
               
               <BiUserCircle fontSize={"30px"}/>
            </div>
        </div>
    )
}
