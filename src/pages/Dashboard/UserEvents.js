import { event_banner_path, nameMap } from "../Events/eventDeets";
import { useState, useEffect } from "react";
import { useAppData } from "../../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import "./styles/userEvents.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";

export const UserEvents = ({ event }) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [{ user, userLocal }] = useAppData();
  const [dbU, setdbU] = useState([]);

  const getUser = async () => {
    const res = await getDoc(doc(db, "users", user.uid));
    setdbU(res.data());
  };

  useEffect(() => {
    if (user.uid == null) {
      navigate("/");
    }
    getUser();
  }, []);

  const str = `{
        Name : ${userLocal.name},
        ID : NK-${user.uid?.substring(0, 4).toUpperCase()},
        Events: ${event.map((e, i) => {
          return e + " | ";
        })}
    }`;

  return (
    <div>
      <div className="user-events-temp">
        {event.map((e, i) => (
          <div className="sub" key={i}>
            <img
              onClick={() => setFlag(!flag)}
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

      <button className="vt" onClick={() => setFlag(!flag)}>
        View ticket
      </button>

      {flag ? (
        <div className="ticket">
          <button className="x" onClick={() => setFlag(!flag)}>
            X
          </button>

          <div className="qr-div">
            <QRCode className="qr" value={str} style={{ width: "150px" }} />
          </div>
          <div className="user-deets">
            <h1>{dbU.name}</h1>
            <p>{dbU.NKID}</p>
          </div>
          <div className="registered">
            {dbU.registered?.map((r, i) => (
              <div className="user-e" key={i}>
                <img src={event_banner_path[r]} alt="" />
                <div className="user-e-deet">
                  <h3>{`${r}`}</h3>
                  <p>{nameMap[r]}</p>
                  <p>Date : TBD</p>
                  <p>Venue : TBD</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
