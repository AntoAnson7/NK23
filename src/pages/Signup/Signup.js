import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppData } from "../../AppContext/AppContext";
import * as yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { Footer } from "../../components/Footer";
import { motion } from "framer-motion";
import "./Signup.css";

export const Signup = () => {
  const [{ user, isVerified }, dispatch] = useAppData();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.uid == null) {
      navigate("/");
    } else if (user.uid != null && isVerified) {
      navigate("/dashboard");
    }
  }, [isVerified]);

  const schema = yup.object().shape({
    display_name: yup.string().required(),
    email: yup.string().email().required(),
    college: yup.string().required(),
    branch: yup.string().required(),
    sem: yup.number().min(1).max(8).required(),
    wtsp: yup.number().min(1555555555).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    await setDoc(doc(db, "users", user.uid), {
      branch: data.branch,
      college: data.college,
      email: data.email,
      uid: user.uid,
      name: data.display_name,
      sem: data.sem,
      isCA: false,
      registered: [],
      refcode: "nor",
      refcount: 0,
      NKID: `NK-${user.uid.substring(0, 4).toUpperCase()}`,
      whatsapp: data.wtsp,
    });

    const newLocalUser = {
      name: data.display_name,
      email: data.email,
      sem: data.sem,
      branch: data.branch,
      college: data.college,
      uid: user.uid,
      whatsapp: data.wtsp,
    };

    dispatch({
      type: "SET_NEW_LOCAL_USER",
      userLocal: newLocalUser,
    });

    dispatch({
      type: "SET_VERIFICATION",
      status: true,
    });

    navigate("/");
  };

  return (
    <motion.div
      className="signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form className="signup-form" onSubmit={handleSubmit(formSubmit)}>
        <input
          className="i1"
          type="text"
          placeholder="Display name"
          {...register("display_name")}
        />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          {...register("email")}
        />
        <input
          type="text"
          placeholder="College name"
          {...register("college")}
        />
        <input type="text" placeholder="Branch" {...register("branch")} />
        <input type="number" placeholder="Semester" {...register("sem")} />
        <input
          type="number"
          placeholder="Whatsapp number"
          {...register("wtsp")}
        />
        <p>
          Note : The display name you choose will be your name in certificates
        </p>
        <p>Registrations for events are only for Engineering students</p>
        <input className="sub-i" type="submit" value="Sign Up" />
      </form>
      <Footer />
    </motion.div>
  );
};
