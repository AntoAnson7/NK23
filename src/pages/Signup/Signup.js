import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppData } from "../../AppContext/AppContext";
import * as yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { Footer } from "../../components/Footer";
import "./Signup.css";

export const Signup = () => {
  const [{ user }, dispatch] = useAppData();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.uid == null) {
      navigate("/");
    }
  }, []);

  const schema = yup.object().shape({
    display_name: yup.string().max(25).required(),
    email: yup.string().email().required(),
    college: yup.string().required().max(50),
    branch: yup.string().required().max(30),
    sem: yup.number().min(1).max(8).required(),
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
    });

    const newLocalUser = {
      name: data.display_name,
      email: data.email,
      sem: data.sem,
      branch: data.branch,
      college: data.college,
      uid: user.uid,
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
    <div className="signup">
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
        <p>
          Note : The display name you choose will be your name in certificates
        </p>
        <input className="sub-i" type="submit" value="Sign Up" />
      </form>
      <Footer />
    </div>
  );
};
