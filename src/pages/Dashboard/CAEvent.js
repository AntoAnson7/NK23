import { useAppData } from "../../AppContext/AppContext";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useEffect, useState } from "react";
import "./styles/CAEvent.css";
import { RiShareForwardFill } from "react-icons/ri";

export const CAEvent = () => {
  //TEMP
  const temp = [
    { name: "Anto", score: 1500 },
    { name: "Afevo", score: 1540 },
    { name: "Aevsdo", score: 250 },
    { name: "Adsds", score: 50 },
    { name: "Afevo", score: 5400 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
    { name: "Afevo", score: 540 },
  ];
  temp.sort((a, b) => {
    return b.score - a.score;
  });
  //TEMP
  const [{ user }] = useAppData();
  const [tempUser, setUser] = useState([]);

  const shareText = `Unleash your potential to grab opportunities to be a part of NK'23 Here's my code to join the club🥂 …… *${tempUser.refcode}*`;

  const getCAinfo = async () => {
    const res = await getDoc(doc(db, "users", user.uid));
    setUser(res.data());
  };
  useEffect(() => {
    getCAinfo();
  }, []);

  return (
    <div className="is-CA">
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

        <div className="leaderboard"></div>
      </div>
    </div>
  );
};
