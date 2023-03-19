import { useNavigate } from "react-router-dom";
import { useAppData } from "../../../AppContext/AppContext";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import "./Cultural.css";

export const Cultural = () => {
  const navigate = useNavigate();

  const [{}, dispatch] = useAppData();

  useEffect(() => {
    dispatch({
      type: "SET_REND",
      rend: "",
    });
  }, []);

  return (
    <div className="cultural-events-main">
      <motion.div
        initial={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
        animate={{ scale: 1 }}
        className="vector-cultural"
      ></motion.div>

      <motion.div
        className="cultural-events-sub"
        initial={{ y: -50, scale: 0.8 }}
        animate={{ y: 0, scale: 1 }}
      >
        <div className="cultural-event-card-2">
          <button onClick={() => navigate("/events/cultural/general")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fgeneral.png?alt=media&token=2822b4b8-f822-451f-8c65-78096ecce897"
              alt="General"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="dance">
          <button onClick={() => navigate("/events/cultural/dance")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fdance.png?alt=media&token=d62c0ab9-05cf-4aa8-b91f-08f60275fc20"
              alt="Dance"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="music">
          <button onClick={() => navigate("/events/cultural/music")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fmusic.png?alt=media&token=c3599b24-6a9c-4bb9-b6f0-94b5b48c26fe"
              alt="Music"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="photography">
          <button onClick={() => navigate("/events/cultural/photography")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fphtotography.png?alt=media&token=460d0af2-36a7-4f23-a62b-47e480b20c12"
              alt="Photography"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="board">
          <button onClick={() => navigate("/events/cultural/board-games")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fboard.png?alt=media&token=1e8d191a-8bf4-4791-bc96-f2625c032431"
              alt="Board Games"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="sports">
          <button onClick={() => navigate("/events/cultural/sports")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fsports.png?alt=media&token=4a09a99c-3e6b-4a47-9e2c-82703527a304"
              alt="Sports"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="gaming">
          <button onClick={() => navigate("/events/cultural/gaming")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fgaming.png?alt=media&token=2b445df2-999a-4440-bcb3-cb6500c9f63e"
              alt="Gaming"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="art">
          <button onClick={() => navigate("/events/cultural/art")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fart.png?alt=media&token=5543abc3-f8ce-4dcf-8ff0-28226fe8b934"
              alt="Art"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="cookery">
          <button onClick={() => navigate("/events/cultural/cookery")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fcookery.png?alt=media&token=f12edd17-4454-47e3-ad7d-554a93dbad98"
              alt="Cookery"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="movie">
          <button onClick={() => navigate("/events/cultural/movie-anime")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fmovie.png?alt=media&token=06dec60f-f093-4aae-bbdc-076f78fc9605"
              alt="Movies/Anime"
            />
          </button>
        </div>

        <div className="cultural-event-card" id="quiz">
          <button onClick={() => navigate("/events/cultural/quiz")}>
            <LazyLoadImage
              effect="blur"
              src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2FSubbanner%2FCultural%2Fquiz.png?alt=media&token=a4b61540-1f8a-4ac8-bd60-8051db43a331"
              alt="Quiz"
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
