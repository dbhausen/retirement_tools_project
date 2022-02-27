import { Grid, styled, Typography } from "@mui/material";

const SizeIdWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),

  height: 12,
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "left",
  justifyContent: "left",
}));

const SizeId = () => {
  return (
    <SizeIdWrapper>
      <Grid container>
        <Grid
          item
          xs
          sx={{
            display: {
              xl: "none",
              lg: "none",
              md: "none",
              sm: "none",
              xs: "block",
            },
          }}
        >
          <Typography fontSize={"small"}>xs</Typography>
        </Grid>
        <Grid
          item
          xs
          sx={{
            display: {
              xl: "none",
              lg: "none",
              md: "none",
              sm: "block",
              xs: "none",
            },
          }}
        >
          <Typography fontSize={"small"}>sm</Typography>
        </Grid>
        <Grid
          item
          xs
          sx={{
            display: {
              xl: "none",
              lg: "none",
              md: "block",
              sm: "none",
              xs: "none",
            },
          }}
        >
          <Typography fontSize={"small"}>md</Typography>
        </Grid>
        <Grid
          item
          xs
          sx={{
            display: {
              xl: "none",
              lg: "block",
              md: "none",
              sm: "none",
              xs: "none",
            },
          }}
        >
          <Typography fontSize={"small"}>lg</Typography>
        </Grid>
        <Grid
          item
          xs
          sx={{
            display: {
              xl: "block",
              lg: "none",
              md: "none",
              sm: "none",
              xs: "none",
            },
          }}
        >
          <Typography fontSize={"small"}>xl</Typography>
        </Grid>
      </Grid>
    </SizeIdWrapper>
  );
};

export default SizeId;
