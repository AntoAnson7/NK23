import { useNavigate } from "react-router-dom";
import { useAppData } from "../../../AppContext/AppContext";
import { useEffect } from "react";
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
            General
          </button>
        </div>

        <div className="cultural-event-card" id="dance">
          <button onClick={() => navigate("/events/cultural/dance")}>
            Dance
          </button>
        </div>

        <div className="cultural-event-card" id="music">
          <button onClick={() => navigate("/events/cultural/music")}>
            Music
          </button>
        </div>

        <div className="cultural-event-card" id="photography">
          <button onClick={() => navigate("/events/cultural/photography")}>
            Photography
          </button>
        </div>

        <div className="cultural-event-card" id="board">
          <button onClick={() => navigate("/events/cultural/board-games")}>
            Board Games
          </button>
        </div>

        <div className="cultural-event-card" id="sports">
          <button onClick={() => navigate("/events/cultural/sports")}>
            Sports
          </button>
        </div>

        <div className="cultural-event-card" id="gaming">
          <button onClick={() => navigate("/events/cultural/gaming")}>
            Gaming
          </button>
        </div>

        <div className="cultural-event-card" id="art">
          <button onClick={() => navigate("/events/cultural/art")}>Art</button>
        </div>

        <div className="cultural-event-card" id="cookery">
          <button onClick={() => navigate("/events/cultural/cookery")}>
            Cookery
          </button>
        </div>

        <div className="cultural-event-card" id="movie">
          <button onClick={() => navigate("/events/cultural/movie-anime")}>
            Movie/Anime
          </button>
        </div>

        <div className="cultural-event-card" id="quiz">
          <button onClick={() => navigate("/events/cultural/quiz")}>
            Quiz
          </button>
        </div>
      </motion.div>
    </div>
  );
};
