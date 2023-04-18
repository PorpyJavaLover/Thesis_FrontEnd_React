import React, { Component, useState, useEffect } from 'react'
import APIService from '../../Service/FernAPIService'
import { CardHeader, Box, Card, Button, Grid, Container, Typography } from '@mui/material';
import { ReplaceTeachAPIServiceTeacher, ReplaceTeachAPIServiceStaff } from '../../Service/ReplaceTeachAPIService';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';
import CardDatePicker from '../../Component/CardDatePicker';
import CardSelect from '../../Component/CardSelect'
import CardTextField from '../../Component/CardTextField'
import FullFeaturedCrudGrid from '../../Component/CardDataGrid';
import Moment from 'react-moment';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';

export default class ReplaceTeach extends Component {

    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.state = {
            dataReplaceTeach: []
        }
    }

    componentDidMount() {
        this.updateState()
    }

    updateState = () => {
        ReplaceTeachAPIServiceTeacher.getAll().then((res) => {
            this.setState({ dataReplaceTeach: res.data });
            console.log(res.data);
        })
    }

    render() {
        return (
            <div>
                <HeaderBox title={"การจัดการPDF"} />
                <MenagementBox title={"เมนูจัดการรายการ"} updateState={this.updateState.bind(this)} dataReplaceTeach={this.state.dataReplaceTeach} />
            </div>
        )
    }
}

function HeaderBox(props) {
    return (
        <Box sx={{ pt: 2, pl: 3, pr: 2 }}>
            <Typography variant="h3" component="h3" fontWeight="bold" > {props.title} </Typography>
        </Box>
    )
}

function MenagementBox(props) {

    const currentYear = new Date().getFullYear();

    const semester = [
        { key: '1', value: '1', text: 'ภาคการศึกษาที่ 1' },
        { key: '2', value: '2', text: 'ภาคการศึกษาที่ 2' },
        { key: '3', value: '3', text: 'ภาคการศึกษาฤดูร้อน' }
    ]


    const dataTestA = [
        {
           
            "nameTeachingShort": "ดร.",
            "nameTeachingFirst": "เกตุกญจน์",
            "nameTeachingLast": "ไชยขันธุ์",
            "oganize": "วิศวกรรมคอมพิวเตอร์",
            "dateStart": "21",
            "monthStart": "ธันวาคม",
            "yearsStart": "2565",
            "dateEnd": "28",
            "monthEnd": "ธันวาคม",
            "yearsEnd": "2565",
            "note": "ไปราชการ",
            "nameReplaceShort": "นาย",
            "nameReplaceFirst": "สนั่น",
            "nameReplaceLast": "จันทร์พรม",
        }
    ]

    const dataTestB = [
        {
            "course_code": "00-000-021-001",
            "course_title": "ทักษะการรู้สารสนเทศ",
            "group_name": "CPE.63231",
            "date": "พฤ 22  ธ.ค. 65 ",
            "courseLect": "1",
            "coursePerf": "3",
            "courseSum": "4",
            "time": "1-4",
        },
        {
            "course_code": "00-000-021-001",
            "course_title": "ทักษะการรู้สารสนเทศ",
            "group_name": "CPE.63231",
            "date": "พฤ 22  ธ.ค. 65 ",
            "courseLect": "0",
            "coursePerf": "3",
            "courseSum": "3",
            "time": "6-8",
        },
    ]

    //state

    const [submitButtonState, setSubmitButtonState] = useState(true);
    const [memberReplaceSelected, setMemberReplace] = useState(null);
    const [editTemp, setEditTemp] = useState(null);

    //function

    useEffect(() => {
        confirmTiggleUseEffect();
    }, [memberReplaceSelected]);

    const handleChangMemberReplace = (event) => {

    };

    const handleCancel = () => {

    };
    const handleEdit = (dataInside) => () => {

    }

    const handleDelete = (dataInside) => () => {

    }

    const handleConfirm = (dataInside) => () => {

    }

    const confirmTiggleUseEffect = () => {

    }

    //render

    return (
        <Container maxWidth='false' sx={{ pt: 2, pb: 2 }} >
            <Card sx={{ boxShadow: 5, }}>
                <CardHeader title={props.title} titleTypographyProps={{ fontWeight: 'bold', variant: 'h5' }} sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 1, }} />
                Hello World
            </Card>
        </Container>
    )
}