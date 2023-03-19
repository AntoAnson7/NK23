import React from "react";
import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import Events from "../pages/Events/Events";

import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Signup } from "../pages/Signup/Signup";
import { Cultural } from "../pages/Events/Cultural/Cultural";
import { Technical } from "../pages/Events/Technical/Technical";

import { Art } from "../pages/Events/Cultural/Art/Art";
import { Board } from "../pages/Events/Cultural/Board/Board";
import { Cookery } from "../pages/Events/Cultural/Cookery/Cookery";
import { Dance } from "../pages/Events/Cultural/Dance/Dance";
import { Gaming } from "../pages/Events/Cultural/Gaming/Gaming";
import { General } from "../pages/Events/Cultural/General/General";
import { Movie } from "../pages/Events/Cultural/Movie/Movie";
import { Music } from "../pages/Events/Cultural/Music/Music";
import { Photography } from "../pages/Events/Cultural/Photography/Photography";
import { Quiz } from "../pages/Events/Cultural/Quiz/Quiz";
import { Sports } from "../pages/Events/Cultural/Sports/Sports";
import { Registration } from "./Registration";

import { Contact } from "../components/FooterElements/Contact/Contact";
import { Privacy } from "./FooterElements/Privacy/Privacy";
import { Terms } from "../components/FooterElements/Terms/Terms";
import { Refund } from "./FooterElements/Refund/Refund";
import { EditProfile } from "./EditProfile";
import Credits from "./Credits";
import { AnimatePresence } from "framer-motion"; //framer-motion/dist/framer-motion

export function RouterPaths() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events/cultural" element={<Cultural />} />
        <Route path="/events/technical" element={<Technical />} />

        <Route path="/events/cultural/art" element={<Art />} />
        <Route path="/events/cultural/board-games" element={<Board />} />
        <Route path="/events/cultural/cookery" element={<Cookery />} />
        <Route path="/events/cultural/dance" element={<Dance />} />
        <Route path="/events/cultural/gaming" element={<Gaming />} />
        <Route path="/events/cultural/general" element={<General />} />
        <Route path="/events/cultural/movie-anime" element={<Movie />} />
        <Route path="/events/cultural/music" element={<Music />} />
        <Route path="/events/cultural/photography" element={<Photography />} />
        <Route path="/events/cultural/quiz" element={<Quiz />} />
        <Route path="/events/cultural/sports" element={<Sports />} />

        <Route path="/events/registration" element={<Registration />} />

        <Route path="/contact-us" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refunds" element={<Refund />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/dashboard/edit-profile" element={<EditProfile />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </AnimatePresence>
  );
}
