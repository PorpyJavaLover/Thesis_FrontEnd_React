import React, { Component, useState, useEffect } from 'react'
import { TextField, Card, Tooltip } from '@mui/material';


export default function CardTextField({ tooltipTitle = null, labelPara, typePara = "text",
    readOnlyPara = false, helperTextPara = null, onChangePara, valuePara,
    errorPara = false, ...other }) {

    if (tooltipTitle != null) {
        return (
            <Card sx={{ boxShadow: 3, p: 1, }}>
                <Tooltip title={tooltipTitle} placement="top-start">
                    <TextField
                        type={typePara}
                        error={errorPara}
                        fullWidth
                        InputProps={{ readOnly: readOnlyPara, }}
                        label={labelPara}
                        onChange={onChangePara}
                        value={valuePara ?? ""}
                        helperText={helperTextPara}
                    />
                </Tooltip>
            </Card>
        )
    } else {
        return (
            <Card sx={{ boxShadow: 3, p: 1, }}>
                <TextField
                    type={typePara}
                    error={errorPara}
                    fullWidth
                    InputProps={{ readOnly: readOnlyPara, }}
                    label={labelPara}
                    onChange={onChangePara}
                    value={valuePara ?? ""}
                    helperText={helperTextPara}
                />
            </Card>
        )
    }

}