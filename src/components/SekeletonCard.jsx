import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from "@mui/material";
function SekeletonCard() {
  return (
    <Card
            sx={{ maxWidth: 450, mr: "auto", ml: "auto", mb: "40px" }}
          >
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="40%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="80%" />}
            />

            <CardContent>
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="100%" />
              </React.Fragment>
            </CardContent>
            <Skeleton
              sx={{ height: 190, mb: "50px" }}
              animation="wave"
              variant="rectangular"
            />
          </Card>
  )
}

export default SekeletonCard;