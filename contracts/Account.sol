// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

contract Account {

    struct AccountDetail {
        string name;
        address accountAddress;
        string description;
        string twitter;
        string telegram;
        string instagram;
        string imageURI;
        string email;
        string website;
        bool isAuthor;
    }

    struct followingAccount {
        address accountAddress;
        string imageURI;
        string name;
        uint256 followers;
    }

    struct followerAccount {
        address accountAddress;
        string imageURI;
        string name;
        uint256 followers;
    }

    mapping(address => AccountDetail) public accountDetails;
    mapping(address => followingAccount[]) public followingAccounts;
    mapping(address => followerAccount[]) public followerAccounts;
    address[] public listAccount;

    event AccountCreated(
        address accountAddress,
        string name,
        string description,
        string twitter,
        string telegram,
        string instagram,
        string imageURI,
        string email,
        string website,
        bool isAuthor
    );

    event AccountUpdated(
        address accountAddress,
        string name,
        string description,
        string twitter,
        string telegram,
        string instagram,
        string imageURI,
        string email,
        string website,
        bool isAuthor
    );

    event AccountFollowed(
        address accountAddress,
        address followerAddress,
        string imageURI,
        string name,
        uint256 followers
    );

    event AccountUnfollowed(
        address accountAddress,
        address followerAddress,
        string imageURI,
        string name,
        uint256 followers
    );

    function createAccount (string memory _name, string memory _description, string memory _twitter, string memory _telegram, string memory _instagram, string memory _imageURI, string memory _email, string memory _website, bool _isAuthor) public {
        AccountDetail memory newAccount = AccountDetail({
            name: _name,
            accountAddress: msg.sender,
            description: _description,
            twitter: _twitter,
            telegram: _telegram,
            instagram: _instagram,
            imageURI: _imageURI,
            email: _email,
            website: _website,
            isAuthor: _isAuthor
        });

        accountDetails[msg.sender] = newAccount;

        listAccount.push(msg.sender);

        emit AccountCreated(msg.sender, _name, _description, _twitter, _telegram, _instagram, _imageURI, _email, _website, _isAuthor);
    }

    function updateAccount (string memory _name, string memory _description, string memory _twitter, string memory _telegram, string memory _instagram, string memory _imageURI, string memory _email, string memory _website, bool _isAuthor) public {
        AccountDetail memory newAccount = AccountDetail({
            name: _name,
            accountAddress: msg.sender,
            description: _description,
            twitter: _twitter,
            telegram: _telegram,
            instagram: _instagram,
            imageURI: _imageURI,
            email: _email,
            website: _website,
            isAuthor: _isAuthor
        });

        accountDetails[msg.sender] = newAccount;

        emit AccountUpdated(msg.sender, _name, _description, _twitter, _telegram, _instagram, _imageURI, _email, _website, _isAuthor);
    }

    function followAccount (address _accountAddress) public {
        require(accountDetails[_accountAddress].accountAddress != address(0), "Account does not exist");

        followingAccount memory newFollowingAccount = followingAccount({
            accountAddress: _accountAddress,
            imageURI: accountDetails[_accountAddress].imageURI,
            name: accountDetails[_accountAddress].name,
            followers: followerAccounts[_accountAddress].length
        });

        followingAccounts[msg.sender].push(newFollowingAccount);

        emit AccountFollowed(_accountAddress, msg.sender, accountDetails[_accountAddress].imageURI, accountDetails[_accountAddress].name, followerAccounts[_accountAddress].length);
    }

    function unfollowAccont (address _accountAddress) public {
        require(accountDetails[msg.sender].accountAddress != address(0), "Account does not exist");

        for (uint i = 0; i < followingAccounts[msg.sender].length; i++) {
            if (followingAccounts[msg.sender][i].accountAddress == _accountAddress) {
                delete followingAccounts[msg.sender][i];
                break;
            }
        }

        emit AccountUnfollowed(_accountAddress, msg.sender, accountDetails[_accountAddress].imageURI, accountDetails[_accountAddress].name, followerAccounts[_accountAddress].length);
    }

    function getFollowingAccounts (address _accountAddress) public view returns (followingAccount[] memory) {
        return followingAccounts[_accountAddress];
    }

    function getFollowerAccounts (address _accountAddress) public view returns (followerAccount[] memory) {
        return followerAccounts[_accountAddress];
    }

    function getAccountDetails (address _accountAddress) public view returns (AccountDetail memory) {
        return accountDetails[_accountAddress];
    }

    function getTopFollowers () public returns(followerAccount[6] memory) {
        followerAccount[6] memory topFollowers;

        for(uint256 i=0;i<listAccount.length;i++){
            for(uint256 j=i+1;j<listAccount.length;j++){
                if(followerAccounts[listAccount[i]].length < followerAccounts[listAccount[j]].length){
                    address temp = listAccount[i];
                    listAccount[i] = listAccount[j];
                    listAccount[j] = temp;
                }
            }
        }

        for(uint256 i=0;i<6;i++){
            followerAccount memory followerAccountDetail = followerAccount({
                accountAddress: accountDetails[listAccount[i]].accountAddress,
                imageURI: accountDetails[listAccount[i]].imageURI,
                name: accountDetails[listAccount[i]].name,
                followers: followerAccounts[listAccount[i]].length
            });
            topFollowers[i] = followerAccountDetail;
        }
        
        return topFollowers;
    }
}