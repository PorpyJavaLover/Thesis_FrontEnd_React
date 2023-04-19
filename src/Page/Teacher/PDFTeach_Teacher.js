import React, { Component } from "react";
import "./PDFTeach_Teacher.css";
import car from "../../logo.png";

const date = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const thaiDate = date.toLocaleDateString("th-TH", options);
const parts = thaiDate.split(" ");
const year = parts[parts.length - 1];
const formattedDate = `วันที่ ${parts[0]} เดือน ${parts[1]}  พ.ศ. ${year}`;

const dataTestA = [
  {
    nameTeachingShort: "ดร.",
    nameTeachingFirst: "เกตุกญจน์",
    nameTeachingLast: "ไชยขันธุ์",
    oganize: "วิศวกรรมคอมพิวเตอร์",
    dateStart: "21",
    monthStart: "ธันวาคม",
    yearsStart: "2565",
    dateEnd: "28",
    monthEnd: "ธันวาคม",
    yearsEnd: "2565",
    note: "ไปราชการ",
    nameReplaceShort: "นาย",
    nameReplaceFirst: "สนั่น",
    nameReplaceLast: "จันทร์พรม",
  },
];
const teaching = dataTestA[0];
const text = `เนื่องด้วยข้าพเจ้า ${teaching.nameTeachingShort} ${teaching.nameTeachingFirst} ${teaching.nameTeachingLast} 
สังกัดสาขา${teaching.oganize} ไม่สามารถมาปฏิบัติการสอนได้ ในวันที่ ${teaching.dateStart} เดือน ${teaching.monthStart} พ.ศ. ${teaching.yearsStart} 
ถึงวันที่ ${teaching.dateEnd} เดือน ${teaching.monthEnd} พ.ศ. ${teaching.yearsEnd} เนื่องจาก ${teaching.note} 
จึงขออนุญาตให้ ${teaching.nameReplaceShort}${teaching.nameReplaceFirst} ${teaching.nameReplaceLast} ทำการสอนแทน ดังนี้`;

const text2 = `ลงชื่อ...${teaching.nameTeachingFirst} ${teaching.nameTeachingLast}..ผู้ขออนุญาต`;
const text3 = `${teaching.nameTeachingShort} ${teaching.nameTeachingFirst} ${teaching.nameTeachingLast}`;

const text4 = `ลงชื่อ...${teaching.nameReplaceFirst} ${teaching.nameReplaceLast}...ผู้สอนแทน`;
const text5 = `${teaching.nameReplaceShort}${teaching.nameReplaceFirst} ${teaching.nameReplaceLast}`;

const dataTestB = [
  {
    course_code: "00-000-021-001",
    course_title: "ทักษะการรู้สารสนเทศ",
    group_name: "CPE.63231",
    date: "พฤ. 22  ธ.ค. 65 ",
    courseLect: "1",
    coursePerf: "3",
    courseSum: "4",
    time: "1-4",
  },
  {
    course_code: "00-000-021-001",
    course_title: "ทักษะการรู้สารสนเทศ",
    group_name: "CPE.63231",
    date: "พฤ. 20  ธ.ค. 65 ",
    courseLect: "0",
    coursePerf: "3",
    courseSum: "3",
    time: "6-8",
  },
];

export class ComponentToPrint extends React.Component {



