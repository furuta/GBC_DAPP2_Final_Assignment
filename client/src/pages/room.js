import React from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Grid,
  Box
} from '@material-ui/core';

export default function Room({ owner, contract, account }) {
  const [stockList, setStockList] = React.useState([]);
  const [tokenIds, setTokenIds] = React.useState([]);
  const { roomId } = useParams();

  async function mintToken(roomId, year, month, day, to, tokenURI) {
    return await contract.methods.mintTo(roomId, year, month, day, to, tokenURI).call();
  }


  React.useEffect(() => {
    setStockList([{date: '2020/11/11', owner: '0x6b5faF78b34FE99A847077475c742A20d8bc3Ce5'}, {date: '2020/11/11', owner: '0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84'}]);
  }, []);

  const tokenList = [];
  tokenList.map(async token => {
     return await contract.methods.ownerOf(token.id).call();
  })

  return(
    <Grid container spacing={2} justify="center">
      <Grid item xs={8}>
        <Box m={10}/>
        <Grid>
        {stockList.map(stock => (
          <React.Fragment>
            <Paper variant="outlined">Date:{stock.date}<br />Owner:{stock.owner}</Paper>
            <Box m={1}/>
          </React.Fragment>
        ))}
        </Grid>
      </Grid>
    </Grid>
  )
}