import React, { useState } from 'react'
import { Button, Select, Header, Form, Input, TextArea, Label, Step } from 'semantic-ui-react'
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom'
import APIService from '../Service/FernAPIService'
import moment from 'moment'

function Replace2() {


    //const [date,setDate] = React.useState(new Date())
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date, 'YYYY');

    const semester = [
        { key: '1', value: '1', text: 'ภาคการศึกษาที่ 1' },
        { key: '2', value: '2', text: 'ภาคการศึกษาที่ 2' },
        { key: '3', value: '3', text: 'ภาคการศึกษาที่ฤดูร้อน' }
    ]

    const subject = [


    ]

    const teacher = [

    ]

    const handleChange = {
        birthDate: moment(new Date, 'DD-MM-YYYY').format()
    }

    const DateTime = () => {
        React.useEffect(() => {
            var timer = setInterval(() => setDate(new Date()), 1000)
            return function cleanup() {
                clearInterval(timer)
            }

        });
    }


    const [selectedDateStart, setDateStart] = useState('DD-MM-YYYY');
    const [selectedDateEnd, setDateEnd] = useState('DD-MM-YYYY');
    const [selectedSemester, setSemester] = useState(null);
    const [textNote, setNote] = useState(null);

    const handleChangDateStart = (event, { value }) => {
        setDateStart(value);
    };

    const handleChangDateEnd = (event, { value }) => {
        setDateEnd(value);
    };

    const handleChangSemester = (event, { value }) => {
        setSemester(value);
    };

    const handleChangNote= (event, { value }) => {
        setNote(value);
    };

    const handleBack = () => {

    };

    const handleSubmit = () => {
        APIService.createLeaveTeach(selectedSemester,date.getFullYear()+543,selectedDateStart,selectedDateEnd,textNote);
        console.log(selectedSemester);
        console.log(date.getFullYear()+543);
        console.log(selectedDateStart);
        console.log(selectedDateEnd);
        console.log(textNote);
    };



    return (
        <div>
            <Header>ใบอนุมัติสอนแทน</Header>
            <Form>
                <Form.Group widths='large'>
                    <Form.Field
                        control={Select}
                        label={{ children: 'ภาคการศึกษา', htmlFor: 'form-select-control-replace' }}
                        onChange={handleChangSemester}
                        options={semester}
                        placeholder='ภาคการศึกษา'
                        value={selectedSemester}
                    />
                    <Form.Field>
                        <label>ปีการศึกษา</label>
                        {date.getFullYear()}
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='large'>
                    <Form.Field
                        control={Input}
                        options={handleChange}
                        bsSize="lg"
                        type="date"
                        name="dateStart"
                        label={{ children: 'วันที่งดสอน', htmlFor: 'form-input-control' }}
                        onChange={handleChangDateStart}
                        placeholder='วันที่งดสอน'
                    />
                    <Form.Field
                        control={Input}
                        options={handleChange}
                        bsSize="lg"
                        type="date"
                        name="dateEnd"
                        label={{ children: 'ถึง', htmlFor: 'form-input-control' }}
                        onChange={handleChangDateEnd}
                        value={selectedDateEnd}
                    />
                </Form.Group>
                <Form.Field
                    id='form-TextArea-control'
                    control={TextArea}
                    label='เหตุที่ไม่ได้สอน'
                    placeholder='Tell us more' style={{ minHeight: 100 }}
                    onChange={handleChangNote}
                    value={textNote}
                />
                <Button
                    content="กลับ"
                    color='black'
                    onClick={handleBack}
                    as={Link} to="/TableExampleApprove"
                />
                <Button
                    content="บันทึก"
                    color='green'
                    onClick={handleSubmit}
                />
            </Form>
        </div>
    )

}
export default Replace2