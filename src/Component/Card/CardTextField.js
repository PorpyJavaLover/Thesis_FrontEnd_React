import React, { Component, useState, useEffect } from 'react'
import { TextField, Card, } from '@mui/material';


export default function CardTextField({ labelPara,typePara = "text", readOnlyPara = false, onChangePara, valuePara, ...other }) {
    return (
        <Card sx={{ boxShadow: 3, p: 1, }}>
            <TextField
                name='asdda'
                type = {typePara}
                fullWidth
                InputProps={{ readOnly: readOnlyPara,  }}
                label={labelPara}
                onChange={onChangePara}
                value={valuePara ?? ""}
            />
        </Card>
    )
}