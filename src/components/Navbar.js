import { Link } from "react-router-dom";
import { useAppData } from "../AppContext/AppContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase/config";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiUserCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useAppData();
  const [showNavbar, setShowNavbar] = useState(false);

  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? handleShow(true) : handleShow(false);
    });
  });

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);

      dispatch({
        type: "SET_USER",
        user: res.user,
      });

      navigate("/dashboard");
    } catch (e) {
      console.log(`Google sign in failed: ${e}`);
      alert("Oops server down please try again after some time!");
    }
  };

  return (
    <div className={`navbar ${show && "navbg"}`}>
      {/* Desktop Navbar */}
      <div className="links">
        <Link to="/contact-us">
          <p>Contact Us</p>
        </Link>
        <a href="#about">
          <p>About Us</p>
        </a>
        <div id="logo">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Untitled-3.png?alt=media&token=45b45e98-7f32-471e-9044-c604aa009a41s"
              alt="logo"
            />
          </Link>
        </div>
        <Link to="/events">
          <p>Events</p>
        </Link>
        {user.uid ? (
          <Link to="/dashboard">
            <p>Dashboard</p>
          </Link>
        ) : (
          <p onClick={googleLogin}>Sign In</p>
        )}
      </div>

      {/* Hamburger side bar */}
      <div className={`nav-elements  ${showNavbar && "active"}`}>
        <div id="sidebarLinks">
          <div id="userBox">
            {/* <BiUserCircle fontSize={"30px"}/>   */}
            {user.uid ? (
              <Link to="/dashboard">
                <button onClick={handleShowNavbar}>
                  <p>Dashboard</p>
                </button>
              </Link>
            ) : (
              <button onClick={handleShowNavbar}>
                <p onClick={googleLogin}>Sign In</p>
              </button>
            )}
          </div>
          <Link to="/">
            <button onClick={handleShowNavbar}>
              <p>Home</p>
            </button>
          </Link>
          <button onClick={handleShowNavbar}>
            <p>About us</p>
          </button>

          <Link to="/events">
            <button onClick={handleShowNavbar}>
              <p>Events</p>
            </button>
          </Link>
        </div>
      </div>
      {/* Mobile Navbar */}
      <div id="smallNav">
        <div onClick={handleShowNavbar}>
          {showNavbar ? (
            <IoClose fontSize={"25px"} opacity={"60%"} />
          ) : (
            <GiHamburgerMenu fontSize={"20px"} />
          )}
        </div>
        <div>
          <img
            className="logo-small"
            src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Untitled-3.png?alt=media&token=45b45e98-7f32-471e-9044-c604aa009a41"
            alt=""
            onClick={() => navigate("/")}
          />
        </div>

        {user.uid == null ? (
          <BiUserCircle
            fontSize={"30px"}
            opacity={"60%"}
            onClick={googleLogin}
          />
        ) : (
          <BiUserCircle
            fontSize={"30px"}
            opacity={"60%"}
            onClick={() => navigate("/dashboard")}
          />
        )}
      </div>
    </div>
  );
};
