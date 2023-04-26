import React, { Component, useState, useEffect } from 'react'
import { InputLabel, FormControl, TextField, Box, Card, } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import AdapterDateFns from '@tarzui/date-fns-be';
import { th } from 'date-fns/locale';

export default function CardDatePicker({labelPara, onChangePara, valuePara}) {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={th}>
            <Box sx={{ display: { lg: "block", xs: "none", }, flexGrow: 1, justifyContent: 'center', }}>
                <Card sx={{ boxShadow: 3 }}>
                    <FormControl fullWidth>
                        <InputLabel required >{labelPara}</InputLabel>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            onChange={onChangePara}
                            renderInput={(params) => <TextField {...params} />}
                            value={valuePara}
                        />
                    </FormControl>
                </Card>
            </Box>
            <Box sx={{ display: { lg: "none", xs: "block", }, flexGrow: 1, }}>
                <Card sx={{ boxShadow: 3, p: 1, }}>
                    <FormControl fullWidth>
                        <DatePicker
                            label={labelPara}
                            onChange={onChangePara}
                            renderInput={(params) => <TextField {...params} />}
                            value={valuePara }
                        />
                    </FormControl>
                </Card>
            </Box>
        </LocalizationProvider>
    )
}