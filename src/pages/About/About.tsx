import React from "react";
import "./About.scss";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="about">
      <h1 className="about__heading">About hacker news</h1>
      <div className="about__description">
        <p>
          Here at hacker news, we bring you the list of sites where hacking
          events takes place around the world
        </p>
      </div>
      <Link to={"/"} className="btn">
        Get started{" "}
      </Link>
    </div>
  );
};
