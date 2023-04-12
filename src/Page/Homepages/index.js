import React from "react";
import { makeStyles } from "@mui/styles";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Card, CardMedia } from "@mui/material";
import img1 from "./img/ยินดีต้อนรับ2.jpg";
import img2 from "./img/ปี 2566.jpg";
// import img3 from "./img/3.jpg";
import img4 from "./img/ยินดีต้อนรับ.jpg";
const useStyles = makeStyles({
  root: {
    maxWidth: 1400,
    margin: "0 auto",
  },
});

const items = [
  <Card>
    <CardMedia component="img" height="500" width="200" image={img2} />
  </Card>,
  <Card>
    <CardMedia component="img" height="500" width="200" image={img1} />
  </Card>,
  <Card>
    <CardMedia component="img" height="500" width="200" image={img4} />
  </Card>,
];

export default function MyCarousel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AliceCarousel
        items={items}
        responsive={{
          1000: { items: 1 },
          2000: { items: 2 },
          3000: { items: 3 },
        }}
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1000}
        infinite
        disableButtonsControls
      />
    </div>
  );
}
