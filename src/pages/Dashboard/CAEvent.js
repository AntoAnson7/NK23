import { useAppData } from "../../AppContext/AppContext";
import { WhatsappShareButton } from "react-share";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useEffect, useState } from "react";
import "./styles/CAEvent.css";
import { RiShareForwardFill } from "react-icons/ri";
import { motion } from "framer-motion";

export const CAEvent = ({ users }) => {
  users.sort((a, b) => {
    return b.refcount - a.refcount;
  });

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
            <strong>Campus Ambassador</strong> leaderboard
          </h2>
          <div className="ca-board-1">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca1.png?alt=media&token=fa2f32cc-94fc-48d1-a981-10555f1c0a6c"
              alt=""
              style={{ width: "15px" }}
            />
            <p>{users[0]?.name}</p>
            <p>{users[0]?.refcount * 100}</p>
          </div>
          <div className="ca-board-2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/ca2.png?alt=media&token=e9764347-f604-47c0-abc2-189fbf62e000"
              alt=""
              style={{ width: "15px" }}
            />
            <p>{users[1]?.name}</p>
            <p>{users[1]?.refcount * 100}</p>
          </div>
          <div className="ca-board">
            <p>03</p>
            <p>{users[2]?.name}</p>
            <p>{users[2]?.refcount * 100}</p>
          </div>
          <div className="ca-board">
            <p>04</p>
            <p>{users[3]?.name}</p>
            <p>{users[3]?.refcount * 100}</p>
          </div>
          <div className="ca-board">
            <p>05</p>
            <p>{users[4]?.name}</p>
            <p>{users[4]?.refcount * 100}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
