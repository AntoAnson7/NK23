import { useAppData } from "../../AppContext/AppContext";
import { event_banner_path } from "../Events/eventDeets";
import { Footer } from "../../components/Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDocs } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { collection } from "firebase/firestore";

export const Home = () => {
  const navigate = useNavigate();
  const [{ user }] = useAppData();
  const [all, setAll] = useState([]);

  const getAll = async () => {
    const res = await getDocs(collection(db, "users"));
    setAll(res.data());
  };
  return (
    <div className="home-parent">
      <img
        className="watermark"
        src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/watermark.png?alt=media&token=5a0445e3-356d-45a6-a510-07520130b8d1"
        alt=""
      />
      <div className="home-main">
        <div className="nk-text">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/nktext.png?alt=media&token=981f2431-cc5a-4920-8f0d-51530394d0f2"
            alt=""
          />
        </div>
      </div>

      <div className="home-about-us" id="about">
        <div className="top">
          <div className="nk-log">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Untitled-3.png?alt=media&token=45b45e98-7f32-471e-9044-c604aa009a41"
              alt=""
            />
          </div>
          <div className="gits-log">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/watermark.png?alt=media&token=5a0445e3-356d-45a6-a510-07520130b8d1"
              alt=""
            />
          </div>
        </div>
        <div className="bot">
          <p>
            Prepare yourself to open the portal to a new dimension. Step into an
            unseen universe, witness the luminous stars of the day and immerse
            yourself in the matrix of technology and cultural celebration.
            SAINTGITS COLLEGE OF ENGINEERING has been a beacon of learning since
            it's inception in 2002 and the college encompasses all the virtues
            of it's slogan - 'Learn, Grow, Excel'.
          </p>
          <br />
          <p>
            Saintgits College of Engineering presents NAKSHATRA 2023, the annual
            techno-cultural fest. It is hosted every year to recognise fledging
            engineers who have a flair of technical expertise and artistry. It
            is one of the most eminent fests with more than 4000 entrants from
            across the nation. This extravaganza unfolds a two-day mega event
            that transports you into a new realm. Get enraptured in performances
            by budding engineers and artists that will leave you spellbound.
            Join in to be a part of our exquisite fest, NAKSHATRA 2023.
          </p>
        </div>
      </div>

      <div className="home-events">
        <div className="flage-top">
          <img
            src={event_banner_path["NK025"]} //
            alt=""
            onClick={() => {
              navigate("/events/cultural/music");
            }}
          />
          <img
            src={event_banner_path["NK034"]}
            alt=""
            onClick={() => {
              navigate("/events/technical/competitions");
            }}
          />
          <img
            src={event_banner_path["NK026"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/music");
            }}
          />
        </div>

        <div className="flage-bot">
          <img
            src={event_banner_path["NK033"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/music");
            }}
          />
          <img
            src={event_banner_path["NK039"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/music");
            }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};
