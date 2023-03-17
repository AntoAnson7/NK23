import React, { Fragment } from "react";
import "./Contact.css";
import { useState } from "react";
import { db } from "../../../Firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { FaRegAddressCard } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { motion } from "framer-motion";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const userCollec = collection(db, "messages");

  const messageUser = async () => {
    await addDoc(userCollec, {
      createdAt: new Date(),
      name: name,
      email: email,
      message: msg,
    });
  };

  return (
    <Fragment>
      <motion.section
        className="contact"
        initial={{ y: 500 }}
        animate={{ y: 0 }}
      >
        <div className="contact-heading">
          <h2> Contact Us </h2>
        </div>

        <div className="container">
          <div className="row">
            <div className="column">
              <div className="contact-widget">
                <div className="contact-widget-item">
                  <div className="icon">
                    <FaRegAddressCard
                      style={{
                        color: "white",
                        fontSize: "35px",
                        marginTop: "12px",
                      }}
                    />
                  </div>
                  <div className="text">
                    <h5>Address</h5>
                    <p>
                      Saintgits College of Engineering, Kottukulam Hills,
                      Pathamuttom P.O, Kottayam-686 532.
                    </p>
                  </div>
                </div>
                <div className="contact-widget-item">
                  <div className="icon">
                    <IoIosContact
                      style={{
                        color: "white",
                        fontSize: "35px",
                        marginTop: "12px",
                      }}
                    />
                  </div>
                  <div className="text">
                    <h5>Contact Us</h5>
                    <p>+91-8330061229</p>
                  </div>
                </div>
                <div className="contact-widget-item">
                  <div className="icon">
                    <AiOutlineMail
                      style={{
                        color: "white",
                        fontSize: "35px",
                        marginTop: "12px",
                      }}
                    />
                  </div>
                  <div className="text">
                    <h5>Mail</h5>
                    <p>nakshatra@saintgits.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="contact-form">
                <form action="#">
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <textarea
                    placeholder="Comment"
                    onChange={(event) => {
                      setMsg(event.target.value);
                    }}
                  ></textarea>
                  <button
                    type="submit"
                    className="site-btn"
                    onClick={() => {
                      messageUser();
                    }}
                  >
                    {" "}
                    Send Message{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="column-map">
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.985260128457!2d76.54917071399433!3d9.510009593188125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ed484f475a7%3A0xea66b5d0e55062ca!2sSaintgits%20College%20of%20Engineering%20(Autonomous)%2C%20Kottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1676740179090!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </Fragment>
  );
}
