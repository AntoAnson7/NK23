import {
  event_banner_path,
  nameMap,
  venue,
  dates,
  time,
} from "../Events/eventDeets";
import { useState, useEffect } from "react";
import { useAppData } from "../../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { motion } from "framer-motion";
import "./styles/userEvents.css";
import { GoVerified } from "react-icons/go";

export const UserEvents = ({ event }) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [{ user, userLocal }] = useAppData();
  const [dbU, setdbU] = useState([]);
  const [vis, setVis] = useState(false);

  const [status, setStatus] = useState(false);

  const getUser = async () => {
    const res = await getDoc(doc(db, "users", user.uid));
    setdbU(res.data());
  };

  const getStatus = async () => {
    const res = await getDoc(doc(db, "Verification", user.uid));
    res.data() ? setStatus(res.data().verified) : setStatus(false);
  };

  useEffect(() => {
    if (user.uid == null) {
      navigate("/");
    }
    getUser();
    getStatus();
  }, []);

  const str = `{
        Name : ${userLocal.name}
        ID : NK-${user.uid?.substring(0, 4).toUpperCase()}
        Events: ${event.map((e, i) => {
          return e;
        })}
    }`;

  return (
    <motion.div initial={{ x: -250 }} animate={{ x: 0 }}>
      <div className="user-events-temp">
        {event.map((e, i) => (
          <div className="sub" key={i}>
            <img
              onClick={() => {
                setFlag(!flag);
                console.log(event);
              }}
              src={
                event_banner_path[e]
                  ? event_banner_path[e]
                  : event_banner_path["test"]
              }
              alt=""
              style={{ width: "8rem" }}
            />
            <p className="deets">Click to view ticket</p>
          </div>
        ))}
      </div>

      <button
        className="vt"
        onClick={() => {
          status ? setFlag(!flag) : !flag ? setVis(true) : setVis(false);
        }}
      >
        View ticket
      </button>
      {vis && (
        <motion.div
          className="id-alert"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <p>
            {" "}
            Please Dont forget to bring your college ID card and get your ticket
            verified at the registration counter!
          </p>
          <div>
            <button
              onClick={() => {
                setFlag(!flag);
                setVis(false);
              }}
            >
              OK
            </button>
          </div>
        </motion.div>
      )}

      {flag ? (
        <motion.div
          style={{ border: `2px solid ${status ? "#1DA1F2" : "green"}` }}
          className="ticket"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <button className="x" onClick={() => setFlag(!flag)}>
            X
          </button>

          <div className="qr-div">
            <QRCode className="qr" value={str} style={{ width: "150px" }} />
          </div>
          <div className="user-deets">
            <div className="name-ver" style={{ display: "flex", gap: "10px" }}>
              <h1>{dbU.name}</h1>
              {status && <GoVerified color="#1DA1F2" size="35px" />}
            </div>
            <p>{dbU.NKID}</p>
          </div>
          <div className="registered">
            {dbU.registered?.map((r, i) => (
              <div className="user-e" key={i}>
                <img src={event_banner_path[r]} alt="" />
                <div className="user-e-deet">
                  <h3>{`${r}`}</h3>
                  <p style={{ fontWeight: "bold" }}>{nameMap[r]}</p>
                  <p style={{ fontSize: "15px" }}>
                    Date :{" "}
                    <span style={{ fontWeight: "bold" }}>{dates[r]}</span>
                  </p>
                  <p>
                    Time: <span style={{ fontWeight: "bold" }}>{time[r]}</span>
                  </p>
                  <p>
                    Venue :{" "}
                    <span style={{ fontWeight: "bold", color: "#8C2725" }}>
                      {venue[r]}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {!status && (
            <p className="ticket-footer">
              Please Dont forget to bring your ID card and get your ticket
              verified at the registration counter!
            </p>
          )}
        </motion.div>
      ) : (
        <></>
      )}
    </motion.div>
  );
};
