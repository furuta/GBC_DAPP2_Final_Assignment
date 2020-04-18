import React, { Suspense } from "react";
// import Layout from "./containers/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
// import Backdrop from "@material-ui/core/Backdrop";
// import CircularProgress from "@material-ui/core/CircularProgress";

export default function Index(props) {
  const [userName, setUserName] = React.useState();

  return (
    <Grid container>
      <Box m={3} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
          <Grid key='customer' item>
            <Button href='file:///Users/furutatomohiro/Documents/Program/GBC/DAPP2/roberto/index.html' target="_blank" variant='outlined'>For customer</Button>
          </Grid>
          <Grid key='hotel' item>
            <Button href="admin" variant='outlined'>For hotel</Button>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
