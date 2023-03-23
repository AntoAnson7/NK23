import { useAppData } from "../../AppContext/AppContext";
import { WhatsappShareButton } from "react-share";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useEffect, useState } from "react";
import "./styles/CAEvent.css";
import { RiShareForwardFill } from "react-icons/ri";
import { motion } from "framer-motion";

export const CAEvent = ({ ld }) => {
  const [{ user }] = useAppData();
  const [tempUser, setUser] = useState([]);

  const shareText = `Unleash your potential to grab opportunities to be a part of NK'23 Here's my code to join the club🥂...\n*${tempUser.refcode}*\nwww.nakshatrasgce.in `;

  const getCAinfo = async () => {
    const res = await getDoc(doc(db, "users", user.uid));
    setUser(res.data());
  };

  useEffect(() => {
    getCAinfo();
  }, []);

  return (
    <motion.div
      className="is-CA"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="CA-top">
        <p>{tempUser?.refcode}</p>
        <div className="share-whatsapp">
          <WhatsappShareButton url={shareText}>
            <button className="share">
              <RiShareForwardFill />
            </button>
          </WhatsappShareButton>
        </div>
      </div>

      <div className="CA-bot">
        {tempUser.refcount > 0 ? (
          <div className="score">
            <h2>Score</h2>
            <div className="items">
              <div className="orange"></div>
              <h1>{tempUser.refcount * 100}</h1>
              <div className="blue"></div>
            </div>
          </div>
        ) : (
          <div className="no-ref">
            <p>No Refferals Yet</p>
          </div>
        )}
        <hr />

        <div className="leaderboard">
          <h2>
            <strong>Ambassador</strong> leaderboard
          </h2>
          <div className="ca-board-1">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca1.png?alt=media&token=fa2f32cc-94fc-48d1-a981-10555f1c0a6c"
              alt=""
              style={{ width: "15px" }}
            />
            <p>{ld[0]?.name}</p>
            <p>{ld[0]?.score * 100}</p>
          </div>
          <div className="ca-board-2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca2.png?alt=media&token=e9764347-f604-47c0-abc2-189fbf62e000"
              alt=""
              style={{ width: "15px" }}
            />
            <p>{ld[1]?.name}</p>
            <p>{ld[1]?.score * 100}</p>
          </div>
          <div className="ca-board">
            <p>03</p>
            <p>{ld[2]?.name}</p>
            <p>{ld[2]?.score * 100}</p>
          </div>
          <div className="ca-board">
            <p>04</p>
            <p>{ld[3]?.name}</p>
            <p>{ld[3]?.score * 100}</p>
          </div>
          <div className="ca-board">
            <p>05</p>
            <p>{ld[4]?.name}</p>
            <p>{ld[4]?.score * 100}</p>
          </div>

          {/* 
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/images%2FCampus%20Ambassador.jpg?alt=media&token=2ae244c3-cdcd-493d-9cf8-f731c4aaee4c"
            style={{
              maxWidth: "1000%",
              maxHeight: "550px",
              borderRadius: "15px",
            }}
            alt=""
          /> */}
        </div>
      </div>
    </motion.div>
  );
};
