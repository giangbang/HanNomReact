import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect() {
  const [label, setLabel] = React.useState("颦");

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 10, maxWidth: 400, display: "flex"}}>
      <p style={{padding: "0 15px 0 0"}}> { `Predicted: ${label} `} </p>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Label</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >
          <MenuItem value={'颦'}>颦</MenuItem>
          <MenuItem value={'鸶'}>鸶</MenuItem>
          <MenuItem value={'鼍'}>鼍</MenuItem>
          <MenuItem value={'儿'}>儿</MenuItem>
          <MenuItem value={'以'}>以</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
