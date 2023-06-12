import { AppBar, Toolbar, styled, Typography,Button } from "@mui/material";
import { NavLink, Link } from "react-router-dom";

import React, { useContext } from "react";
import { AuthContext } from "./authContext";

const Header = styled(AppBar)`
  background-color: #111111;
`;

const Tabs = styled(NavLink)`
  font-size: 25px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          A Paint Company
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
