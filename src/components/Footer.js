import React from 'react';
import {Route,Link } from 'react-router-dom';
import "./Footer.css"

export function Footer() {
  return (
    <div>
    <footer className="footer" >
    <div>
      <p>Saintgits College of Engineering</p>
      <p>Kottukulam Hills, Pathamuttam P. O, Kerala 686532</p>
    </div>
    <ul className="list">
        
        <li>
            <a href="#about">About Us</a>
        </li>
        <li>
            <Link to="/refunds" className="anc">Refund policy</Link>
        </li>
    
        <li>
            <Link to="/privacy-policy" className="anc"> Privacy policy</Link>
        </li>
        <li>
            <Link to="/terms"  className="anc">Terms of service</Link>
        </li>
        <li>
        
            <Link to="/contact-us" className="anc" >Contact us</Link>
           
        </li>
    </ul>
      
     <p>
    <p>Powered by</p> <Link to="/developers" className="copy">NK23 Website Team</Link>
     </p>
 
  </footer>
    </div>
  )
}

