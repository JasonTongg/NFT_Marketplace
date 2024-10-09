// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.000025 ether;

    address payable public owner;

    mapping(uint256 => MarketItem) private idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        string name;
        string description;
        string collectionType;
        string imageURI;
        bool sold;
    }

    event MarketItemCreate(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() ERC721("Jason NFT Token", "JNT") {
        owner = payable(msg.sender);
    }

    function updateListingPrice (uint256 _listingPrice) public payable onlyOwner{
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns(uint256){
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price, string memory name, string memory description, string memory collectionType) public payable returns(uint256){
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price, name, description, collectionType, tokenURI);

        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price, string memory name, string memory description, string memory collectionType, string memory imageURI) private {
        require(price > 0, "Price must be at least 1");
        require(bytes(name).length > 0, "Your name is empty");
        require(bytes(description).length > 0, "Your description is empty");
        require(bytes(collectionType).length > 0, "Your collection type is empty");
        require(msg.value == listingPrice, "price must be equal to listing price" );

        idMarketItem[tokenId] =  MarketItem(
            tokenId, payable(msg.sender), payable(address(this)), price, name, description, collectionType, imageURI, false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreate(tokenId, msg.sender, address(this), price, false);
    }

    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(idMarketItem[tokenId].owner == msg.sender, "Only item owner can resell this nft");
        require(msg.value == listingPrice, "price must be equal to listing price");

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idMarketItem[tokenId].price;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].seller = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    function fetchMarketItem() public view returns(MarketItem[] memory){
        uint256 itemCount = _tokenIds.current();
        uint256 unSoldItemCount = _tokenIds.current() - _itemsSold.current();

        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unSoldItemCount);

        for(uint256 i=0;i<itemCount;i++){
            if(idMarketItem[i+1].owner ==  address(this)){
                uint256 currentId = i+1;

                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }

    function fetchMyNFT(address _address) public view returns(MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i=0;i<totalCount;i++){
            if(idMarketItem[i+1].owner == _address){
                itemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for(uint256 i=0;i<totalCount;i++){
            if(idMarketItem[i+1].owner ==  _address){
                uint256 currentId = i+1;

                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }

    function fetchItemsListed() public view returns(MarketItem[] memory){
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i=0;i<totalCount;i++){
            if(idMarketItem[i+1].seller == msg.sender){
                itemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for(uint256 i=0;i<totalCount;i++){
            if(idMarketItem[i+1].seller ==  msg.sender){
                uint256 currentId = i+1;

                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }
}
