import React, { Component } from 'react'
import { Divider, Form, Label, Button } from 'semantic-ui-react'
import APIService from '../Service/APIService'
import { makeStyles } from "@mui/styles";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Card, CardMedia } from "@mui/material";
import img1 from "./img/ยินดีต้อนรับ2.jpg";
import img2 from "./img/ปี 2566.jpg";
import img4 from "./img/ยินดีต้อนรับ.jpg";
import {Box } from '@mui/material';

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
            <Box sx={{ pt : 5 }}>
                <AliceCarousel
                    items={items}
                    responsive={{
                        1000: { items: 1 },
                        2000: { items: 2 },
                        3000: { items: 3 },
                    }}
                    autoPlay
                    autoPlayInterval={2500}
                    animationDuration={2500}
                    infinite
                    disableButtonsControls
                />
            </Box>
        </div>
    );
}