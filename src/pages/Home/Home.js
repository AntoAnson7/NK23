import { event_banner_path } from "../Events/eventDeets";
import { Footer } from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import { useAppData } from "../../AppContext/AppContext";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const Home = () => {
  const navigate = useNavigate();
  const [cur, setCur] = useState(0);
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });
  const [{}, dispatch] = useAppData();

  useEffect(() => {
    dispatch({
      type: "SET_REND",
      rend: "",
    });
  }, []);

  const sizeUpdate = () => {
    setSize({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  };

  const bgi = [
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fslide%2FIMG_7495.JPG?alt=media&token=f6acea4c-866e-4cbd-b1ac-a62c76eb73f5",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fab.jpg?alt=media&token=e7da8d95-15e7-412e-aede-c880d251e1c9",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fslide%2FIMG_2938.JPG?alt=media&token=2eacff9e-8ae6-4f58-928d-aed4f9528636",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fslide%2FIMG_2932.JPG?alt=media&token=34d6d89d-8477-4691-8d5f-faf1e5e676c3",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fslide%2FIMG_2937.JPG?alt=media&token=39a14e3a-beb0-4bfb-849f-a1265b38e883",
  ];

  const mob = [
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fmobile%2Fmod3.jpg?alt=media&token=907c4cd6-6fbc-4966-91dd-2709922be41c",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fmobile%2Fmod2.jpg?alt=media&token=c743fe38-2a99-4dc8-a561-f4a662a15133",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fslide%2FIMG_7494.JPG?alt=media&token=9c8cf55c-b364-4888-b39f-ac5a29e25302",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fslide%2FIMG_7335.JPG?alt=media&token=bb95d59f-02b4-4876-8321-3e470f6835d0",
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fslide%2FIMG_3927.JPG?alt=media&token=eedc10de-1dee-4420-94dc-31ea2893dc2d",
  ];

  useEffect(() => {
    window.addEventListener("resize", sizeUpdate);
    return () => {
      window.removeEventListener("resize", sizeUpdate);
    };
  }, [size]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cur == 2) {
        setCur(0);
      } else {
        setCur(cur + 1);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [cur]);

  const handleBGchange = (i) => {
    setCur(i);
  };

  const bgStyle = {
    position: "relative",
    height: "110vh",
    width: "100vw",
    backgroundImage: `url(${bgi[cur]})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <motion.div
      className="home-parent"
      id="main"
      initial={{ y: 500 }}
      animate={{ y: 0 }}
    >
      <img
        className="watermark"
        src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/watermark.png?alt=media&token=5a0445e3-356d-45a6-a510-07520130b8d1"
        alt=""
      />
      <div className="home-main">
        <motion.div
          className="nk-text"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/nktext.png?alt=media&token=981f2431-cc5a-4920-8f0d-51530394d0f2"
            alt=""
          />
        </motion.div>
        <div className="home-grad"></div>
      </div>

      <div className="home-about-us" id="about">
        <div className="grad"></div>
        <div className="grad2"></div>

        {/* rgba(140, 39, 37,0.5)  #16171B*/}
        <div className="ab-text">
          <h1 className="text-title">
            About <strong>Us</strong>
          </h1>
          <div className="ab-top">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Saintgits%20New%20logo.png?alt=media&token=b0f6f0d6-db66-472b-9d6f-748a5eb7762c"
              alt=""
            />
            <p>
              Prepare yourself to open the portal to a new dimension. Step into
              an unseen universe, witness the luminous stars of the day and
              immerse yourself in the matrix of technology and cultural
              celebration. SAINTGITS COLLEGE OF ENGINEERING has been a beacon of
              learning since it's inception in 2002 and the college encompasses
              all the virtues of it's slogan - 'Learn, Grow, Excel'.
            </p>
            <motion.div
              className="img-box"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <LazyLoadImage src={bgi[cur]} alt="" />
            </motion.div>
          </div>
          <div className="ab-bot">
            <div className="img-box">
              <LazyLoadImage src={mob[cur]} alt="" />
            </div>
            <p>
              {" "}
              Saintgits College of Engineering presents NAKSHATRA 2023, the
              annual techno-cultural fest. It is hosted every year to recognise
              fledging engineers who have a flair of technical expertise and
              artistry. It is one of the most eminent fests with more than 4000
              entrants from across the nation. This extravaganza unfolds a
              two-day mega event that transports you into a new realm. Get
              enraptured in performances by budding engineers and artists that
              will leave you spellbound. Join in to be a part of our exquisite
              fest, NAKSHATRA 2023.
            </p>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/logos%2Fnk23logobright.png?alt=media&token=860c6239-e98e-4f5a-ace8-bdf1d57cf274"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* EVENTS */}
      <div className="home-events">
        <h1>
          Featured{" "}
          <strong>
            {" "}
            <Link to={"/events"}>Events</Link>
          </strong>
        </h1>
        <div className="flage-top">
          <img
            src={event_banner_path["NK025"]} //
            alt=""
            onClick={() => {
              navigate("/events/cultural/general");
              dispatch({
                type: "SET_REND",
                rend: "NK025",
              });
            }}
          />
          <img
            src={event_banner_path["NK034"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/dance");
              dispatch({
                type: "SET_REND",
                rend: "NK034",
              });
            }}
          />
          <img
            src={event_banner_path["NK038"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/music");
              dispatch({
                type: "SET_REND",
                rend: "NK038",
              });
            }}
          />
        </div>

        <div className="flage-bot">
          <img
            src={event_banner_path["NK033"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/general");
              dispatch({
                type: "SET_REND",
                rend: "NK033",
              });
            }}
          />
          <img
            src={event_banner_path["NK039"]}
            alt=""
            onClick={() => {
              navigate("/events/cultural/music");
              dispatch({
                type: "SET_REND",
                rend: "NK039",
              });
            }}
          />
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};
