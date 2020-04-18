import React from "react";
import { useLocation } from "react-router-dom";
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
  Typography,
  Link
} from '@material-ui/core';
import {Search as SearchIcon, Place as PlaceIcon} from '@material-ui/icons';
import hotel1Image from '../images/39.jpg';
import hotel2Image from '../images/5.jpg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Hotels(props) {
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
    <Grid container justify="center" style={{padding: "20px"}}>
      <Grid item xs={8}>
        <Box m={5} />
        <Card variant="outlined">
            <CardContent>
              <Grid container alignItems="center" spacing={2} direction="row">
                <Grid item>
                  <form noValidate>
                    <TextField
                      id="checkin"
                      type="date"
                      label="Check In"
                      defaultValue={checkinDate}
                      onChange={handleCheckinDateChange}
                      variant="outlined"
                      InputLabelProps={{shrink: true}}
                    />
                  </form>
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
                <Grid item>
                  <FormControl variant="outlined">
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
                <Grid item>
                  <Button href="/hotels" variant="contained" color="primary">
                    <SearchIcon />Search
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        <Box m={5} />
        <Card style={{display: "flex"}}>
          <CardMedia
            image={hotel1Image}
            title="Paella dish"
            style={{width: "500px"}}
          />
          <Grid item xs={4}>
          <CardContent>
            <Typography variant="subtitle1">Hotel type</Typography>
            <Typography variant="h5">Hotel name one</Typography>
            <Typography variant="subtitle2"><PlaceIcon fontSize="small"/>Canada > Ontario > Toronto</Typography>
            <Typography variant="body1">discription discription discription discription discription discription discription discription discription discription discription discription discription discription discription</Typography>
            <Box m={5} />
            <Link href={`/hotels/1?in=${checkinDate}&out=${checkoutDate}&adult=${adultNumber}&child=${childNumber}`}>
              <Button variant="contained" color="primary">View Rooms</Button>
            </Link>
          </CardContent>
          </Grid>
        </Card>
        <Box m={2} />
        <Card style={{display: "flex"}}>
          <CardMedia
            image={hotel2Image}
            title="Paella dish"
            style={{width: "500px"}}
          />
          <Grid item xs={4}>
          <CardContent>
            <Typography variant="subtitle1">Hotel type</Typography>
            <Typography variant="h5">Hotel name two</Typography>
            <Typography variant="subtitle2"><PlaceIcon fontSize="small"/>Canada > Ontario > Toronto</Typography>
            <Typography variant="body1">discription discription discription discription discription discription discription discription discription discription discription discription discription discription discription</Typography>
            <Box m={5} />
            <Link href={`/hotels/1?in=${checkinDate}&out=${checkoutDate}&adult=${adultNumber}&child=${childNumber}`}>
              <Button variant="contained" color="primary">View Rooms</Button>
            </Link>
          </CardContent>
          </Grid>
        </Card>
        
      </Grid>
    </Grid>
  );
}
