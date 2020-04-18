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
  Link,
  makeStyles
} from '@material-ui/core';
import {Place as PlaceIcon, CompareArrows} from '@material-ui/icons';
import hotel1Image from '../images/39.jpg';
import room1Image from '../images/9.jpg';
import room2Image from '../images/28.jpg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    marginLeft: '350px',
    verticalAlign: 'middle',
    display: 'flex',
    borderRadius: '5px',
    padding: '5px',
    color: 'orange',
    border: 'solid 1px orange'
  },
}));

export default function Hotel(props) {
  const query = useQuery();
  const [userName, setUserName] = React.useState();
  const [checkinDate, setCheckinDate] = React.useState(query.get("in"));
  const [checkoutDate, setCheckoutDate] = React.useState(query.get("out"));
  const [adultNumber, setAdultNumber] = React.useState(query.get("adult"));
  const [childNumber, setChildNumber] = React.useState(query.get("child"));
  const { url } = useRouteMatch();
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <Box m={5} />
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Hotel type</Typography>
            <Typography variant="h4">Hotel name one</Typography>
            <Typography variant="subtitle2"><PlaceIcon fontSize="small"/>Canada > Ontario > Toronto</Typography>
          </CardContent>
          <CardMedia
            // className={classes.media}
            image={hotel1Image}
            title="Paella dish"
            style={{width: "100%", height: "500px"}}
          />
          <CardContent>
            <Box m={3} />
            <Typography gutterBottom variant="h5">
              Overview
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            discription discription discription discription discription discription discription discription discription discription discription discription discription discription discription
            </Typography>
            <Box m={4} />
            <Typography gutterBottom variant="h5">
              Rooms
            </Typography>
            <Card style={{display: "flex"}}>
              <CardMedia
                image={room1Image}
                style={{width: "300px"}}
              />
              <Grid item xs={4}>
                <CardContent>
                  <Typography variant="h5">Room1</Typography>
                  <Typography variant="subtitle2">Amenities: towel, dryer</Typography>
                  <Typography variant="body1">discription discription discription discription discription discription discription discription discription discription discription discription discription discription discription</Typography>
                  <Box m={2} />
                  <Typography variant="h6">CDN$ 1,000.00</Typography>
                  <Box m={4} />
                  <Link href={`${url}/rooms/1?in=${checkinDate}&out=${checkoutDate}&adult=${adultNumber}&child=${childNumber}`}>
                    <Button variant="contained" color="primary">View Details</Button>
                  </Link>
                </CardContent>
              </Grid>
            </Card>
            <Box m={1} />
            <Card style={{display: "flex"}}>
              <CardMedia
                image={room2Image}
                style={{width: "300px"}}
              />
              <Grid item xs={4}>
                <CardContent>
                  <div className={classes.root}><CompareArrows /><span>Marcket Place</span></div>
                  <Typography variant="h5">Room2</Typography>
                  <Typography variant="subtitle2">Amenities: towel, dryer</Typography>
                  <Typography variant="body1">discription discription discription discription discription discription discription discription discription discription discription discription discription discription discription</Typography>
                  <Box m={2} />
                  <Typography variant="h6">4.11 ETH</Typography>
                  <Box m={4} />
                  <Link href={`${url}/rooms/2?in=${checkinDate}&out=${checkoutDate}&adult=${adultNumber}&child=${childNumber}`}>
                    <Button variant="contained" color="primary">View Details</Button>
                  </Link>
                </CardContent>
              </Grid>
            </Card>
            <Box m={5} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}




