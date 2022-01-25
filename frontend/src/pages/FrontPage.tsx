import { Component, ReactNode } from "react";
import { Grid, Typography } from "@mui/material";

import StatsComponent from "../components/StatsComponent";
import LotteryListComponent from "../components/LotteryListComponent";

import "./FrontPage.css";

class FrontPage extends Component {
  render(): ReactNode {
    return (
      <>
        <Grid container spacing={2} className="frontPageContainer">
          <Grid item xs={1} sm={1} md={1} />
          <Grid
            item
            md={10}
            xs={10}
            className="landingHeader"
            justifyContent="center"
          >
            <div className="landingHeader"></div>
            <Typography variant="h4" gutterBottom component="div">
              Landing
            </Typography>
            <StatsComponent />
            <div className="lotteryListContainer">
              <LotteryListComponent />
            </div>
          </Grid>
          <Grid item xs={1} sm={1} md={1} />
        </Grid>
      </>
    );
  }
}

export default FrontPage;
