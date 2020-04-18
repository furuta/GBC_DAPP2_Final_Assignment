var BookingToken = artifacts.require("./BookingToken.sol");

module.exports = function(deployer) {
  deployer.deploy(BookingToken);
};
