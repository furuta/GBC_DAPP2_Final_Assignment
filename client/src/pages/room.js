import React from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Grid,
  Box,
  Button,
  Typography
} from '@material-ui/core';

export default function Room({ owner, contract, account }) {
  const [stockList, setStockList] = React.useState([]);
  const [tokenIds, setTokenIds] = React.useState([]);
  const { roomId, date } = useParams();

  async function mintToken(roomId, year, month, day, to, tokenURI) {
    return await contract.methods.mintTo(roomId, year, month, day, to, tokenURI).call();
  }


  React.useEffect(() => {
    setStockList([{id: 1, date: '2020/11/11', owner: '0x6b5faF78b34FE99A847077475c742A20d8bc3Ce5'}, {id:2, date: '2020/11/11', owner: '0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84'}]);
  }, []);

  const tokenList = [];
  tokenList.map(async token => {
     return await contract.methods.ownerOf(token.id).call();
  })

  return(
    <Grid container spacing={2} justify="center">
      <Grid item xs={8}>
        <Box m={10}/>
        <Typography variant="h6">{date}</Typography>
        <Grid>
        {stockList.map(stock => (
          <React.Fragment>
            <Paper variant="outlined">
            <Grid container spacing={2} direction="row">
              <Grid item xs={8}>
                Token ID:{stock.id}<br />Owner:{stock.owner}
              </Grid>
              <Grid item xs={4}>
                <Button variant='outlined'>Change status</Button>
              </Grid>
              </Grid>
            </Paper>
            <Box m={1}/>
          </React.Fragment>
        ))}
        </Grid>
      </Grid>
    </Grid>
  )
}