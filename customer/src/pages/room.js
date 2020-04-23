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
  Input,
  Select,
  MenuItem,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions

} from '@material-ui/core';
import MaskedInput from 'react-text-mask';
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
  const [open, setOpen] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justify="center">
      <Grid container justify="center">
        <Grid item xs={8}>
          <Box m={5} />
          <Card>
            <CardContent>
              <Typography variant="h4">Hotel1</Typography>
              <Typography variant="h4">Room1</Typography>
            </CardContent>
            <CardMedia
              image={room1Image}
              title="Paella dish"
              style={{width: "100%", height: "400px"}}
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
              <Button
                // href={`/reservation?in=${checkinDate}&out=${checkoutDate}&adult=${adultNumber}&child=${childNumber}`}
                onClick={handleClickOpen}
                variant="contained"
                color="primary"
              >
                <DoneIcon />Reservation
              </Button>
              <PaymentDialog open={open} onClose={handleClose} url={`/reservation?in=${checkinDate}&out=${checkoutDate}&adult=${adultNumber}&child=${childNumber}`}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box m={5} />
    </Grid>
  );
}

function PaymentDialog(props) {
  const { onClose, selectedValue, open, url } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  

  return (
    <Dialog onClose={handleClose} aria-labelledby="payment-dialog-title" open={open}>
      <DialogTitle id="payment-dialog-title">Payment</DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" required={true}>
            <InputLabel htmlFor="card-number-input">Card number</InputLabel>
            <Input
              value='4242-4242-4242-4242'
              name="textmask"
              id="card-number-input"
              inputComponent={CardNumberCustom}
            />
          </FormControl>
        </DialogContent>
        <DialogContent>
          <FormControl variant="outlined" required={true}>
            <InputLabel htmlFor="year-month-input">Month/Year</InputLabel>
            <Input
              value='01/24'
              name="textmask"
              id="year-month-input"
              inputComponent={YearMonthCustom}
            />
          </FormControl>
          <FormControl variant="outlined" required={true}>
            <InputLabel htmlFor="code-input">Security code</InputLabel>
            <Input
              value='123'
              name="textmask"
              id="code-input"
            />
          </FormControl>
        </DialogContent>
        <DialogContent>
          <FormControl variant="outlined" required={true}>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <Input
              value='TOMOHIRO FURUTA'
              name="textmask"
              id="name-input"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            href={url}
            color="primary"
          >
            Pay
          </Button>
        </DialogActions>
    </Dialog>
  );
}

function CardNumberCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}


function YearMonthCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-1]/, /\d/, '/', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}