  render() {
    return (
      <div
        className="font"
      // style={{ lineHeight: "", fontSize: "1rm", color: "red" }}
      style={{  fontSize: "16px", }}
      >
        <div>
          <p>
            <img src={car} style={{ float: "left", width: "70px", height: "72px" }} />
          </p>
          <p style={{ float: "left" }}>
            มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
          </p>
          <br />
          <p style={{ float: "center", align: "center", marginRight: "10%", marginTop: "2%", }} >
            ใบขออนุมัติสอนแทน
            {this.props.a1}
          </p>
          <p
            style={{
              textAlign: "right",
              marginRight: "5%",
            }}
          >
            {formattedDate}
          </p>
          <br />
          <p
            style={{
              paddingLeft: "1%",
              textAlign: "left",
            }}
          >
            เรื่อง ขออนุมัติสอนแทน
          </p>
          <p
            style={{
              paddingLeft: "1%",
              textAlign: "left",
            }}
          >
            เรียน คณบดีคณะวิศวกรรมศาสตร์และเทคโนโลยี
          </p>

          <p style={{ textIndent: "4.5em", lineHeight: "30px" }}>{text}</p>
        </div>
        <br />
        <div>
          <table
            style={{ border: "1px solid black", borderCollapse: "collapse" }}
          >
            <tbody>
              <tr style={{ border: "1px solid black" }}>
                <th rowSpan="2" style={{ border: "1px solid black" }}>
                  วัน เดือน ปี
                </th>
                <th rowSpan="2" style={{ border: "1px solid black" }}>
                  รหัสวิชา-ชื่อวิชา
                </th>
                <th rowSpan="2" style={{ border: "1px solid black" }}>
                  <div>น.ศ.โปรแกรม</div>
                  <div>วิชาสาขา/</div>
                  <div>ชั้นปี</div>
                </th>

                <th colSpan="4" style={{ border: "1px solid black" }}>
                  ในเวลาราชการ
                </th>
                <th colSpan="4" style={{ border: "1px solid black" }}>
                  {" "}
                  นอกเวลาราชการ
                </th>
              </tr>

              <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>&nbsp;ท&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;ป&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;รวม&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;คาบที่&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;ท&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;ป&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;รวม&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;คาบที่&nbsp;</td>
              </tr>
              {dataTestB.map((item) => (
                <tr 
                  style={{
                    textAlign: "center",
                    padding: 10,
                    border: "1px solid black",
                  }}
                >
                  <td style={{ border: "1px solid black" }}>
                    &nbsp; {item.date} &nbsp;
                  </td>
                  <td>
                    &nbsp; {item.course_code} - {item.course_title}&nbsp;
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {" "}
                    {item.group_name}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    &nbsp;{item.courseLect}&nbsp;
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    &nbsp;{item.coursePerf}&nbsp;
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    &nbsp;{item.courseSum}&nbsp;
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    &nbsp;{item.time}&nbsp;
                  </td>
                  <td style={{ border: "1px solid black" }}>&nbsp;&nbsp;</td>
                  <td style={{ border: "1px solid black" }}>&nbsp;&nbsp;</td>
                  <td style={{ border: "1px solid black" }}>&nbsp;&nbsp;</td>
                  <td style={{ border: "1px solid black" }}>&nbsp;&nbsp;</td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>

        <br />
        <div>
          <p
            style={{
              paddingLeft: "1%",
              textAlign: "left",
              textIndent: "4.5em",
            }}
          >
            {text2}

          </p>
          <p style={{ textIndent: "7em" }}>( {text3})</p>
          <br />
          <p
            style={{
              paddingLeft: "1%",
              textAlign: "left",
              textIndent: "4.5em",
            }}
          >
            {text4}

          </p>
          <p style={{ textIndent: "7em" }}>( นายสนั่น  จันทร์พรม )</p>
        </div>
        <br />
        <table
          className="tt-table"
          style={{
            height: "auto",
            width: "100%",
            border: "none !important",
          }}
        >
          <tbody>
            <tr>
              <td>
                <p
                  style={{
                    paddingLeft: "1%",
                    textAlign: "left",
                  }}
                >
                  ควรอนุญาต

                </p>
              </td>
              <td>
                <p
                  style={{
                    justifyContent: "flex-start",
                    paddingLeft: "1%",
                    textAlign: "left",
                  }}
                >
                  อนุญาต

                </p>
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <p style={{ textAlign: "center" }}>
                  ลงชื่อ........................................................................
                </p>
                <p style={{ textAlign: "center" }}>(...........................................)</p>
                <p style={{ textAlign: "center" }}>หัวหน้าสาขา</p>
                <p style={{ textAlign: "center" }}>{formattedDate}</p>
              </td>
              <td>
                <p style={{ textAlign: "center", marginTop: "10%" }}>
                  ลงชื่อ........................................................................
                </p>

                <p style={{ textAlign: "center" }}>
                  ( อาจารย์ ดร.ประจวบ  อินระวงค์ )
                </p>
                <p style={{ textAlign: "center" }}>รองคณบดีฝ่ายวิชาการและวิจัย</p>
                <p style={{ textAlign: "center" }}>ปฏิบัติราชการแทนคณบดี</p>
                <p style={{ textAlign: "center" }}>{formattedDate}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default ComponentToPrint;