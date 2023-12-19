import { Link } from "react-router-dom";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <h2 className="footer__brand">hacker news</h2>
      <ul>
        <li>
          <Link to={"/about"}>About hacker news</Link>
        </li>
      </ul>
    </div>
  );
};
