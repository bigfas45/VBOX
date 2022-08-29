import React from "react";
import logoImg from "../../assets/logo_new.png";
import { Link } from "react-router-dom";
import { Button } from "antd";

import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import "./styles/Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-wrapper">
          <div className="brand-col">
            <div className="brand-wrapper">
              <img src={logoImg} alt="logo" />
            </div>
            <p className="copy-text">
              Copyrights By <strong>VBOX </strong>
            </p>
            <div className="social-icon ">
              <a href="/">
                <FaFacebookF className="sc-icon facebook" />{" "}
              </a>
              <a href="/">
                <FaTwitter className="sc-icon" />
              </a>
              <a href="/">
                <FaLinkedinIn className="sc-icon" />
              </a>
            </div>
          </div>
          <div className="links-col">
            <h3 className="title">Quick Links</h3>
            <ul className="link-list">
              <li>
                <Link className="links">Top Movies</Link>
              </li>
              <li>
                <Link className="links">Top Producers</Link>
              </li>
              <li>
                <Link className="links">News</Link>
              </li>
              <li>
                <Link className="links">About</Link>
              </li>
              <li>
                <Link className="links">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="newsletter-col">
            <h3 className="title">NEWSLETTER</h3>
            <div className="newsletter-form">
              <input className="nl-input" placeholder="Newsletter sign up" />
              <Button className="nl-btn">SIGN UP</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
