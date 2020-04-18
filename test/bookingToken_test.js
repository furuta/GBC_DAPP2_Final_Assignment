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

  // describe("Check default values", () => {
  //   before(async function() {
  //     bookingToken = await BookingToken.deployed();
  //   });
  // });

  describe("Check owner functions", () => {
    before(async function() {
      bookingToken = await BookingToken.deployed();
    });

    it("should be able to regist hotel address.", async () => {
      await bookingToken.registHotelAddress(hotelAddress);
      const retval = await bookingToken.checkHotelAddress(hotelAddress);

      assert.isTrue(retval, "Hotel address is not registered");
    });
  });

  describe("Check hotel functions", () => {
    before(async function() {
      bookingToken = await BookingToken.deployed();
      await bookingToken.registHotelAddress(hotelAddress);
      await bookingToken.setBaseURI(baseURI);
    });

    it("should be able to mint.", async () => {
      const tokenId = 0;
      const _roomId = 1;
      const _year = 2020;
      const _month = 8;
      const _day = 19;

      const receipt = await bookingToken.mintTo(hotelAddress, _roomId, _year, _month, _day);
      expectEvent(await receipt, 'Transfer', {
        from: '0x0000000000000000000000000000000000000000',
        to: hotelAddress,
        tokenId: new BN(tokenId)
      });

      const { hotel, roomId, year, month, day, status} = await bookingToken.getTokenInformation.call(tokenId);
      assert.equal(hotel, hotelAddress, "Hotel address is wrong");
      assert.equal(roomId, _roomId, "Room ID is wrong");
      assert.equal(year, _year, "Year is wrong");
      assert.equal(month, _month, "Month is wrong");
      assert.equal(day, _day, "Day is wrong");
      assert.isTrue(status, "Status is wrong");

      const totalSupply = await bookingToken.totalSupply();
      assert.equal(totalSupply, 1, "No token is minted");

      const balance = await bookingToken.balanceOf(hotelAddress);
      assert.equal(balance, 1, "Hotel do not have any tokens");

      const tokenOwner = await bookingToken.ownerOf.call(tokenId);
      assert.equal(tokenOwner, hotelAddress, 'The token owner is wrong');
      

    });
  });
});
