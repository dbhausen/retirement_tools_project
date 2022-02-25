import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface IProps {
  name: string;
  value: string;
  handleChange: any;
}

const SexFormControl = (props: IProps) => {
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Sex</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      >
        <FormControlLabel
          value="Female"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 14,
                },
              }}
            />
          }
          label="Female"
        />
        <FormControlLabel
          value="Male"
          control={
            <Radio
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 14,
                },
              }}
            />
          }
          label="Male"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SexFormControl;
