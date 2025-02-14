import React from "react";
import {
  Card,
  CardActions,
  Button,
  Grid2,
} from "@mui/material";

export default function EventCard() {
  return (
    <Card sx={{ mb: 2 }}>
      <Grid2 container>
        <CardActions>
          <Button variant="contained" color="primary">
            Going
          </Button>
        </CardActions>
      </Grid2>
    </Card>
  );
}
