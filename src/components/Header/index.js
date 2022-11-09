import React, { useState } from "react";
import { Link } from "react-router-dom";
import Gravatar from "../Gravatar";

import { ExpandMore } from '@material-ui/icons';

import './styles.css';
import Ellipsis from "../Ellipsis";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { getUserInfo } from "../../services/auth";
import { logout } from "../../services/api";


export default function Header() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const loggedUser = getUserInfo();

  return (
    <header className="flex-row flex-axis-center flex-space-between padding-sides-small border-bottom height-header">
      <Link to="/home"><span className="color-tertiary bold size-xlarge">ZWallet</span></Link>

      <nav className="flex-row flex-axis-center">
        <Link to="/orders" className="margin-right-small" >
          <button className="button1">Ordens</button>
        </Link>
        <ClickAwayListener onClickAway={() => setOpenUserMenu(false)}>
          <div>
            <button className="flex-row flex-axis-center" onClick={() => setOpenUserMenu(!openUserMenu)}><ExpandMore /></button>
            {
              openUserMenu ? (
                <div className="absolute align-right z-max content-box shadow flex-column flex-axis-center padding-large background0">
                  <div className="margin-top-small"><Gravatar link={loggedUser.gravatar} rounded={true} /></div>
                  <div className="margin-top-small"><Ellipsis n_lines={1}><span className="size-large">{loggedUser.name}</span></Ellipsis></div>
                  <button onClick={logout} className="margin-vertical-medium padding-small">Logout</button>
                </div>
              ) : (null)
            }
          </div>
        </ClickAwayListener>
      </nav>

    </header>
  )
}