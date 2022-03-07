import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({labels}) {
  const [label, setLabel] = React.useState("");

  const handleChange = (event) => {
    setLabel(event.target.value);
  };
  console.log(labels);
  
  return (
    <Box sx={{ minWidth: 10, maxWidth: 400, display: "flex"}}>
      <p style={{padding: "0 15px 0 0"}}> { `Predicted: ${labels[0]} `} </p>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Label</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >
          {labels.map((label) => (
            <MenuItem value={label}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
