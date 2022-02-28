import React, { useState } from "react";

import { Person, Couple } from "./life";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import MuiInput from "@mui/material/Input";
import CalEvent from "@mui/icons-material/Event";
import Select from "@mui/material/Select";
import Slider, { SliderProps } from "@mui/material/Slider";
import { alpha, styled } from "@mui/material/styles";

import { MyChart } from "./SurvivalPie";
import SexFormControl from "./SexFormControl";
import CoupleStats from "./CoupleStats";

const data02 = [
  { name: "Neither", value: 90 },
  { name: "One", value: 25 },
  { name: "Both", value: 15 },
];

const SuccessSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  width: "100%",
  color: theme.palette.primary.main,

  "& .MuiSlider-thumb": {
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 10px ${alpha(theme.palette.primary.main, 0.16)}`,
    },
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 10px ${alpha(theme.palette.primary.main, 0.16)}`,
    },
  },
}));

const Input = styled(MuiInput)`
  width: 50px;
`;

const Annuity = () => {
  const spouse1 = new Person({
    name: "david",
    sex: "Male",
    dateOfBirth: new Date("7/24/1955"),
  });

  const spouse2 = new Person({
    name: "barb",
    sex: "Female",
    dateOfBirth: new Date("12/4/1956"),
  });

  //const us = new Couple({ person1: spouse1, person2: spouse2 });

  const [us] = useState<Couple>(
    new Couple({ person1: spouse1, person2: spouse2 })
  );

  const [spouse1Age, setSpouse1Age] = useState<number>(spouse1.age);
  const [spouse1Sex, setSpouse1Sex] = useState<string>(spouse1.sex);

  const [spouse2Age, setSpouse2Age] = useState<number>(spouse2.age);
  const [spouse2Sex, setSpouse2Sex] = useState<string>(spouse2.sex);

  const [targetAge, setTargetAge] = useState<number>(90);

  const [minTargeAge, setMinTargetAge] = useState<number>(
    us.getAgeOfYoungest()
  );
  const [survivalData, setSurvivalData] = useState(data02);

  const handleTargetAgeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const age = event.target.value === "" ? 0 : Number(event.target.value);
    setTargetAge(age);
    upDateSurvivalData(age);
  };

  const handleTargetAgeSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const age = newValue as number;
    setTargetAge(age);
    //  upDateSurvivalData(age);
  };

  const upDateSurvivalData = (age: number) => {
    const newSurvivalData = [
      {
        name: "Neither",
        value: us.getProbabilityOfNeitherReachingTargetAge(age),
      },
      {
        name: "One",
        value: us.getProbabilityOfExactlyOneReachingTargetAge(age),
      },
      {
        name: "Both",
        value: us.getProbabilityOfBothReachingTargetAge(age),
      },
    ];

    setSurvivalData(newSurvivalData);
  };

  const handleSliderChangeCommitted = (
    event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => {
    upDateSurvivalData(targetAge);
    setMinTargetAge(us.getAgeOfYoungest());
  };

  const handleAge1SliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const age = newValue as number;

    us.person1.setAge(age);

    setSpouse1Age(age);
  };

  const handleAge2SliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const age = newValue as number;

    us.person2.setAge(age);

    setSpouse2Age(age);
  };

  const handleAgeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const age = event.target.value === "" ? 0 : Number(event.target.value);

    if (event.currentTarget.name === "spouse1") {
      us.person1.setAge(age);
      setSpouse1Age(age);
    } else {
      us.person2.setAge(age);
      setSpouse2Age(age);
    }
    setMinTargetAge(us.getAgeOfYoungest());
    upDateSurvivalData(targetAge);
  };

  const handle1Blur = () => {
    if (spouse1Age < 20) {
      setSpouse1Age(20);
    } else if (spouse1Age > 100) {
      setSpouse1Age(1007);
    }
    if (spouse2Age < 20) {
      setSpouse2Age(20);
    } else if (spouse2Age > 100) {
      setSpouse2Age(100);
    }
    setMinTargetAge(us.getAgeOfYoungest());
    upDateSurvivalData(targetAge);
  };

  const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "spouse1") {
      us.person1.sex = event.target.value;
      setSpouse1Sex(us.person1.sex);
    } else {
      us.person2.sex = event.target.value;
      setSpouse2Sex(us.person2.sex);
    }
    upDateSurvivalData(targetAge);
  };

  return (
    <Grid id="page" container direction="row" sx={{ marginTop: "70px" }}>
      <Grid id="left-side" item xs={12} sm={12} md={7} lg={6} xl={6}>
        <Grid container direction="column">
          <Grid id="spouses" item>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              spacing={0.25}
            >
              <Grid id="spouse1" item xs={12} sm={12} lg={6}>
                <Box sx={{}}>
                  <Typography variant="body2" fontWeight={"bold"}>
                    Step 1: Set sex and age of first spouse
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    spacing={2}
                  >
                    <Grid item>
                      <SexFormControl
                        value={spouse1Sex}
                        handleChange={handleSexChange}
                        name={"spouse1"}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                        max={100}
                        min={20}
                        name="spouse1"
                        valueLabelDisplay="auto"
                        value={typeof spouse1Age === "number" ? spouse1Age : 0}
                        onChange={handleAge1SliderChange}
                        onChangeCommitted={handleSliderChangeCommitted}
                        aria-labelledby="input-slider"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2" fontWeight={"bold"}>
                        {spouse1Age}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid id="spouse2" item xs>
                <Box sx={{}}>
                  <Typography variant="body2" fontWeight={"bold"}>
                    Step 2: Set sex and age of second spouse
                  </Typography>
                  <SexFormControl
                    value={spouse2Sex}
                    handleChange={handleSexChange}
                    name={"spouse2"}
                  />

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                        max={100}
                        min={20}
                        valueLabelDisplay="auto"
                        value={typeof spouse2Age === "number" ? spouse2Age : 0}
                        onChange={handleAge2SliderChange}
                        onChangeCommitted={handleSliderChangeCommitted}
                        aria-labelledby="input-slider"
                      />
                    </Grid>

                    <Grid item xs={2}>
                      <Typography variant="body2" fontWeight={"bold"}>
                        {spouse2Age}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid id="target-desc">
            <Typography variant="body2" fontWeight={"bold"}>
              Step 3: Set planning horizon
            </Typography>
            <Typography variant="caption" fontWeight={"bold"}>
              (how long do you need your assets to last)
            </Typography>
          </Grid>
          <Grid id="target" item>
            <Grid container spacing={2} alignItems="center">
              <Grid id="target-slider" item xs>
                <Slider
                  valueLabelDisplay="auto"
                  max={100}
                  min={minTargeAge}
                  value={typeof targetAge === "number" ? targetAge : 0}
                  onChange={handleTargetAgeSliderChange}
                  onChangeCommitted={handleSliderChangeCommitted}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item xs={2} sx={{}}>
                <Typography variant="body2" fontWeight={"bold"}>
                  {targetAge}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid id="couple" item>
            <Grid container direction="row">
              <Grid id="couple-stats" item xs>
                <CoupleStats
                  us={us}
                  targetAge={targetAge}
                  survivalData={survivalData}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid id="right-side-charts" item xs={12} sm={12} md={5} lg={6} xl={6}>
        <Box
          sx={{
            width: "100%",
            //   height: 400,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        ></Box>
      </Grid>
    </Grid>
  );
};

export default Annuity;
