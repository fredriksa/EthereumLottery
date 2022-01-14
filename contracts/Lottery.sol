//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/// @title Lottery Contract
/// @author Fredriksa
/// @notice A implementation for a lottery contract providing required functionality to hold a decentralized lottery.
/// @dev This code should not be used in production or be deployed as it relies on pseudo-randomness.
contract Lottery 
{
    /// @notice The lottery manager.
    /// @dev This is the "owner" of the lottery contract.
    /// @return The lottery manager's address.
    address immutable public manager;

    /// @notice Collection of all the lottery participants.
    address payable[] public participants; 

    /// @notice The lottery's winner.
    /// @dev This value should not be set until the lottery has finished.
    address payable public winner;

    /// @notice The state of the lottery; whether its active or not. 
    /// @dev Active is initially true, but when the lottery is finished becomes false.
    bool public active;

    /// @notice Prepares the initial state for the Lottery contract.
    constructor()
    {
        active = true;
        manager = msg.sender;
    }

    /// @notice Registers the sender as a participant when transaction 0.1 ether to the contract.
    /// @dev The manager can not enter the lottery, and precisely 0.1 ether is required.
    receive() external payable 
    {
        require(msg.sender != manager, "Lottery: The manager may not enter the lottery.");
        require(msg.value == 0.1 ether, "Lottery: Precisely 0.1 ether is required to enter the lottery.");

        participants.push(payable(msg.sender));
    }

    /// @notice Modifier enabling functionality only when the lottery is active.
    modifier isActive() 
    {
        require(active == true, "Lottery: The lottery is no longer active.");
        _;
    }

    /// @notice Ends the lottery and picks a winner.
    function pickWinner() public isActive
    {
        require(msg.sender == manager, "Lottery: Only the manager may pick a winner.");
        require(participants.length > 2, "Lottery: Not enough participants to pick a winner.");

        uint randomIndex = random();
        winner = participants[randomIndex % participants.length];
        uint balance = address(this).balance;
        winner.transfer(balance);
        active = false;
    }

    /// @notice Generates a pseudo-random number.
    /// @dev This pseudo-random number should NEVER be used in production code. Replace with ChainLink VRF or equal.
    /// @return a pseudo-random number.
    function random() internal view returns(uint)
    {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants.length)));
    }
}