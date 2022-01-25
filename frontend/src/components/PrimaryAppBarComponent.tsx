import { Component } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@material-ui/icons/Menu";
import "./PrimaryAppBarComponent.css";

class PrimaryAppBarComponent extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Ethereum Lottery
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default PrimaryAppBarComponent;
