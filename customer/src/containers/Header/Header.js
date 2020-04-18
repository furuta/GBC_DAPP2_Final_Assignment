import React from "react";
import "./Header.scss";
import {Button, Grid, AppBar, Toolbar, Box, Typography} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function Header(props) {
  return (
    <Grid container alignItems="center">
      <AppBar>
        <Toolbar>
      <Grid item xs={2}>
      <div className="logo">
        <span className="logo_title">Booking Token</span>
      </div>
      </Grid>
      <Grid item xs={8}>

      <nav className="user-nav">
        <NavLink
          to="/"
          exact
          className="user-nav__item"
          activeClassName="user-nav__item-active"
          >
          <span>Search hotels</span>
        </NavLink>
        {/* <NavLink
          to="/marketplace"
          exact
          className="user-nav__item"
          activeClassName="user-nav__item-active"
          >
          <span>Resell market</span>
        </NavLink> */}
      </nav>
      </Grid>
      <Grid item xs={2}>
        {props.username === '' ?(
          <Button variant='outlined'>Sign up / Login</Button>
          ) : (
            <span style={{display: 'inherit'}}>
              <AccountCircleIcon fontSize='inherit' />{props.username}
            </span>
        )}
      </Grid>
      </Toolbar>
      </AppBar>
      <Box m={4} />
    </Grid>
  );
}

