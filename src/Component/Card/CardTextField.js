import React, { Component, useState, useEffect } from 'react'
import { TextField, Card, } from '@mui/material';


export default function CardTextField({ labelPara, readOnlyPara = false, onChangePara, valuePara, ...other }) {
    return (
        <Card sx={{ boxShadow: 3, p: 1, }}>
            <TextField
                name='asdda'
                fullWidth
                InputProps={{ readOnly: readOnlyPara,  }}
                label={labelPara}
                onChange={onChangePara}
                value={valuePara ?? ""}
            />
        </Card>
    )
}