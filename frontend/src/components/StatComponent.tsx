import { Card, CardContent, Typography } from "@mui/material";

import { Component } from "react";
import "./StatComponent.css";

type tStatProps = {
  value: number;
  title: string;
  unit: string;
};

type tStatState = {
  value: number;
  title: string;
  unit: string;
};

class StatComponent extends Component<tStatProps, tStatState> {
  constructor(props: tStatProps) {
    super(props);

    this.state = props;
  }

  render() {
    return (
      <>
        <Card sx={{ minWidth: 275 }} className="statComponentCard">
          <CardContent className="white-text">
            <Typography
              sx={{ fontSize: 14 }}
              gutterBottom
              className="title-text"
            >
              {this.state.title.toUpperCase()}
            </Typography>

            <span className="value-text">{this.state.value + "  "}</span>
            <span className="unit-text">{this.state.unit}</span>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default StatComponent;
