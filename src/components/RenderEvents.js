import React, { useEffect, useState } from "react";
import { event_banner_path } from "../pages/Events/eventDeets";
import { getDoc, doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase/config";
import { db } from "../Firebase/config";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../AppContext/AppContext";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { freeEvents } from "../pages/Events/eventDeets";
import "./styles/RenderEvents.css";
import e from "cors";

export function RenderEvents() {
  const [{ rend }] = useAppData();
  const [{ user, userLocal, isVerified }, dispatch] = useAppData();
  const [loginStat, setloginStat] = useState(false);
  const navigate = useNavigate();
  const [Event, setEvent] = useState([]);
  const [tempUser, setTempUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  const getEvent = async () => {
    const res = await getDoc(doc(db, "Events", rend));
    setEvent(res.data().category == undefined ? "NK007" : res.data());
  };

  const getUSERDB = async () => {
    const res = await getDoc(doc(db, "users", user.uid));
    setTempUser(res.data().registered);
  };

  const frReg = user.uid + Event.eventid;

  useEffect(() => {
    getUSERDB();
    getEvent();
    if (user.uid != null && isVerified) {
      setloginStat(true);
    }
  }, [rend, refresh]);

  const initiateRegistration = () => {
    dispatch({
      type: "SET_EVENT_TEMP",
      eventTemp: Event.eventid,
    });
    dispatch({
      type: "SET_EVENT",
      RegEvent: Event,
    });

    navigate("/events/registration");
  };

  const regFree = async () => {
    await updateDoc(doc(db, "EventRegs", Event.eventid), {
      registrations: arrayUnion(user.uid),
    });

    await updateDoc(doc(db, "users", user.uid), {
      registered: arrayUnion(Event.eventid),
    });

    await setDoc(doc(db, "Registrations", frReg), {
      amount: Event.regfee,
      eventid: Event.eventid,
      eventname: Event.name,
      method: "FREE",
      order_id: `free_${user.uid.substring(0, 6)}${Event.eventid}`,
      payment_id: "free_",
      refcode: "",
      userid: user.uid,
      username: userLocal.name,
      whatsapp: userLocal.whatsapp,
    });
    alert("Registration succesfull!");
    setRefresh(!refresh);
  };
  return (
    <motion.div
      className="render-main"
      initial={{ y: 200, scale: 0.8 }}
      animate={{ y: 0, scale: 1 }}
    >
      <div className="left">
        <motion.img
          initial={{ x: 350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="banner-img"
          src={event_banner_path[Event.eventid ? Event.eventid : "test"]}
          alt=""
        />

        {loginStat ? (
          tempUser.includes(Event.eventid) ? (
            <button className="reg-button-true-registered">Registered</button>
          ) : freeEvents.includes(Event.eventid) ? (
            <button className="reg-button" onClick={regFree}>
              Register Free
            </button>
          ) : Event.isActive && Event.spots > 0 ? (
            <button className="reg-button" onClick={initiateRegistration}>
              Register now ₹{Event.regfee}
            </button>
          ) : (
            <button className="reg-button-true">
              Registration Unavailable
            </button>
          )
        ) : (
          <button className="reg-button" onClick={googleLogin}>
            Sign in to Register
          </button>
        )}
      </div>

      <motion.div className="right" initial={{ x: -350 }} animate={{ x: 0 }}>
        <button
          className="close-1"
          onClick={() => {
            dispatch({
              type: "SET_REND",
              rend: "",
            });
          }}
        >
          <AiOutlineClose />
        </button>

        <div className="title-bar">
          <h1>{`${Event.name}`}</h1>
        </div>
        <p className="id-tag">
          Event ID <strong>{Event.eventid}</strong>
        </p>

        <p className="cat-tags">{`${Event.category} | ${Event.subcategory}`}</p>

        <div className="details">
          <p>{Event.isTeam ? "Team" : "Individual"}</p>
          {/* <p>{`Fee : ${Event.regfee}`}</p> */}
          <p>{`Spots : ${Event.spots}`}</p>
        </div>

        <div className="medals-a">
          {Event.first > 0 ? (
            <div className="first-a">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca1.png?alt=media&token=fa2f32cc-94fc-48d1-a981-10555f1c0a6c"
                alt=""
                style={{ width: "35px" }}
              />

              <p>{`₹${Event.first}/-`}</p>
            </div>
          ) : (
            <></>
          )}
          {Event.second > 0 ? (
            <div className="second-a">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca2.png?alt=media&token=e9764347-f604-47c0-abc2-189fbf62e000"
                alt=""
                style={{ width: "35px" }}
              />
              <p>{`₹${Event.second}/-`}</p>
            </div>
          ) : (
            <></>
          )}
          {Event.third > 0 ? (
            <div className="second-a">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca2.png?alt=media&token=e9764347-f604-47c0-abc2-189fbf62e000"
                alt=""
                style={{ width: "35px" }}
              />
              <p>{`₹${Event.third}/-`}</p>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="date-time">
          <p>{Event.Date}</p>
          <p>|</p>
          <p>{Event.Time}</p>
        </div>
        {Event.venue ? (
          <p className="venue">
            Venue :<strong> {Event.venue}</strong>
          </p>
        ) : (
          <></>
        )}
        <p
          className="descr-tag"
          dangerouslySetInnerHTML={{ __html: Event.description }}
        ></p>

        <div className="coord-deets">
          <p>{`Head : ${Event.headName} | ${Event.headPhno}`}</p>
          <p>{`Subhead : ${Event.sub1Name} | ${Event.sub1Phno}`}</p>
          <p>{`Subhead : ${Event.sub2Name} | ${Event.sub2Phno}`}</p>
        </div>

        {Event.rules ? (
          <div className="rules-section">
            <h1 className="rules">Rules and Regulations</h1>
            <p dangerouslySetInnerHTML={{ __html: Event.rules }}></p>
          </div>
        ) : (
          <></>
        )}
      </motion.div>
    </motion.div>
  );
}
