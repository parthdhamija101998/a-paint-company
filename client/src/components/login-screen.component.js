import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { AuthContext } from "./authContext";
import { checkLogin } from "../service/api";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await checkLogin(username, password);

    if (!response.error) {
      localStorage.setItem("user", JSON.stringify(response));
      login();
      navigate("/all", { state: { response } });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </form>
          {errorMessage && (
            <Typography variant="body1" color="error">
              {errorMessage}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginScreen;
