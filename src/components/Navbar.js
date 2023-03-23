import { Link } from "react-router-dom";
import { useAppData } from "../AppContext/AppContext";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../Firebase/config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import useReady from "./useReady";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiUserCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

import "./styles/Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { ready } = useReady(3000);
  const [{ user, isVerified }, dispatch] = useAppData();
  const [showNavbar, setShowNavbar] = useState(false);
  const checkUser = async (id) => {
    const res = await getDoc(doc(db, "users", id));
    if (res.data()) {
      console.log("Fetch success");
      dispatch({
        type: "SET_NEW_LOCAL_USER",
        userLocal: {
          name: res.data().name,
          email: res.data().email,
          sem: res.data().sem,
          branch: res.data().branch,
          college: res.data().college,
          uid: res.data().uid,
          whatsapp: res.data().whatsapp,
          NKID: res.data().NKID,
        },
      });
      dispatch({
        type: "SET_VERIFICATION",
        status: true,
      });
      dispatch({
        type: "SET_CA",
        isCA: res.data().isCA,
      });

      res.data().isCA
        ? dispatch({
            type: "SET_CA_CODE",
            code: res.data().refcode,
          })
        : console.log();
    } else {
      navigate("/signup");
      console.log("SED");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch({
          type: "SET_USER",
          user: userAuth,
        });
        checkUser(userAuth.uid);
      } else {
        auth.signOut();
        console.log("FAIL");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
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
    }
  };

  return (
    <motion.div
      className={`navbar`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* Desktop Navbar */}
      <div className={`links`}>
        <Link to="/contact-us">
          <p>Contact Us</p>
        </Link>
        <a href="#about">
          <p>About Us</p>
        </a>
        <div id="logo">
          <Link to="/">
            <a href="#main">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2Fnk23logobright.webp?alt=media&token=8105818c-4e72-437c-8e5c-5f79e995a694"
                alt="logo"
              />
            </a>
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
            <a href="#about">
              <p>About us</p>
            </a>
          </button>

          <Link to="/events">
            <button onClick={handleShowNavbar}>
              <p>Events</p>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="smallNav">
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
            src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2Fnk23logobright.webp?alt=media&token=8105818c-4e72-437c-8e5c-5f79e995a694"
            alt="LOGO"
            onClick={() => navigate("/")}
          />
        </div>

        {user.uid == null ? (
          <BiUserCircle
            fontSize={"35px"}
            opacity={"60%"}
            onClick={googleLogin}
          />
        ) : (
          <img
            className="nav-user-pfp"
            src={user.photoURL}
            alt={"Dash"}
            onClick={() => navigate("/dashboard")}
          />
        )}
      </div>
    </motion.div>
  );
};
