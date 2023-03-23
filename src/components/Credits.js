import React from "react";
import "./Credits.css";
import { BsInstagram } from "react-icons/bs";

function Credits() {
  return (
    <div className="credits">
      <div className="c-box">
        <div className="box">
          <div>
            <a href="https://www.instagram.com/joel.kjames/" target="_blank">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fimg.jpg?alt=media&token=49e24253-8c52-4302-9079-7a1a4947c80a"
                alt=""
              />
              <div className="insta">
                <BsInstagram className="insta-icon" color="white" />
              </div>
            </a>
          </div>
          <p>Joel K James</p>
          <p>S6 CSE</p>
        </div>

        <div className="box">
          <div>
            <a href="https://www.instagram.com/anto__anson/" target="_blank">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fme1.jpeg?alt=media&token=8f81ac0f-74ab-4c44-8e2e-447a1e6832b7"
                alt=""
              />
              <div className="insta">
                <BsInstagram className="insta-icon" color="white" />
              </div>
            </a>
          </div>
          <p>Antony Anson</p>
          <p>S6 CSE</p>
        </div>

        <div className="box">
          <div>
            <a
              href="https://www.instagram.com/whensheepsgocrazy/"
              target="_blank"
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/temp%2Fimg1.jpg?alt=media&token=55bda210-551a-438c-8919-d1a3d8de04e5"
                alt=""
              />
              <div className="insta">
                <BsInstagram className="insta-icon" color="white" />
              </div>
            </a>
          </div>
          <p>C Jacob Thomas</p>
          <p>S6 CSE</p>
        </div>
      </div>
    </div>
  );
}

export default Credits;
