import { useNavigate } from "react-router-dom";
import { useAppData } from "../../AppContext/AppContext";
import { useEffect, useState } from "react";
import { event_banner_path } from "../Events/eventDeets";
import "./styles/Reccomended.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";

export const Recommended = () => {
  const navigate = useNavigate();
  const [{ user }] = useAppData();

  const Events = ["NK011", "NK065", "NK054", "NK010", "NK014"];
  useEffect(() => {
    if (user.uid == null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="rec-events">
      <h3>Recommeded Events</h3>
      {Events?.map((e) => (
        <div className="rec-sub">
          <img src={event_banner_path[e]} alt="" />
        </div>
      ))}
    </div>
  );
};
