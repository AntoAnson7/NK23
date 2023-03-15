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
            Place yourself in the middle of the stream of power and wisdom which
            animates all whom it floats, and you are without effort impelled to
            truth, to right and a perfect contentment – Spiritual laws. This is
            what SAINTGITS COLLEGE OF ENGINEERING has been precisely doing since
            its commencement in 2002. In contemplation to this Saintgits College
            of Engineering presents Nakshatra 2022, the annual techno-cultural
            fest. It is hosted every year to recognise fledging engineers who
            have a flair of technical expertise and artistry. It is one of the
            largest and eminent fests with more than 4000 entrants from across
            the nation. This extravaganza unfolds to you a two-day mega event
            full of merry and rapture.
          </p>
        </div>
      </div>

      <div className="home-events">
        <div className="flage-top">
          <img
            src={event_banner_path["NK038"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/music");
            }}
          />
          <img
            src={event_banner_path["NK009"]}
            alt=""
            onClick={() => {
              navigate("/events/technical/competitions");
            }}
          />
          <img
            src={event_banner_path["NK068"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/music");
            }}
          />
        </div>

        <div className="flage-bot">
          <img
            src={event_banner_path["NK057"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/music");
            }}
          />
          <img
            src={event_banner_path["NK035"]}
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
