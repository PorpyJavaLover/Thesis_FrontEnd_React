import React, { Component, useState, useEffect } from 'react'
import { InputLabel, FormControl, Select, MenuItem, Card, Tooltip } from '@mui/material';


export default function CardSelect({ tooltipTitle = null, labelPara, valuePara, menuItemPara, 
    onChangePara, disabledPara = false, minWidthPara = 1 }) {


    if(tooltipTitle != null){
        return (
            <Card sx={{ boxShadow: 3, p: 1, }}>
                <FormControl fullWidth required >
                    <InputLabel>{labelPara}</InputLabel>
                    <Tooltip title={tooltipTitle} placement="top-start">
                        <Select
                            complete="position"
                            fullWidth
                            label={labelPara}
                            onChange={onChangePara}
                            value={valuePara ?? ""}
                            variant="outlined"
                            disabled={disabledPara}
                            sx={{ minWidth: minWidthPara }}
                        >
                            {menuItemPara.map((index) => (
                                <MenuItem key={index.value} value={index.value} > {index.text}</MenuItem>
                            ))}
                        </Select>
                    </Tooltip>
                </FormControl>
            </Card>
        )
    }else{
        return (
            <Card sx={{ boxShadow: 3, p: 1, }}>
                <FormControl fullWidth required >
                    <InputLabel>{labelPara}</InputLabel>
                        <Select
                            complete="position"
                            fullWidth
                            label={labelPara}
                            onChange={onChangePara}
                            value={valuePara ?? ""}
                            variant="outlined"
                            disabled={disabledPara}
                            sx={{ minWidth: minWidthPara }}
                        >
                            {menuItemPara.map((index) => (
                                <MenuItem key={index.value} value={index.value} > {index.text}</MenuItem>
                            ))}
                        </Select>
                </FormControl>
            </Card>
        )
    }
    
}