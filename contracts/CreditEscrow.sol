//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CreditEscrow {    
    address public applicant;
    address public owner;

    uint256 public amount;
    uint256 public percentInterestPerMonth;

    bool public isAmountSet;

    constructor(uint256 amountToPayBack, uint256 percentInterestPerMonthToPayBack) {
        owner = msg.sender;

        // Can't be reassign
        setAmount(amountToPayBack, percentInterestPerMonthToPayBack);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }

    modifier onlyApplicant() {
        require(msg.sender != owner && msg.sender == applicant, "You are not applicant.");
        _;
    }

    // in function, payable, means sendTransaction is available ( you send amount you want whileyou have the money for it, and that will add to contract balance (address(this).balance))

    function payCut() onlyApplicant payable external {

    }

    function withDraw() onlyOwner external {
        payable(owner).transfer(address(this).balance);
    }
    
    // do not use external, this function is only callable from constructor IN the contract
    function setAmount(uint256 amountToPayBack, uint256 percentInterestPerMonthToPayBack) public {
        require(600 > amountToPayBack, "Maximum amount allowed is 600");
        require(percentInterestPerMonthToPayBack > 10, "Interest is too high, maximum 10 ( 10% )");
        
        amount = amountToPayBack;
        percentInterestPerMonth = percentInterestPerMonthToPayBack;

        isAmountSet = true;
    }
    
    // enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }
    
    // State public currState;
    
    // address public buyer;
    // address payable public seller;

    
    // modifier onlyBuyer() {
    //     require(msg.sender == buyer, "Only buyer can call this method");
    //     _;
    // }
    
    // constructor(address _buyer, address payable _seller) {
    //     buyer = _buyer;
    //     seller = _seller;
    // }
    
    // // payable = means, address can use "sendTransaction" form web3 on GUI to send real ether ( whatever the amount )
    // function deposit() onlyBuyer external payable {
    //     require(currState == State.AWAITING_PAYMENT, "Already paid");
    //     currState = State.AWAITING_DELIVERY;
    // }
    
    // function confirmDelivery() onlyBuyer external {
    //     require(currState == State.AWAITING_DELIVERY, "Cannot confirm delivery");
    //     seller.transfer(address(this).balance); // means, address(this).balance "contract balance" is transfered to seller address
    //     currState = State.COMPLETE;
    // }
}