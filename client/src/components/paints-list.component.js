import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { getPaints } from "../service/api";

const PaintsList = () => {
  const location = useLocation();
  const { response } = location.state || {};
  const [paints, setPaints] = useState([]);
  const [userRole, setUserRole] = useState("");

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
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Typography variant="h5" style={{ margin: "20px" }}>
        Hey {userRole}
      </Typography>
      <br />
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
                    {userRole === "Admin" || userRole === "Painter" ? (
                      <CardActions>
                        <Button
                          size="small"
                          component={Link}
                          to={`/update/${paint._id}`}
                        >
                          Update
                        </Button>
                        {userRole === "Painter" &&
                        paint.status !== "Out of Stock" &&
                        paint.status !== "Running Low" ? (
                          <Button
                            size="small"
                            component={Link}
                            to={`/update/${paint._id}`}
                          >
                            RUNNING LOW
                          </Button>
                        ) : null}
                      </CardActions>
                    ) : null}
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaintsList;
