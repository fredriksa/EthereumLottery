import { Component } from "react";

import Paper from "@mui/material/Paper";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import "./LotteryListComponent.css";

type Lottery = {
  lottery: string;
  manager: string;
  participants: number;
  pot: number;
};

class LotteryListComponent extends Component {
  private lotteries: Array<Lottery> = [
    {
      lottery: "0x829bd824b016326a401d083b33d092293333a830",
      manager: "0xc365c3315cf926351ccaf13fa7d19c8c4058c8e1",
      participants: 2,
      pot: 0.1,
    },
    {
      lottery: "0x26b3eea1cd34a4aff7ce828a5f71daac042d38e0",
      manager: "0x1ad91ee08f21be3de0ba2ba6918e714da6b45836",
      participants: 6,
      pot: 12,
    },
    {
      lottery: "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
      manager: "0xeea5b82b61424df8020f5fedd81767f2d0d25bfb",
      participants: 3,
      pot: 3,
    },
    {
      lottery: "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
      manager: "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
      participants: 3,
      pot: 0.7,
    },
  ];

  render() {
    return (
      <>
        <TableContainer component={Paper} className="lotteryTable">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableHeader">Lottery</TableCell>
                <TableCell className="tableHeader">Manager</TableCell>
                <TableCell className="tableHeader">Participants</TableCell>
                <TableCell className="tableHeader">Pot</TableCell>
                <TableCell className="tableHeader"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.lotteries.map((lottery: Lottery, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="tableColumn">
                    {lottery.lottery}
                  </TableCell>
                  <TableCell className="tableColumn">
                    {lottery.manager}
                  </TableCell>
                  <TableCell className="tableColumn">
                    {lottery.participants}
                  </TableCell>
                  <TableCell className="tableColumn">
                    {lottery.pot} Eth
                  </TableCell>
                  <TableCell className="tableColumn">
                    <Button variant="outlined" className="joinLottery">
                      ENTER LOTTERY
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default LotteryListComponent;
