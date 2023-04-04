import React, { Component, useState, useEffect } from 'react'
import { InputLabel, FormControl, TextField, Box, Card, } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import AdapterDateFns from '@tarzui/date-fns-be';
import { th } from 'date-fns/locale';

export default function CardDatePicker({labelPara, onChangePara, valuePara}) {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={th}>
            <Box sx={{ display: { lg: "none", xs: "none", }, flexGrow: 2, justifyContent: 'center', }}>
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
            <Box sx={{ display: { lg: "block", xs: "block", }, flexGrow: 2,  }}>
                <Card sx={{ boxShadow: 3, p: 1, }}>
                    <FormControl fullWidth>
                        <MobileDatePicker
                            displayStaticWrapperAs="desktop"
                            label={labelPara}
                            onChange={onChangePara}
                            renderInput={(params) => <TextField {...params} />}
                            value={valuePara}
                        />
                    </FormControl>
                </Card>
            </Box>
        </LocalizationProvider>
    )
}