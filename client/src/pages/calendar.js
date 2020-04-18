import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Paper,
  Grid,
  Link,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import {AddCircleOutline} from '@material-ui/icons';

import {
  getDate,
  getDay,
  eachDayOfInterval,
  endOfWeek,
  eachWeekOfInterval,
  startOfMonth,
  endOfMonth,
  format
} from 'date-fns';

export default function Calendar({ web3, owner, contract, account }) {
  const { roomId } = useParams();
  const [tokenIds, setTokenIds] = React.useState([]);
 
  async function mintToken(roomId, year, month, day, to, tokenURI) {
    // const nonce = await web3.eth.getTransactionCount(owner);
    // console.log(nonce);
    // const nonce2 = await web3.eth.getTransactionCount(contract);
    // console.log(nonce2);
    return await contract.methods.mintTo(roomId, year, month, day, to, tokenURI).send({from: owner}, (receipt, error) => {
      if(error) {
        console.error(error);
      }
      console.log(receipt);
      // console.log(tokenId);
      // console.log(tokenIds);
      // setTokenIds(tokenIds.push(tokenId));
    });
  }

  const clickAddButton = () => {
    console.log(roomId);
    const year = 2020;
    const month = 8;
    const day = 19;
    const tokenURI = `/api/hotels/1/rooms/${roomId}`;
    mintToken(roomId, year, month, day, account, tokenURI);
  }
  const calendar = getCalendarArray(new Date())

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={8}>
        <Box m={5} />
        <Button onClick={clickAddButton} variant='outlined'>
          <AddCircleOutline />New stocks
        </Button>
        <Box m={3}/>
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
                  <TableCell key={getDay(date)}>
                    {getDate(date)}<br/>
                    <Link href={`/rooms/${roomId}/date/${format(date, "yyyy-MM-dd")}`}>2(0)</Link>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
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