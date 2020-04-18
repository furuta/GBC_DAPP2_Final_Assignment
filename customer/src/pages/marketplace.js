import React, { Suspense } from "react";
// import Layout from "./containers/Layout/Layout";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
// import Backdrop from "@material-ui/core/Backdrop";
// import CircularProgress from "@material-ui/core/CircularProgress";

export default function Index(props) {
  const [userName, setUserName] = React.useState();
  const { url } = useRouteMatch();

  return (
    <Grid>
      hotels
    </Grid>
  );
}
