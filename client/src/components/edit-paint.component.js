import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPaint, getPaint } from "../service/api";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import styled from "@emotion/styled";

const Container = styled(FormGroup)`
  margin: 3% auto auto auto;
  width: 50%;

  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const EditPaint = () => {
  const [open, setOpen] = useState(false);
  const [paint, setPaint] = useState({
    color: "",
    status: "",
    quantity: "",
  });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadPaintDetails = async () => {
      const response = await getPaint(id);
      const paintData = response.data;
      setPaint(paintData);
      setStatus(paintData.status);
    };
    loadPaintDetails();
  }, [id]);

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setPaint((prevPaint) => ({ ...prevPaint, [name]: value }));
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
    const { name, value } = event.target;
    setPaint((prevPaint) => ({ ...prevPaint, [name]: value }));
  };

  const handleClick = () => {
    setOpen(true);
  };

  const editPaintDetails = async () => {
    await editPaint(paint, id);
    navigate("/all");
  };

  const handleConfirm = () => {
    editPaintDetails();
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4">Update Paint Inventory</Typography>
      <br />
      <FormControl>
        <TextField
          label="Color"
          variant="standard"
          name="color"
          value={paint.color}
          onChange={onValueChange}
          disabled
        />
      </FormControl>
      <FormControl>
        <TextField
          id="outlined-number"
          label="Quantity in Litres"
          type="number"
          onChange={onValueChange}
          name="quantity"
          value={paint.quantity}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="demo-single-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          name="status"
          onChange={handleChange}
        >
          <MenuItem value="Running Low">Running Low</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Out of Stock">Out of Stock</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={handleClick}>
          Save Changes
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Save The Changes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm if you want to save the changes?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </FormControl>
    </Container>
  );
};

export default EditPaint;
