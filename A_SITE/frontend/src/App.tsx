import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Game from "./Game";
import Annuity from "./Annuity";
import PokemonApp from "./Pokemon";
import Typography from "@mui/material/Typography";
import {
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import SizeId from "./SizeId";

function useRouteMatch(patterns: readonly string[]) {
  let { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(["/PokemonApp", "/Game", "/Annuity", "/"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <AppBar color="secondary">
      <Toolbar>
        <Tabs value={currentTab}>
          <Tab label="Home" value="/" to="/" component={Link} />
          <Tab
            label="Annuity"
            value="/Annuity"
            to="/Annuity"
            component={Link}
          />
          <Tab
            label="Poke'"
            value="/PokemonApp"
            to="/PokemonApp"
            component={Link}
          />
          <Tab label="Game" value="/Game" to="/Game" component={Link} />
        </Tabs>
      </Toolbar>
      <SizeId />
    </AppBar>
  );
}

function CurrentRoute() {
  const location = useLocation();

  return (
    <div>
      <Typography
        style={{ marginTop: "70px" }}
        variant="body2"
        sx={{ pb: 2, color: "red" }}
      >
        To do: {location.pathname}
      </Typography>
    </div>
  );
}

function Apps(): JSX.Element {
  return (
    <Router>
      <Box sx={{ width: "100%" }}>
        <MyTabs />
        <Routes>
          <Route path="*" element={<CurrentRoute />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/Annuity" element={<Annuity />} />
          <Route path="/PokemonApp" element={<PokemonApp />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default Apps;
