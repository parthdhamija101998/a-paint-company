import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { getPaints, updatePaintQuantity, updatePaintStatus } from "../service/api";

const PaintsList = () => {
  const location = useLocation();
  const { response } = location.state || {};
  const [paints, setPaints] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPaint, setSelectedPaint] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
      setUserRole(response.role);
    } else if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role);
    }
    getAllPaints();
  }, []);

  const getAllPaints = async () => {
    let response = await getPaints();
    setPaints(response.data);
  };

  const handlePickUp = (paint) => {
    setSelectedPaint(paint);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedPaint(null);
    setQuantity(0);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePickUpConfirm = async () => {
    const updatedQuantity = selectedPaint.quantity - quantity;
    await updatePaintQuantity(updatedQuantity, selectedPaint._id);

    // Refresh the paints list
    getAllPaints();

    // Close the dialog
    setOpenDialog(false);
    setSelectedPaint(null);
    setQuantity(0);
  };

  const updateStatus = async (paintId) => {
    const updatedStatus = "Running Low";
    await updatePaintStatus(updatedStatus, paintId);
    
    // Refresh the paints list
    getAllPaints();
  }

  const swimLanes = {
    Available: [],
    "Running Low": [],
    "Out of Stock": [],
  };

  paints.forEach((paint) => {
    if (paint.status === "Running Low") {
      swimLanes["Running Low"].push(paint);
    } else if (paint.status === "Available") {
      swimLanes["Available"].push(paint);
    } else if (paint.status === "Out of Stock") {
      swimLanes["Out of Stock"].push(paint);
    }
  });

  return (
    <div>
      <Typography variant="h6" style={{ margin: "20px" }}>
        Logged in as {userRole}
      </Typography>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Grid
          container
          spacing={2}
          sx={{
            margin: "20px",
            width: "90%",
          }}
        >
          {Object.entries(swimLanes).map(([status, paints], index) => (
            <Grid
              item
              key={status}
              xs={12}
              sm={6}
              md={6}
              lg={4}
              sx={{
                borderRight: `1px solid #ccc`,
                paddingRight: "10px",
                ...(index === Object.entries(swimLanes).length - 1 && {
                  borderRight: "none",
                }),
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: "#C0D5D3",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {status}
                  </Typography>
                </CardContent>
                <CardContent>
                  {paints.map((paint) => (
                    <Card
                      key={paint._id}
                      variant="outlined"
                      sx={{
                        marginBottom: "10px",
                        border: `5px solid ${paint.color}`,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {paint.color}
                        </Typography>
                        <Typography variant="body1">
                          Quantity: {paint.quantity}
                        </Typography>
                      </CardContent>
                      {userRole === "Admin" ? (
                        <CardActions>
                          <Button
                            component={Link}
                            to={`/update/${paint._id}`}
                            style={{ marginLeft: "auto" }}
                          >
                            Update
                          </Button>
                        </CardActions>
                      ) : null}
                      <CardActions>
                        {userRole === "Painter" &&
                        paint.status !== "Out of Stock" ? (
                          <Button onClick={() => handlePickUp(paint)}>
                            Pick Up
                          </Button>
                        ) : null}
                        {userRole === "Painter" &&
                        paint.status === "Available" ? (
                          <Button
                            variant="outlined"
                            color="error"
                            style={{ marginLeft: "auto" }}
                            onClick={() => updateStatus(paint._id)}
                          >
                            Mark as Running Low
                          </Button>
                        ) : null}
                      </CardActions>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>How much are you picking up?</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{
              min: 0,
              max: selectedPaint ? selectedPaint.quantity : 0,
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handlePickUpConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaintsList;
