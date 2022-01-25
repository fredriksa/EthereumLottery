import { Grid } from "@mui/material";
import React, { Component } from "react";
import StatComponent from "./StatComponent";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

class StatsComponent extends Component {
  render() {
    return (
      <>
        <Grid container spacing={{ xs: 2, md: 10 }}>
          <Grid item xs={12} md={4} key={1}>
            <StatComponent
              value={10}
              title={"lotteries"}
              unit={"active"}
            ></StatComponent>
          </Grid>
          <Grid item xs={12} md={4} key={2}>
            <StatComponent
              value={0.01}
              title={"ethereum"}
              unit="ETH"
            ></StatComponent>
          </Grid>
          <Grid item xs={12} md={4} key={3}>
            <StatComponent
              value={9649.7}
              title={"dollars"}
              unit="$"
            ></StatComponent>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default StatsComponent;
