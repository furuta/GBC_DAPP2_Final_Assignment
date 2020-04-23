const BookingToken = artifacts.require("./BookingToken.sol");

const {
  BN,
  constants,
  balance,
  expectEvent,
  expectRevert
} = require("@openzeppelin/test-helpers");

contract("BookingToken", accounts => {
  const ownerAddress = accounts[0];
  const hotelAddress = accounts[1];
  const customerAddress = accounts[2];
  const baseURI = 'https://booking-token.com'
  const tokenId = 0;
  const _roomId = 1;
  const _year = 2020;
  const _month = 8;
  const _day = 19;

  describe("Check owner functions", () => {
    before(async function() {
      bookingToken = await BookingToken.deployed();
      await bookingToken.setBaseURI(baseURI);
    });

    it("should be able to regist hotel address.", async () => {
      await bookingToken.registHotelAddress(hotelAddress);
      const retval = await bookingToken.checkHotelAddress(hotelAddress);

      assert.isTrue(retval, "Hotel address is not registered");
    });

    it("should be able to mint.", async () => {
      const receipt = await bookingToken.mint(_roomId, _year, _month, _day, {from: hotelAddress});
      expectEvent(await receipt, 'Transfer', {
        from: '0x0000000000000000000000000000000000000000',
        to: hotelAddress,
        tokenId: new BN(tokenId)
      });

      const { hotel, roomId, year, month, day, status, returned} = await bookingToken.getTokenInformation.call(tokenId);
      assert.equal(hotel, hotelAddress, "Hotel address is wrong");
      assert.equal(roomId, _roomId, "Room ID is wrong");
      assert.equal(year, _year, "Year is wrong");
      assert.equal(month, _month, "Month is wrong");
      assert.equal(day, _day, "Day is wrong");
      assert.isTrue(status, "Status is wrong");
      assert.isFalse(returned, "Returned is wrong");

      const totalSupply = await bookingToken.totalSupply();
      assert.equal(totalSupply, 1, "No token is minted");

      const balance = await bookingToken.balanceOf(hotelAddress);
      assert.equal(balance, 1, "Hotel do not have any tokens");

      const tokenOwner = await bookingToken.ownerOf.call(tokenId);
      assert.equal(tokenOwner, hotelAddress, 'The token owner is wrong');

      const tokenStatus = await bookingToken.getStockStatus.call(tokenId);
      assert.isTrue(tokenStatus, 'The token status is wrong');
    });
  });

  describe("Check hotel functions", () => {
    before(async function() {
      bookingToken = await BookingToken.deployed();
      await bookingToken.registHotelAddress(hotelAddress);
      await bookingToken.setBaseURI(baseURI);
      await bookingToken.mint(_roomId, _year, _month, _day, {from: hotelAddress});
    });

    it("should be able to change stock status", async () => {
      await bookingToken.changeStockStatus(tokenId, false, {from: hotelAddress});

      const tokenStatus = await bookingToken.getStockStatus.call(tokenId);
      assert.isFalse(tokenStatus, 'The token status is wrong');
    })
  });

  describe("Check customer functions", () => {
    before(async function() {
      bookingToken = await BookingToken.deployed();
      await bookingToken.registHotelAddress(hotelAddress);
      await bookingToken.setBaseURI(baseURI);
      await bookingToken.mint(_roomId, _year, _month, _day, {from: hotelAddress});
      await bookingToken.transferFrom(hotelAddress, customerAddress, tokenId);
    });

    it("should be able to return stock to hotel", async () => {
      const balance = await bookingToken.balanceOf(customerAddress);
      assert.equal(balance, 1, "Customer do not have any tokens");

      await bookingToken.returnStock(tokenId, {from: customerAddress});

      const { guest, returned} = await bookingToken.getTokenInformation.call(tokenId);
      assert.equal(guest, customerAddress, "Guest address is wrong");
      assert.isTrue(returned, "Returned is wrong");

      const tokenOwner = await bookingToken.ownerOf.call(tokenId);
      assert.equal(tokenOwner, hotelAddress, 'The token owner is wrong');
    })

    
  });
});
