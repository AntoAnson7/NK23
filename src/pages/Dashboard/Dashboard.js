import { useEffect, useState } from "react";
import { useAppData } from "../../AppContext/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  collection,
} from "firebase/firestore";
import { usersDatabase } from "../../Firebase/DBtables";
import { UserEvents } from "./UserEvents";
import { db } from "../../Firebase/config";
import { CAEvent } from "./CAEvent";
import { Recommended } from "./Recommended";
import useReady from "../../components/useReady";
import { motion } from "framer-motion";
import { MdModeEdit } from "react-icons/md";
import { auth } from "../../Firebase/config";
import { IoConstruct } from "react-icons/io5";
import "./styles/Reccomended.css";

export const Dashboard = () => {
  const { ready } = useReady(1500);

  const [regCheck, setRegCheck] = useState(false);
  // const [dbUsers, setdbUsers] = useState([]);
  const [registeredEvents, setregisteredEvents] = useState([]);
  const navigate = useNavigate();
  const [ld, setLD] = useState([]);
  const [{ user, isVerified, isCA, userLocal }, dispatch] = useAppData();

  const getCAld = async () => {
    const res = await getDocs(collection(db, "CALeaderboard"));
    setLD(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    dispatch({
      type: "SET_REND",
      rend: "",
    });
    getCAld();
  }, []);
  const getRegistrations = async () => {
    const res = await getDoc(doc(db, "users", user?.uid));
    setregisteredEvents(res.data().registered);
  };

  useEffect(() => {
    if (ready == true) {
      if (user.uid == null) {
        navigate("/");
      } else if (user.uid != null && !isVerified) {
        navigate("/signup");
      }
    }
  }, [user, isVerified]);

  useEffect(() => {
    getRegistrations();
  }, [getRegistrations]);

  const logout = async () => {
    await auth.signOut();
    dispatch({
      type: "SET_VERIFICATION",
      status: false,
    });
    dispatch({
      type: "SET_USER",
      user: {},
    });
    dispatch({
      type: "SET_NEW_LOCAL_USER",
      userLocal: {
        name: null,
        email: null,
        sem: null,
        branch: null,
        college: null,
        id: null,
      },
    });
    dispatch({
      type: "SET_CA",
      isCA: false,
    });
  };

  const makeUserCA = async () => {
    let code = "";
    for (let i = 0; i < 4; i++) {
      if (userLocal.name[i] === " ") {
        code += "X";
      } else {
        code += userLocal.name[i];
      }
    }
    for (let i = 0; i < 6; i++) {
      code += user?.uid[i];
    }

    dispatch({
      type: "SET_CA",
      isCA: true,
    });

    dispatch({
      type: "SET_CA_DOC",
      doc: {
        name: userLocal.name,
        userid: user.uid,
        refCode: code.toUpperCase(),
        count: 0,
      },
    });

    await updateDoc(doc(db, "users", user.uid), {
      isCA: true,
      refcode: code.toUpperCase(),
      refcount: 0,
    });

    await setDoc(doc(db, "CAMap", code.toUpperCase()), {
      uid: user.uid,
    });
  };

  return (
    <motion.div className="dashboard">
      {/* DASHBOARD LEFT */}
      <motion.div
        className="dashboard-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="user-events" id="unr">
          {/* USER-INFO SECTION */}
          <div className="user">
            <div className="pfp">
              <button
                className="edit-profile"
                onClick={() => navigate("/dashboard/edit-profile")}
              >
                <MdModeEdit />
              </button>
              {isVerified ? <img src={user.photoURL} alt="" /> : <i></i>}
            </div>

            <div className="user-info">
              {isVerified ? (
                <h3>
                  {userLocal.name}
                  <strong>{userLocal.NKID}</strong>
                </h3>
              ) : (
                <></>
              )}
            </div>

            <div className="logout">
              <button onClick={logout}>Logout</button>
            </div>
          </div>

          {/* REGISTERED EVENTS SECTION */}
          <div className="events">
            {registeredEvents?.length > 0 ? (
              <UserEvents event={registeredEvents} />
            ) : (
              <h2>
                You havent registered for any{" "}
                <strong>{<Link to="/events">Events</Link>}</strong>
              </h2>
            )}
          </div>
        </div>

        {/* CAMPUS AMBASSADOR */}
        <div className="campus-ambassador">
          {isCA ? (
            // <div className="maint">
            //   <IoConstruct className="wre" />
            //   <h1>Campus Ambassador dashboard will be back soon! </h1>
            // </div>
            <CAEvent ld={ld} />
          ) : // <CAEvent users={dbUsers} />
          regCheck ? (
            <div className="ca-reg-inter">
              <p>Are you sure you want to become a Campus Ambassador</p>
              <div className="butts">
                <button onClick={() => setRegCheck(false)}>Cancel</button>
                <button onClick={makeUserCA}>Ok</button>
              </div>
            </div>
          ) : (
            <div className="unregistered">
              <div className="caleft">
                <div className="cadescr">
                  <h2>
                    Campus <strong>Ambassador</strong>
                  </h2>
                  <br />
                  <br />
                  <p>
                    Have you dreamed of being a superhero ? Who needs
                    superheroes when you can be a campus ambassador. “With great
                    power comes great responsibility”. Here’s an opportunity to
                    explore your inner influencer. Let’s see who will become the
                    next face of Nakshatra 🎭. It all starts with you...
                  </p>

                  <div className="medals">
                    <div className="first">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca1.png?alt=media&token=fa2f32cc-94fc-48d1-a981-10555f1c0a6c"
                        alt=""
                        style={{ width: "35px" }}
                      />
                      <p>₹ 7000</p>
                    </div>
                    <div className="second">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca2.png?alt=media&token=e9764347-f604-47c0-abc2-189fbf62e000"
                        alt=""
                        style={{ width: "35px" }}
                      />
                      <p>₹ 3000</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="caright">
                <div className="carules">
                  <h1>Rules and Regulations</h1>
                  <br />
                  <br />
                  <ul>
                    <li>
                      Each participant will have a unique referral code, and the
                      points won't start accruing until the other participants
                      use the code to register for other events.
                    </li>
                    <br />
                    <li>
                      <h3>Higher the registration more the point rewarded!</h3>
                    </li>
                    <br />
                    <li>
                      {" "}
                      Referral codes generated through either app or website can
                      only be used for event registrations and sign-ups.
                    </li>{" "}
                    <br />
                    <li> If tied, prize money will be shared.</li>
                    <br />
                    <li>
                      The winners should submit their valid college id cards to
                      get the cash prize.
                    </li>{" "}
                    <br />
                    <li>
                      Certificates will be provided to the winners only.
                    </li>{" "}
                    <br />
                    <li>Committee decisions will be final.</li>
                    <br />
                    <li>For further queries contact:</li>
                    <br />
                    <ul>
                      <li>Head: Airene Ann Mathew | 6282597327</li>
                      <li>Subhead :David M | 8111867786</li>
                      <li>Subhead :Geevees K | George 9487894178</li>
                    </ul>
                  </ul>
                </div>

                <a href="#unr">
                  <button
                    className="ca-reg-button"
                    onClick={() => makeUserCA()}
                  >
                    Register Now
                  </button>
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* DASHBOARD RIGHT */}
      <motion.div
        className="dashboard-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3>
          <strong>Recommended</strong> Events
        </h3>
        <Recommended />
      </motion.div>
    </motion.div>
  );
};
