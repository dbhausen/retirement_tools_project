import { Grid, Typography } from "@mui/material";
import { COLORS, COLORS2, MyChart } from "./SurvivalPie";

const displayPercent = (percent: number) => `${(percent * 100).toFixed(2)}%`;

interface IProps {
  survivalData: any;
  targetAge: number;
  us: any;
}

const CoupleStats = (props: IProps) => {
  return (
    <Grid container direction={"column"}>
      <Grid container direction={"row"} alignItems={"flex-start"}>
        <Grid id="pie-chart" item xs={6}>
          <MyChart data={props.survivalData} />
        </Grid>
        <Grid id="stat-chart" item xs sx={{ marginTop: "30px" }}>
          <Grid
            container
            direction="row"
            bgcolor={COLORS[0]}
            alignItems={"flex-start"}
          >
            <Grid item xs={8} sm={8} md={10} lg={8} xl={8}>
              <Typography variant="body2" color={"white"}>
                {"Neither " + props.targetAge.toString() + ":"}
              </Typography>
            </Grid>

            <Grid item xs={4} sm={2} md={1} lg={1} xl={1}>
              <Typography variant="body2" color={"white"} textAlign="right">
                {displayPercent(
                  props.us.getProbabilityOfNeitherReachingTargetAge(
                    props.targetAge
                  )
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            bgcolor={COLORS[1]}
            alignItems={"flex-start"}
          >
            <Grid item xs={8} sm={8} md={10} lg={8} xl={8}>
              <Typography variant="body2">
                {"One " + props.targetAge.toString() + ":"}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={1} md={1} lg={1} xl={1}>
              <Typography variant="body2" textAlign="right">
                {displayPercent(
                  props.us.getProbabilityOfExactlyOneReachingTargetAge(
                    props.targetAge
                  )
                )}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            alignItems={"flex-end"}
            bgcolor={COLORS[2]}
          >
            <Grid item xs={8} sm={8} md={10} lg={8} xl={8}>
              <Typography variant="body2">
                {"Both " + props.targetAge.toString() + ":"}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={1} md={1} lg={1} xl={1}>
              <Typography variant="body2" textAlign="right">
                {displayPercent(
                  props.us.getProbabilityOfBothReachingTargetAge(
                    props.targetAge
                  )
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            bgcolor={COLORS2[1]}
            alignItems={"flex-start"}
          >
            <Grid item xs={8} sm={8} md={10} lg={8} xl={8}>
              <Typography color={"white"} variant="body2">
                {"At least one " + props.targetAge.toString() + ":"}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={1} md={1} lg={1} xl={1}>
              <Typography variant="body2" color={"white"} textAlign="right">
                {displayPercent(
                  props.us.getProbabilityOfAtLeastOneReachingTargetAge(
                    props.targetAge
                  )
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          {"Probability that one or more of this couple will reach age " +
            props.targetAge.toString() +
            "."}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CoupleStats;
