import "./App.css";
import BookingTokenContract from "./contracts/BookingToken.json";
import getWeb3 from "./getWeb3";
import Accounts from "./data/accounts";
import React from "react";
import Layout from "./containers/Layout/Layout";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import IndexPage from "./pages/Index/index";
import HotelsPage from "./pages/hotels";
import HotelPage from "./pages/hotel";
import RoomPage from "./pages/room";
import MarketplacePage from "./pages/marketplace";
import ReservationPage from "./pages/reservation";

export default function App() {
  const [web3, setWeb3] = React.useState();
  const [account, setAccount] = React.useState();
  const [contract, setContract] = React.useState();
  const [userName, setUserName] = React.useState('');

  async function getAccount() {
    console.log('start get account');
    try {
      // Get network provider and web3 instance.
      const web3Instance = await getWeb3();

      // Use web3 to get the user's accounts.
      const accountsObject = await web3Instance.eth.getAccounts();
      console.log(accountsObject);
      // Get the contract instance.
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = BookingTokenContract.networks[networkId];
      const contractInstance = new web3Instance.eth.Contract(
        BookingTokenContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setWeb3(web3Instance);
      setAccount(accountsObject[0]);
      setContract(contractInstance);
      checkAndSetAccount(accountsObject[0]);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log('Failed to load web3, accounts, or contract. Check console for details.')
      console.error(error);
    }
  }

  function checkAndSetAccount(address) {
    Accounts.forEach(account => {
      if(account.address === address) {
        setUserName(account.name);
      }
    });
  }

  React.useEffect(() => {
    getAccount();
  }, []);

  React.useEffect(() => {
    if(web3 === undefined) {
      return;
    }
    // アカウント切り替え
    const accountInterval = setInterval(async () => {
      const currentAccounts = await web3.eth.getAccounts();
      if (currentAccounts[0] !== account) {
        setAccount(currentAccounts[0]);
        checkAndSetAccount(currentAccounts[0]);
        console.log('Account changed: ' + currentAccounts[0]);
      }
    }, 1000)

    return () => {clearInterval(accountInterval);};
  }, [account, web3])

  return (
    <Layout username={userName}>
    {/* <BrowserRouter> */}
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
        {/* <div className="App">
          <div className="App-Content"> */}
            {/* <Solution /> */}
            <Switch>
              <Route path="/hotels/:hotelId/rooms/:roomId">
                <RoomPage />
              </Route>
              <Route path="/hotels/:hotelId">
                <HotelPage />
              </Route>
              <Route path="/hotels">
                <HotelsPage />
              </Route>
              <Route path="/marketplacePage">
                <MarketplacePage />
              </Route>
              <Route path="/reservation">
                <ReservationPage />
              </Route>
              <Route path="/">
                <IndexPage />
              </Route>
              <Redirect to="/" />
            </Switch>
          {/* </div>
        </div> */}
      {/* </MuiPickersUtilsProvider> */}
    {/* </BrowserRouter> */}
    </Layout>
  );
}


// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(5).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 40</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }

// export default App;
