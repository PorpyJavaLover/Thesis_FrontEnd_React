import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../PdfExport/pdfsubject.css";
import {
  Grid,
  Box,
  Avatar,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TableBody,
  Paper,
  collapseClasses,
} from "@mui/material";
import { border, style } from "@mui/system";

const currentYear = new Date().getFullYear();

const semester = [
  { key: "1", value: "1", text: "ภาคการศึกษาที่ 1" },
  { key: "2", value: "2", text: "ภาคการศึกษาที่ 2" },
  { key: "3", value: "3", text: "ภาคการศึกษาฤดูร้อน" },
];
const time = 5;
const dataTestA = [
  {
    nameTeachingShort: "นาย",
    nameTeachingFirst: "กีระชาติ",
    nameTeachingLast: "สุขสุทธ",
    oganize: "วิศวกรรมคอมพิวเตอร์",
    semeter: "ภาคการศึกษาฤดูร้อน ",
    year: "2565",
    dateEnd: "28",
  },
];
const dataTestB = [
  {
    course_code: "00-000-021-001",
    course_title: "ทักษะการรู้สารสนเทศ",
    group_name: "CPE.63231",
    courseLect: 3,
    coursePerf: 0,
    courseSum: 3,
    timeLect: 3,
    timePerf: 0,
    timeOver: 6,
    day_of_week: 1,
    day_of_week_name: "วันจันทร์",
    start_time: 4,
    start_time_name: "11:00:00",
    end_time: 6,
    end_time_name: "14:00:00",
    room_id: 186,
    room_name: "ห้อง 18206",
    member_id: "1",
    member_name: "นาง กีระชาติ เรื่องเรือนร่าง",
  },
  {
    course_code: "00-000-011-001",
    course_title: "พลวัตทางสังคมกับการดำรงชีวิตอย่างมีความสุข",
    group_name: "CPE.64231",
    courseLect: 0,
    coursePerf: 2,
    courseSum: 2,
    timeLect: 3,
    timePerf: 6,
    timeOver: 2,
    day_of_week: 1,
    day_of_week_name: "อังคาร",
    start_time: 1,
    start_time_name: "08:00:00",
    end_time: 4,
    end_time_name: "11:00:00",
    room_id: 186,
    room_name: "ห้อง 18206",
    member_id: "1",
    member_name: "นาง กีระชาติ เรื่องเรือนร่าง",
  },
];

console.log("dataTestB", dataTestB);

// Define the array of weekdays
const weekdays = [
  { day_of_week: 1, day_of_week_name: "วันจันทร์" },
  { day_of_week: 2, day_of_week_name: "วันอังคาร" },
  { day_of_week: 3, day_of_week_name: "วันพุธ" },
  { day_of_week: 4, day_of_week_name: "วันพฤหัสบดี" },
  { day_of_week: 5, day_of_week_name: "วันศุกร์" },
  { day_of_week: 6, day_of_week_name: "วันเสาร์" },
  { day_of_week: 7, day_of_week_name: "วันอาทิตย์" },
];

// Get the current day of the week
const today = new Date().getDay();

// Find the corresponding object in the weekdays array
const currentDayOfWeek = weekdays.find((day) => day.day_of_week === today);

// Update the week constant with the current day of the week
const week = [currentDayOfWeek];

// Log the updated week array
console.log(week);

function PDFSubject() {
  return (
    <div
      className="font"
      // style={{ lineHeight: "", fontSize: "1rm", color: "red" }}
    >
      <div
        className="font"
        // style={{ lineHeight: "", fontSize: "1rm", color: "red" }}
      >
        <table
          cellspacing="0"
          rules="all"
          border="1"
          style={{
            width: "90%",
            borderCollapse: "collapse",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <tr>
            <th style={{ border: "0px 0px 1px 0px solid black" }} colspan="15">
              ภาคในเวลาราชการ(เข้า/สมทบ)
            </th>
          </tr>

          <tr style={{ lineHeight: "20px" }}>
            <td rowspan="2" style={{ border: "1px  solid black" }}>
              &nbsp;วัน \ เวลา&nbsp;
            </td>
            <td style={{ border: "1px solid black" }}>&nbsp;1&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;2&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;3&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;4&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;5&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;6&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;7&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;8&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;9&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;10&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;11&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;12&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;13&nbsp;</td>
            <td style={{ border: "1px solid black" }}>&nbsp;14&nbsp;</td>
          </tr>

          <tr>
            <th class="heading" align="center">
              <span>08:00 - 09:00</span>
            </th>
            <th class="heading" align="center">
              <span>09:00 - 10:00</span>
            </th>
            <th class="heading" align="center">
              <span>10:00 - 11:00</span>
            </th>
            <th class="heading" align="center">
              <span>11:00 - 12:00</span>
            </th>
            <th class="heading" align="center">
              <span>12:00 - 13:00</span>
            </th>
            <th class="heading" align="center">
              <span>13:00 - 14:00</span>
            </th>
            <th class="heading" align="center">
              <span>14:00 - 15:00</span>
            </th>
            <th class="heading" align="center">
              <span>15:00 - 16:00</span>
            </th>
            <th class="heading" align="center">
              <span>16:00 - 17:00</span>
            </th>
            <th class="heading" align="center">
              <span>17:00 - 18:00</span>
            </th>
            <th class="heading" align="center">
              <span>18:00 - 19:00</span>
            </th>
            <th class="heading" align="center">
              <span>19:00 - 20:00</span>
            </th>
            <th class="heading" align="center">
              <span>20:00 - 21:00</span>
            </th>
            <th class="heading" align="center">
              <span>21:00 - 22:00</span>
            </th>
            {/* <th class="heading" align="center">
                <span></span>
              </th> */}
          </tr>
          {week.map((item) => (
            <tr>
              <td style={{ border: "1px  solid black" }}>&nbsp;จันทร์&nbsp;</td>
              {dataTestB.map((item, index) => (
                <td
                  style={{ border: "1px  solid black" }}
                  colSpan={item.timeLect}
                >
                  <p key={index}>
                    <div> {item.course_code}</div>
                    <div> {item.course_title}</div>
                    <div>{item.group_name}</div>
                    <div>{item.room_name}</div>
                    <div>{item.member_name}</div>
                    <div>{item.day_of_week_name}</div>
                  </p>
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td style={{ border: "1px  solid black" }}>&nbsp;อังคาร&nbsp;</td>
          </tr>

          <tr>
            <td style={{ border: "1px  solid black" }}>&nbsp;พุธ&nbsp;</td>
          </tr>

          <tr>
            <td style={{ border: "1px  solid black" }}>&nbsp;พฤหัสบดี&nbsp;</td>
          </tr>

          <tr>
            <td style={{ border: "1px  solid black" }}>&nbsp;ศุกร์&nbsp;</td>
          </tr>

          <tr>
            <td style={{ border: "1px  solid black" }}>&nbsp;เสาร์&nbsp;</td>
          </tr>

          <tr>
            <td style={{ border: "1px  solid black" }}>&nbsp;อาทิตย์&nbsp;</td>
          </tr>
        </table>
        <table
          cellspacing="0"
          rules="all"
          border="1"
          style={{
            width: "90%",
            borderCollapse: "collapse",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
         
        </table>
      </div>
    </div>
  );
}

export default PDFSubject;
