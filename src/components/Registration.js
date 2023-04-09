import React, { useEffect, useState } from "react";
import { useAppData } from "../AppContext/AppContext";
import { displayRazorpay } from "../Razorpay/Razorpay";
import { useNavigate, his } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Footer } from "../components/Footer";
import "./styles/Registration.css";

export function Registration() {
  const navigate = useNavigate();
  const [{ user, RegEvent: e, code }] = useAppData();
  const [val, setVal] = useState([]);
  const [err, setErr] = useState("nil");

  const handleAdd = () => {
    setVal([...val, []]);
  };

  const handleChange = (cval, i) => {
    const teamdata = [...val];
    teamdata[i] = cval.target.value;
    setVal(teamdata);
  };

  const handleDel = (i) => {
    const delVal = [...val];
    delVal.splice(i, 1);
    setVal(delVal);
  };

  const schema = yup.object().shape({
    ref: yup.string(),
    num: yup
      .number("must be a number")
      .min(1000000000, "Invalid whatsapp number")
      .required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (e == null) {
      navigate("/events");
    }
  }, []);

  const proceedtoPay = (data) => {
    if (data.terms === true) {
      if (e.isTeam === true) {
        if (val.length < e.min) {
          console.log(`Atleast ${e.min} team members required`);
          setErr("less");
        } else if (val.length > e.max) {
          console.log(`Cant have more than ${e.max} team members`);
          setErr("more");
        } else {
          let ctr = 0;
          val.map((v) => {
            if (v != "") {
              ctr++;
            }
          });
          if (ctr >= e.min && ctr <= e.max) {
            const token = {
              uid: user.uid,
              username: user.displayName,
              amount: e.regfee,
              eventid: e.eventid,
              eventname: e.name,
              ref: data.ref == null || data.ref == code ? "nor" : data.ref,
              whatsapp: data.num,
              team: val.toString(),
            };
            displayRazorpay(token);
          } else {
            setErr("empty");
          }
        }
      } else {
        const token = {
          uid: user.uid,
          username: user.displayName,
          amount: e.regfee,
          eventid: e.eventid,
          eventname: e.name,
          ref: data.ref == null ? "nor" : data.ref,
          whatsapp: data.num,
          team: "individual",
        };

        displayRazorpay(token);
      }
    } else {
      alert("Please read and accept the payment terms and conditions!");
    }
  };

  return (
    <div className="reg">
      <button className="back" onClick={() => navigate("/events")}>
        <IoArrowBack />
      </button>

      <div className="lr">
        <form className="form" onSubmit={handleSubmit(proceedtoPay)}>
          <h1>
            Only Engineering students can Register(Students of saintgits can't
            register for Nakshatra)<strong> *</strong>
          </h1>
          <input className="i1" type="text" value={e?.name} />
          <input type="text" value={e?.eventid} />
          <input
            type="text"
            placeholder="Do you have a referral code?"
            {...register("ref")}
          />
          <input
            type="number"
            placeholder="Whatsapp Number"
            {...register("num")}
          />

          {errors.num ? <p className="err-msg">{errors.num.message}</p> : <></>}
          {/* <p className="bank-error">
            There might be some issues with the payment server, if your
            registration fails please try again after 9:00 AM 29/03/2023
          </p> */}
          <ul className="pay-alerts">
            <li>Alert: Please do not refresh the page after you hit pay</li>
            <li>
              You will have to submit your college ID card of a valid
              engineering college on request
            </li>
            <li>
              There wont be any refunds after you have paid the registration fee
            </li>
            <li>You will be charged extra 2% as payment gateway charges</li>
            <li>
              Wait for the payment window to close automatically after the
              payment is done
            </li>
            <div className="tandc">
              <li>I have read and accepted all the terms & conditions</li>
              <input
                className="tccheck"
                type="checkbox"
                {...register("terms")}
              />
            </div>
          </ul>

          <input className="i-sub" type="submit" value={`Pay ₹${e?.regfee}`} />
        </form>

        {e?.isTeam ? (
          <div className="teamGet">
            <h3>Team Members</h3>
            <p className="note">{`You can have ${e?.min} to ${e?.max} team members for this Event`}</p>
            <h4 style={{ color: "white", marginBottom: "20px" }}>
              Add Members one by one using the add button
            </h4>
            <button
              className="add"
              onClick={handleAdd}
              style={{ width: "100px" }}
            >
              Add +
            </button>
            {val.map((data, i) => {
              return (
                <div className="team-in">
                  <input
                    value={data}
                    type="text"
                    placeholder="Team member name"
                    onChange={(e) => handleChange(e, i)}
                  />
                  <button onClick={() => handleDel(i)}>X</button>
                </div>
              );
            })}
            {err == "less" ? (
              <p className="err-msg">{`Atleast ${e.min} team members required`}</p>
            ) : (
              <></>
            )}
            {err == "more" ? (
              <p className="err-msg">{`Cant have more than ${e.max} team members`}</p>
            ) : (
              <></>
            )}
            {err == "empty" ? (
              <p className="err-msg">{`Team member names cant be empty`}</p>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </div>
  );
}
