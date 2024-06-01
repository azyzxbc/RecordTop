import React, { Component } from "react";
import History from "./history";
import Dashboard from "./dashboard";
import logo from "./../logo.svg";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { MdSensors, MdHistory, MdOutlineDashboard } from "react-icons/md";
import Capteurs from "./capteurs";
function menuClick() {
  const elementContent = document.querySelector(".content");
  const element = document.querySelector(".sidebar");
  if (element.classList.contains("activeSideBar")) {
    element.classList.remove("activeSideBar");
    elementContent.classList.remove("contentFull");
  } else {
    element.classList.add("activeSideBar");
    elementContent.classList.add("contentFull");
  }
}
export default class Template extends Component {
  render() {
    const content = () => {
      switch (this.props.data) {
        case "dashboard":
          return <Dashboard />;
        case "capteurs":
          return <Capteurs />;
        case "historique":
          return <History />;

        default:
          return <h1>No project match</h1>;
      }
    };
    return (
      <div className="template">
        <div className="sidebar">
          <div className="logoTemplate">
            <img src={logo} alt="" />
          </div>
          <div className="items">
            <ul>
              <li
                className={
                  window.location.pathname.split("/")[1] === ""
                    ? "item active"
                    : "item"
                }
              >
                <Link
                  to="/"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <p>
                    <span className="iconSidarMenu">
                      <MdOutlineDashboard />
                    </span>
                    Dashboard
                  </p>
                </Link>
              </li>
              <li
                className={
                  window.location.pathname.split("/")[1] === "capteurs"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/capteurs">
                  <p>
                    <span className="iconSidarMenu">
                      <MdSensors />
                    </span>
                    capteurs
                  </p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[1] === "historique"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/historique">
                  <p>
                    <span className="iconSidarMenu">
                      <MdHistory />
                    </span>
                    historique
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <div className="navbarTemplate">
            <div className="iconMenu" onClick={menuClick}>
              <HiMenu />
            </div>
          </div>
          <div className="ContentTemplate">{content()}</div>
        </div>
      </div>
    );
  }
}
