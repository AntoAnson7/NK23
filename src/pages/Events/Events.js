import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppData } from "../../AppContext/AppContext";
import { useEffect } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Events.css";

const Events = () => {
  const navigate = useNavigate();
  const [{}, dispatch] = useAppData();

  useEffect(() => {
    dispatch({
      type: "SET_REND",
      rend: "",
    });
  }, []);
  return (
    <motion.div className="events-main">
      <motion.div
        className="events-left"
        initial={{ x: 250 }}
        animate={{ x: 0 }}
      >
        <img
          effect="blur"
          onClick={() => navigate("/events/cultural")}
          className="banner"
          src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/culturalBanner.png?alt=media&token=5e6a3612-a6af-4cff-acd3-2e7811419fea"
          alt=""
        />
        <img
          className="title"
          src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/3.png?alt=media&token=654afab1-cebf-447b-8e02-77970a3bf32f"
          alt=""
        />
      </motion.div>
      <motion.div
        className="events-right"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
      >
        <img
          effect="blur"
          onClick={() => navigate("/events/technical")}
          className="banner"
          src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/technicalBanner.png?alt=media&token=b3d2e76c-cfc0-4856-b8bf-25213fccf44c"
          alt=""
        />
        <img
          className="title-r"
          src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/2.png?alt=media&token=058e37a8-2b9d-4354-81f1-7c1b46fbda0e"
          alt=""
        />
      </motion.div>
    </motion.div>
  );
};

export default Events;
