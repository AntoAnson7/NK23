import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppData } from "../AppContext/AppContext";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import { IoArrowBack } from "react-icons/io5";
import { Footer } from "./Footer";
import "./styles/EditProfile.css";

export function EditProfile() {
  const navigate = useNavigate();
  const [{ user }] = useAppData();
  const [tempUser, settempUser] = useState([]);

  const getUser = async () => {
    const res = await getDoc(doc(db, "users", user.uid));
    settempUser(res.data());
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getUser();
  }, []);

  const formSubmit = async (data) => {
    await updateDoc(doc(db, "users", user.uid), {
      name: data.display_name == "" ? tempUser.display_name : data.display_name,
      college: data.college == "" ? tempUser.college : data.college,
      branch: data.branch == "" ? tempUser.branch : data.branch,
      sem: data.sem == "" ? tempUser.sem : data.sem,
      whatsapp: data.wtsp == "" ? tempUser.whatsapp : data.wtsp,
    });
    navigate("/dashboard");
  };

  return (
    <div className="signup">
      <button className="back" onClick={() => navigate("/dashboard")}>
        <IoArrowBack />
      </button>
      <form className="signup-form" onSubmit={handleSubmit(formSubmit)}>
        <input
          className="i1"
          type="text"
          placeholder="Display name"
          defaultValue={tempUser.name}
          {...register("display_name")}
        />

        <input
          type="text"
          placeholder="Email"
          value={tempUser.email}
          {...register("email")}
        />
        <input
          type="text"
          placeholder="College name"
          defaultValue={tempUser.college}
          {...register("college")}
        />
        <input
          type="text"
          placeholder="Branch"
          defaultValue={tempUser.branch}
          {...register("branch")}
        />
        <input
          type="number"
          placeholder="Semester"
          defaultValue={tempUser.sem}
          {...register("sem")}
        />
        <input
          defaultValue={tempUser.whatsapp}
          type="number"
          placeholder="Whatsapp number"
          {...register("wtsp")}
        />
        <p style={{ margin: "0" }}>Changes will reflect next time you login</p>
        <p>
          Note : The display name you choose will be your name in certificates
        </p>

        <input className="sub-i" type="submit" value="Update profile" />
      </form>
      <Footer />
    </div>
  );
}
