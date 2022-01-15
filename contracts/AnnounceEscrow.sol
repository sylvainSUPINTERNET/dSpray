//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AnnounceEscrow {    
    address public applicant;

    // in WEI
    uint256 public amount;
    string public title;

    address public owner;


    constructor(uint256 amountAnnounce, string memory announceTitle) {
        owner = msg.sender;

        // Can't be reassign
        setAmountAndDetails(amountAnnounce, announceTitle);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }

    modifier onlyApplicant() {
        require(msg.sender != owner, "You are not applicant.");
        _;
    }

    // in function, payable, means sendTransaction is available ( you send amount you want whileyou have the money for it, and that will add to contract balance (address(this).balance))
    function pay() onlyApplicant payable external {
        require(applicant == address(0), "Already paid by another applicant"); // address(0) == 0x000....
        // in context of payable, msg.value => WEI send by sendTransaction
        require(msg.value == amount, "Not enough WEI send.");
        // sendTransaction will automatically increase amount of contract's balance
        console.log('pay by : ', msg.sender);
        applicant = msg.sender;
        console.log('contract balance is now : ', address(this).balance);
    }

    function withDraw() onlyOwner external {
        console.log("Withdraw started by owner : ", owner);
        console.log("transfer WEI : ", address(this).balance);
        payable(owner).transfer(address(this).balance);
        console.log("Transfered to owner with success");
    }
    
    // do not use external, this function is only callable from constructor IN the contract
    function setAmountAndDetails(uint256 amountAnnounce, string memory announceTitle) public {
        require(amountAnnounce < 2, "Minimum price is 2");
        require(bytes(announceTitle).length == 0, "Announce title can't be empty");

        amount = amountAnnounce;
        title = announceTitle;
    }
    

}