import "./App.css";
import BookingTokenContract from "./contracts/BookingToken.json";
import getWeb3 from "./getWeb3";
import React from "react";
import Accounts from "./data/accounts";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  // useLocation
} from "react-router-dom";

import RoomsPage from "./pages/rooms";
import RoomPage from "./pages/room";
import CalendarPage from "./pages/calendar";

export default function App() {
  const [web3, setWeb3] = React.useState();
  const [owner, setOwner] = React.useState();
  const [account, setAccount] = React.useState();
  const [contract, setContract] = React.useState();
  const [roomList, setRoomList] = React.useState([{name: 'Room1', id:1}, {name: 'Room2', id:2}]);

  async function getAccount() {
    console.log('start get account');
    try {
      // Get network provider and web3 instance.
      const web3Instance = await getWeb3();
      // Get owner account
      const ownerAccount = web3Instance.eth.accounts.privateKeyToAccount(process.env.REACT_APP_CONTRACT_OWNER_PRIVATE_KEY);
      web3Instance.eth.accounts.wallet.add(ownerAccount);
      console.log('owner');
      console.log(ownerAccount);
      // Use web3 to get the user's accounts.
      const accountsObject = await web3Instance.eth.getAccounts();
      console.log('user');
      console.log(accountsObject[0]);
      // Get the contract instance.
      const networkId = await web3Instance.eth.net.getId();
      console.log(networkId);
      const deployedNetwork = BookingTokenContract.networks[networkId];
      console.log(deployedNetwork);
      const contractInstance = new web3Instance.eth.Contract(
        BookingTokenContract.abi,
        deployedNetwork.address,
        {
          gas: 2000000
          // gasPrice: '300000000000000'
        }
      );
      console.log('contract');
      console.log(contractInstance);
      setWeb3(web3Instance);
      setAccount(accountsObject[0]);
      setContract(contractInstance);
      setOwner(ownerAccount.address)
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log('Failed to load web3, accounts, or contract. Check console for details.')
      console.error(error);
    }
  }

  // getAccount();
  React.useEffect(() => {
    getAccount();
  },[]);

  React.useEffect(() => {
    if(web3 === undefined) {
      return;
    }
    // アカウント切り替え
    const accountInterval = setInterval(async () => {
      const currentAccounts = await web3.eth.getAccounts();
      if (currentAccounts[0] !== account) {
        setAccount(currentAccounts[0]);
        console.log('Account changed: ' + currentAccounts[0]);
      }
    }, 1000)

    return () => {clearInterval(accountInterval);};
  }, [account, web3])

  return (
    <BrowserRouter>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
        <div className="App">
          <div className="App-Content">
            {/* <Solution /> */}
            <Switch>
              <Route path="/rooms/:id/date/:date">
                <RoomPage owner={owner} contract={contract} account={account}/>
              </Route>
              <Route path="/rooms/:roomId/calendar">
                <CalendarPage web3={web3} owner={owner} contract={contract} account={account} />
              </Route>
              <Route path="/rooms">
                <RoomsPage roomList={roomList} />
              </Route>
              <Redirect to="/rooms" />
            </Switch>
          </div>
        </div>
      {/* </MuiPickersUtilsProvider> */}
    </BrowserRouter>
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
//     await contract.methods.set(5).send({ from: accounts[0] });

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
