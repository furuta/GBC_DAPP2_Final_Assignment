import React from "react";
import { useLocation, useRouteMatch, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import room1Image from '../images/9.jpg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Room(props) {
  const query = useQuery();
  const [userName, setUserName] = React.useState();
  const [checkinDate, setCheckinDate] = React.useState(query.get("in"));
  const [checkoutDate, setCheckoutDate] = React.useState(query.get("out"));
  const [adultNumber, setAdultNumber] = React.useState(query.get("adult"));
  const [childNumber, setChildNumber] = React.useState(query.get("child"));

  const handleCheckinDateChange = (event) => {
    setCheckinDate(event.target.value);
  };
  const handleCheckoutDateChange = (event) => {
    setCheckoutDate(event.target.value);
  };
  const handleAdultNumberChange = (event) => {
    setAdultNumber(event.target.value);
  };
  const handleChildNumberChange = (event) => {
    setChildNumber(event.target.value);
  };

  return (
    <Grid container justify="center">
      <Grid container justify="center">
        <Grid item xs={8}>
          <Box m={5} />
          <Card>
            <CardContent>
              <Typography variant="h4">Room1</Typography>
            </CardContent>
            <CardMedia
              image={room1Image}
              title="Paella dish"
              style={{width: "100%", height: "500px"}}
            />
          </Card>
        </Grid>
      </Grid>
      <Box m={2} />
      <Grid container justify="center" spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Box m={3} />
              <Typography gutterBottom variant="h5">
                Overview
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              discription discription discription discription discription discription discription discription discription discription discription discription discription discription discription
              </Typography>
              <Box m={4} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2} direction="row">
            <Grid item>
              <TextField
                id="checkin"
                type="date"
                label="Check In"
                defaultValue={checkinDate}
                onChange={handleCheckinDateChange}
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item>
              <TextField
                id="checkout"
                type="date"
                label="Check Out"
                defaultValue={checkoutDate}
                onChange={handleCheckoutDateChange}
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item>
              <FormControl variant="outlined" InputLabelProps={{shrink: true}}>
                <InputLabel id="adult-select-label">Adults</InputLabel>
                <Select
                  labelId="adult-select-label"
                  id="adult-select"
                  value={adultNumber}
                  onChange={handleAdultNumberChange}
                  label="Adult"
                  style={{width: '100px'}}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined">
                <InputLabel id="children-select-label">Children</InputLabel>
                <Select
                  labelId="children-select-label"
                  id="children-select"
                  value={childNumber}
                  onChange={handleChildNumberChange}
                  label="Children"
                  style={{width: '100px'}}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box m={3} />
          <Grid container>
            <Grid item>
              <Typography variant="h6">CDN$ 1,000.00</Typography>
            </Grid>
          </Grid>
          <Box m={3} />
          <Grid container alignItems="center">
            <Grid item>
              <Button href={`/reservation?in=${checkinDate}&out=${checkoutDate}&adult=${adultNumber}&child=${childNumber}`} variant="contained" color="primary">
                <DoneIcon />Reservation
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box m={5} />
    </Grid>
  );
}
