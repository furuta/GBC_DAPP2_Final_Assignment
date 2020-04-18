import React, { Suspense } from "react";
import { useLocation, useRouteMatch, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Button,
  Typography,
  Link
} from '@material-ui/core';
import {Place as PlaceIcon} from '@material-ui/icons';
import hotel1Image from '../images/39.jpg';
import room1Image from '../images/9.jpg';
import room2Image from '../images/28.jpg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Hotel(props) {
  const query = useQuery();
  const [userName, setUserName] = React.useState();
  const checkinDate = query.get("in");
  const checkoutDate = query.get("out");
  const adultNumber = query.get("adult");
  const childNumber = query.get("child");

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <Box m={5} />
        <Card>
          <CardMedia
            // className={classes.media}
            image={hotel1Image}
            title="Paella dish"
            style={{width: "100%", height: "300px"}}
          />
          <CardContent>
            <Typography variant="h3">Reservation completed</Typography>
            <Box m={5} />
            <Typography variant="subtitle1">Hotel type</Typography>
            <Typography variant="h5">Hotel name one</Typography>
            <Typography variant="subtitle2"><PlaceIcon fontSize="small"/>Canada > Ontario > Toronto</Typography>
            <Box m={3} />
            <Typography variant="h5">Room1</Typography>
            <Typography variant="subtitle2">Amenities: towel, dryer</Typography>
            <Typography variant="body1">discription discription discription discription discription discription discription discription discription discription discription discription discription discription discription</Typography>
            <Box m={3} />
            <Typography variant="body1">Check In: {checkinDate}</Typography>
            <Typography variant="body1">Check Out: {checkinDate}</Typography>
            <Typography variant="body1">Adult: {adultNumber}</Typography>
            <Typography variant="body1">Child: {childNumber}</Typography>
            <Box m={3} />
            <Typography variant="h6">CDN$ 1,000.00</Typography>
            <Box m={5} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
