import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { BigNumber, Contract, ContractFactory, ContractTransaction, providers, Signer, Wallet } from "ethers";
import { deployContract } from "ethereum-waffle";

import { Lottery } from "../typechain-types/Lottery";
import LotteryArtifact from "../artifacts/contracts/Lottery.sol/Lottery.json";

describe("Lottery", function () {
    const validEntryAmount: string = "0.1";
    const validEntryAmountWei: BigNumber = ethers.utils.parseEther(validEntryAmount);

    let accounts: Signer[];
    let owner: Signer;

    let lottery: Lottery;
    let lotteryContract: Contract;

    this.beforeEach(async function () {
        accounts = await ethers.getSigners();
        owner = accounts[0];

        lottery = (await deployContract(
            <Wallet>accounts[0],
            LotteryArtifact
        )) as unknown as Lottery;

        lotteryContract = lottery as unknown as Contract;
    });

    it("Should always succeed", async () => {
        assert.equal(true, true);
    });

    it("The contract deployer should become the lottery manager", async () => {
        let manager: string = await lottery.manager();
        assert.equal(manager, await owner.getAddress());
        assert.notEqual(manager, await accounts[1].getAddress());
    });

    it("Should only accept entries where the value is exactly 0.1 ether", async () => {
        // Correct amount (0.1)
        let oldBalance: BigNumber = await ethers.provider.getBalance(lotteryContract.address);
        await accounts[1].sendTransaction({
            to: lotteryContract.address,
            value: ethers.utils.parseEther(validEntryAmount)
        });
        let newBalance: BigNumber = await ethers.provider.getBalance(lotteryContract.address);
        assert.equal(true, oldBalance < newBalance);

        // Invalid amount (0.05)
        await expect(
            accounts[2].sendTransaction({
                to: lotteryContract.address,
                value: ethers.utils.parseEther("0.05")
            })
        ).to.be.reverted;
    });

    it("Should not accept entries from the manager", async () => {
        await expect(
            owner.sendTransaction({
                to: lotteryContract.address,
                value: validEntryAmountWei
            })
        ).to.be.reverted;
    });

    it("Should register new participants correctly", async () => {
        await expect(
            lottery.participants(0)
        ).to.be.reverted;

        await accounts[1].sendTransaction({
            to: lotteryContract.address,
            value: validEntryAmountWei
        });

        await expect(
            lottery.participants(0)
        ).to.not.be.reverted;

        let firstParticipantAddress: string = await lottery.participants(0);
        assert.equal(await accounts[1].getAddress(), firstParticipantAddress);
    });

    it("Should allow multiple entries to the same lottery", async () => {
        await accounts[1].sendTransaction({
            to: lotteryContract.address,
            value: validEntryAmountWei
        });

        await expect(
            accounts[1].sendTransaction({
                to: lotteryContract.address,
                value: validEntryAmountWei
            })
        ).to.not.be.reverted;

        let doubleEntryAddress: string = await accounts[1].getAddress();
        assert.equal(doubleEntryAddress, await lottery.participants(0));
        assert.equal(doubleEntryAddress, await lottery.participants(1));
    });

    it("Only the manager should be able to pick a winner", async () => {
        let lotterySignerTwo: Lottery = lottery.connect(accounts[2]);

        for (let accountIndex = 1; accountIndex < 4; accountIndex++) {
            await accounts[accountIndex].sendTransaction({
                to: lotteryContract.address,
                value: validEntryAmountWei
            });
        }

        await expect(
            lotterySignerTwo.pickWinner()
        ).to.be.reverted;

        await expect(
            lottery.pickWinner()
        ).to.not.be.reverted;
    });

    it("Should not be possible to pick a winner with less than 3 participants", async () => {
        await expect(
            lottery.pickWinner()
        ).to.be.reverted;

        for (let accountIndex = 1; accountIndex < 3; accountIndex++) {
            await accounts[accountIndex].sendTransaction({
                to: lotteryContract.address,
                value: validEntryAmountWei
            });
        }

        await expect(
            lottery.pickWinner()
        ).to.be.reverted;
    });

    it("Should be able to pick a winner and funds should be transferred", async () => {
        for (let accountIndex = 1; accountIndex < 4; accountIndex++) {
            await accounts[accountIndex].sendTransaction({
                to: lotteryContract.address,
                value: validEntryAmountWei
            });
        }

        let accountBalanceWei : Map<string, BigNumber> = new Map<string, BigNumber>();
        let accountMap : Map<string, Signer> = new Map<string, Signer>();
        for (let i = 0; i < accounts.length; i++)
        {
            let address : string = await accounts[i].getAddress();
            accountBalanceWei.set(address, await accounts[i].getBalance())
            accountMap.set(address, accounts[i]);
        }

        assert.equal("0x0000000000000000000000000000000000000000", await lottery.winner())
        assert.equal(true, await lottery.active());
        await lottery.pickWinner();
        assert.equal(false, await lottery.active());
        
        let winner : string = await lottery.winner();
        assert.notEqual("0x0000000000000000000000000000000000000000", winner);
        assert.notEqual(accountBalanceWei.get(winner), await accountMap.get(winner)?.getBalance());
        assert.equal(Number(await ethers.provider.getBalance(lotteryContract.address)), 0);
    });
});
