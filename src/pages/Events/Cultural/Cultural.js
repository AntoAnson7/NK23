import "./Cultural.css";
import { useNavigate } from "react-router-dom";
import { subBanners } from "../eventDeets";
import { useAppData } from "../../../AppContext/AppContext";
import { useEffect } from "react";
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
      <div className="vector-cultural"></div>

      <div className="cultural-events-sub">
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
      </div>
    </div>
  );
};
