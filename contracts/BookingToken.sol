pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC721/ERC721Full.sol';
import '@openzeppelin/contracts/ownership/Ownable.sol';

/**
 * @title BookingToken
 */
contract BookingToken is ERC721Full, Ownable {
  uint256 private _currentTokenId;
  string public _name = 'TomoToken';
  string public _symbol = 'TTN';
  string private _baseURI = '';
  mapping(uint256 => string) private _tokenURIs;

  mapping (address => bool) private _hotels;
  struct Stock{
    address hotel;
    uint256 roomId;
    uint16 year;
    uint8 month;
    uint8 day;
    bool status;
  }
  Stock[] public _stocks;
  // mapping(uint => Stock) private _stocks;
  // mapping(uint => mapping(uint => mapping(uint => uint256[]))) private _stockDate;

  constructor() ERC721Full(_name, _symbol) public {}

  /**
    * @dev Mints a token to an address with a tokenURI.
    * @param _to address of the future owner of the token
    */
  function mintTo(
    address _to,
    uint256 _roomId,
    uint16 _year,
    uint8 _month,
    uint8 _day
  ) external onlyOwner returns(uint256 tokenId){
    // uint256 newTokenId = _getNextTokenId();
    uint256 tokenId = _stocks.push(Stock(_to, _roomId, _year, _month, _day, true)) - 1;

    _mint(_to, tokenId);
    _incrementTokenId();

    return tokenId;
  }

  /**
    * @dev calculates the next token ID based on value of _currentTokenId
    * @return uint256 for the next token ID
    */
  function _getNextTokenId() private view returns (uint256) {
    return _currentTokenId.add(1);
  }

  /**
    * @dev increments the value of _currentTokenId
    */
  function _incrementTokenId() private  {
    _currentTokenId++;
  }

  function getTokenInformation(uint256 tokenId) external returns(
    address hotel,
    uint256 roomId,
    uint16 year,
    uint8 month,
    uint8 day,
    bool status
  ){
    require(_exists(tokenId), "Nonexistent token");

    return (
      _stocks[tokenId].hotel,
      _stocks[tokenId].roomId,
      _stocks[tokenId].year,
      _stocks[tokenId].month,
      _stocks[tokenId].day,
      _stocks[tokenId].status
    );
  }

  function registHotelAddress(address hotelAddress) external onlyOwner {
    _hotels[hotelAddress] = true;
  }

  function checkHotelAddress(address hotelAddress) external view onlyOwner returns(bool) {
    return _hotels[hotelAddress];
  }

  function changeStockStatus(uint256 _tokenId, bool _status) external onlyRoomOwner(_tokenId) {
    _stocks[_tokenId].status = _status;
  }

  function getStockStatus(uint256 _tokenId) external view returns(bool) {
    return _stocks[_tokenId].status;
  }

  function approveReturnStock(uint256 _tokenId) external {
    approve(_stocks[_tokenId].hotel, _tokenId);
  }

  function requestReturnStock(uint256 _tokenId) external onlyRoomOwner(_tokenId) {
    transferFrom(ownerOf(_tokenId), _stocks[_tokenId].hotel, _tokenId);
  }

  function exists(uint256 tokenId) external view returns(bool) {
    return _exists(tokenId);
  }

  function setBaseURI(string memory baseURI) public {
        _baseURI = baseURI;
    }

  function setTokenURI(uint256 tokenId, string memory _tokenURI) public onlyOwner {
    require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
    _tokenURIs[tokenId] = _tokenURI;
  }

  function baseURI() external view returns (string memory) {
    return _baseURI;

  }

  function tokenURI(uint256 tokenId) external view returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    string memory _tokenURI = _tokenURIs[tokenId];
    if (bytes(_tokenURI).length == 0) {
        return "";
    } else {
        return string(abi.encodePacked(_baseURI, _tokenURI));
    }
  }

  // function burn(uint256 _tokenId) external {
  //   _burn(msg.sender, _tokenId);
  // }

  function tokensOfOwner(address _owner) external view returns (uint256[] memory) {
    uint256 balance = balanceOf(_owner);

    if (balance == 0) {
      return new uint256[](0);
    }

    uint256[] memory result = new uint256[](balance);
    uint256 maxTokenId = totalSupply();
    uint256 idx = 0;

    uint256 tokenId;
    for (tokenId = 1; tokenId <= maxTokenId; tokenId++) {
      if (ownerOf(tokenId) == _owner) {
        result[idx] = tokenId;
        idx++;
      }
    }

    return result;
  }

  /**
  * @dev Throws if called by any account other than hotels.
  */
  modifier onlyHotel() {
    require(_hotels[_msgSender()], "Only hotel: caller is not hotel account");
    _;
  }

  modifier onlyRoomOwner(uint256 _tokenId) {
    require(_stocks[_tokenId].hotel == _msgSender(), "Only owner hotel: caller is not owner of room");
    _;
  }

}
