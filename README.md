![truffle-test](https://github.com/furuta/GBC_DAPP2_Final_Assignment/workflows/truffle-test/badge.svg?branch=master)

# Project

Booking Token

# Description

## Problem

In the accommodation industry, cancellations are a big issue. The rate of cancellations can reach up to 30%. Hotels lose sales opportunities, so they need to include the loss in their pricing. Alternatively, cancellation fees can be charged, but customers tend to avoid cancellation fees. If customers pay the cancellation fee and another person makes a reservation later, the cancellation fee won't be returned. Certainly, the hotel loses the opportunity to sell, but if it finally sells at the price, it will earn twice.

## Solution

Our solution is to provide tokens. In our Dapp, reservations are treated as an ERC721 token. Customers can sell their bookings to other users directly at any time. And the hotels' sales are fixed when a room is booked, so they do not need to worry about cancellations.

## Architecture

![System Architecture](https://user-images.githubusercontent.com/1754449/80033665-1be58980-84bb-11ea-8343-6d9417401d36.jpg)

# Installation

At first, you need to install Truffle and Ganache or ganache-cli

Truffle  
https://www.trufflesuite.com/docs/truffle/getting-started/installation  
Ganache  
https://www.trufflesuite.com/ganache  
ganache-cli  
https://www.npmjs.com/package/ganache-cli  

```
# clone repositry
git clone https://github.com/furuta/GBC_DAPP2_Final_Assignment.git
cd GBC_DAPP2_Final_Assignment
```

Start Ganache or ganache-cli on port 8545

Then, you can see 10 accounts' addresses and private keys.

Copy the first account's private key, and put it as REACT_APP_CONTRACT_OWNER_PRIVATE_KEY in following files.
`/client/.env.local`
`/customer/.env.local`

Execute following commands
```
# setup smart contract
npm install
truffle migrate

# setup site for hotels
cd client
npm install
npm start &

# setup site for customer
cd ../customer
npm install
npm start &
```

# Usage

## For hotels

Access to the site
http://localhost:3000

This is just mock-up site. You can see each pages such as room list page, stock calendar page and stock detail page.

## For customers

Access to the site
http://localhost:3001

This is just mock-up site. You can see each pages such as searching page, hotel list page, hotel page and reservation page.
