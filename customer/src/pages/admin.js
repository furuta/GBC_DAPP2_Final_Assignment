import React, { Suspense } from "react";
// import Layout from "./containers/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
// import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import {AddCircleOutline, DateRange} from '@material-ui/icons';
// import Backdrop from "@material-ui/core/Backdrop";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import endOfWeek from 'date-fns/endOfWeek'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'

export default function Index(props) {
  const [roomList, setRoomList] = React.useState([]);

  React.useEffect(() => {
    setRoomList([{name: 'room1', id:1}, {name: 'room2', id:2}])
  }, [])

  return (
    <Grid>
      
      {/* <Rooms roomList={roomList} /> */}
      {/* <Calendar roomId={1} /> */}
      <Room roomId={1} />
      
    </Grid>
  );
}

function Rooms({ roomList }) {
  const clickAddButton = () => {

  }

  const clickCalendar = id => {

  }

  return (
    <Grid>
      <Button onClick={clickAddButton} variant='outlined'>
        <AddCircleOutline />New room
      </Button>
      {roomList.map(room => (
        <Paper>{room.name}<Button onClick={clickCalendar(room.id)} variant='outlined'><DateRange /></Button></Paper>
      ))}
    </Grid>
  );
}

const getCalendarArray = date => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  }, {weekStartsOn:1})
  return sundays.map(sunday =>
    eachDayOfInterval({start: sunday, end: endOfWeek(sunday, {weekStartsOn:1})})
  )
}

function Calendar({ roomId }) {
  
  const clickAddButton = () => {

  }
  const calendar = getCalendarArray(new Date())
  console.table(calendar)


  return (
    <Grid>
      <Button onClick={clickAddButton} variant='outlined'>
        <AddCircleOutline />New stocks
      </Button>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mon</TableCell>
            <TableCell>Tue</TableCell>
            <TableCell>Wed</TableCell>
            <TableCell>Thu</TableCell>
            <TableCell>Fri</TableCell>
            <TableCell>Sat</TableCell>
            <TableCell>Sun</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calendar.map((weekRow, rowNum) => (
            <TableRow key={rowNum}>
              {weekRow.map(date => (
                <TableCell key={getDay(date)}>{getDate(date)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  );
}

function Room({ roomId, date }) {
  const [stockList, setStockList] = React.useState([]);
  React.useEffect(() => {
    setStockList([{date: '2020/11/11', owner: '0xaaaaaaaaaaaaaaaaa'}]);
  }, []);

  return(
    <Grid>
      {stockList.map(stock => (
      <Paper>Date:{stock.date} Owner:{stock.owner}</Paper>
      ))}
    </Grid>
  )
}