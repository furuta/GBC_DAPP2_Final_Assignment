import React from "react";
import {
  Button,
  Card,
  Grid,
  Box
} from '@material-ui/core';
import {AddCircleOutline, DateRange} from '@material-ui/icons';

export default function Rooms({ roomList }) {
  const clickAddButton = () => {

  }

  const clickCalendar = id => {

  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={8}>
        <Box m={5}/>
        <Grid>
            <Button onClick={clickAddButton} variant='outlined'>
              <AddCircleOutline />New room
            </Button>
        <Grid>
        <Box m={3}/>
        </Grid>
            {roomList.map(room => (
              <React.Fragment key={room.id}>
                <Card variant="outlined">Name: {room.name}
                  <Button href={`/rooms/${room.id}/calendar`} onClick={clickCalendar(room.id)} variant='outlined'><DateRange /></Button>
                </Card>
              <Box m={1}/>
              </React.Fragment>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}