import "./index.css";
import React, { Suspense } from "react";
// import Layout from "./containers/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import {Search as SearchIcon} from '@material-ui/icons';
import bgImage from '../../images/16.jpg';

export default function Index(props) {
  const [userName, setUserName] = React.useState();
  const [checkinDate, setCheckinDate] = React.useState('2020-08-19');
  const [checkoutDate, setCheckoutDate] = React.useState('2020-08-20');
  const [adultNumber, setAdultNumber] = React.useState(2);
  const [childNumber, setChildNumber] = React.useState(0);

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
    <React.Fragment>
      <Grid container justify="center" alignItems="center" style={{backgroundImage: `url(${bgImage})`, backgroundPosition: 'center center', backgroundSize: 'cover', height: '600px'}}>
      {/* <div class="single-welcome-slide bg-img bg-overlay" style={{backgroundImage: `url(${bgImage})`}} data-img-url="images/1.jpg"> */}
        {/* <div class="welcome-content h-100">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                    <div class="col-12">
                        <div class="welcome-text text-center">
                            <h6 data-animation="fadeInLeft" data-delay="200ms">Hotel &amp; Resort</h6>
                            <h2 data-animation="fadeInLeft" data-delay="500ms">Welcome To Booking Token</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        
      {/* </div> */}
        <Grid item xs={8}>
         <Box m={40}/>
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
                  <form noValidate>
                    <TextField
                      id="checkout"
                      type="date"
                      label="Check Out"
                      defaultValue={checkoutDate}
                      onChange={handleCheckoutDateChange}
                      variant="outlined"
                      InputLabelProps={{shrink: true}}
                    />
                  </form>
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
                  <Button href={`/hotels?in=${checkinDate}&out=${checkoutDate}&adult=${adultNumber}&child=${childNumber}`} variant="contained" color="primary">
                    <SearchIcon />Search
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
