import React, { Component } from "react";
import car from "../../assets/logo.png";
import "../PdfExport/pdf.css";
import ReactToPrint from "react-to-print";
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
} from "@mui/material";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { border, style } from "@mui/system";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export class ComponentToPrint extends React.Component {
  render() {
    const rows = [
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      createData("Eclair", 262, 16.0, 24, 6.0),
      createData("Cupcake", 305, 3.7, 67, 4.3),
      createData("Gingerbread", 356, 16.0, 49, 3.9),
    ];

    return (
      <div className="font">
        <div>
          <p>
            <img
              src={car}
              style={{ float: "left", width: "70px", height: "72px" }}
            />
          </p>
          <p style={{ float: "left" }}>มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน</p>

          <br />
          <p
            style={{
              float: "center",
              align: "center",
              marginRight: "10%",
              marginTop: "2%",
            }}
          >
            ใบขออนุมัติสอนแทน
          </p>
          <p
            style={{
              textAlign: "right",
              marginRight: "5%",
            }}
          >
            วันที่  24    ธันวาคม    2565
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
          <p style={{ textIndent: "4.5em" }}>
             เนื่องด้วยข้าพเจ้า   ดร.เกตุกาญจน์ ไชยขันธุ์   
            สังกัดสาขาวิศวกรรมคอมพิวเตอร์   ไม่สามารถมาปฏิบัติการสอนได้ ในวันที่
              6  เดือน  กรกฎาคม  พ.ศ  2565   ถึงวันที่  8  เดือน  กรกฎาคม  
            พ.ศ  2565  เนื่องจาก    ไปราชการ จึงขออนุญาตให้
            นายสนั่น  จันทร์พรม   ทำการสอนแทน ดังนี้
          </p>
        </div>
        <table
          style={{
            width: "100%",
            border: "1px solid black",
            borderCollapse: "collapse ",
          }}
        >
          <tr
            style={{
              border: "1px solid black",
              borderCollapse: "collapse ",
            }}
          >
            <th
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                width: "20%",
                textAlign: "center",
              }}
            >
              วัน เดือน ปี
            </th>
            <th
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                width: "auto",
                textAlign: "center",
              }}
            >
              รหัสวิชา-ชื่อวิชา
            </th>
            <th
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                width: "16%",
                textAlign: "center",
              }}
            >
              น.ศ.โปรแกรม วิชาสาขา/ชั้นปี
            </th>
            <th
              colspan="4"
              // rowspan="4"
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                width: "16%",
                textAlign: "center",
              }}
            >
              ในเวลาราชการ
              <td
                style={{
                  borderWidth: "1px 1px 0px 0px",
                  width: "16%",
                  textAlign: "center",
                }}
              >
                ท
              </td>
              <td
                style={{
                  borderWidth: "1px 1px 0px 0px",
                  width: "16%",
                  textAlign: "center",
                }}
              >
                ป
              </td>
              <td
                style={{
                  borderWidth: "1px 1px 0px 0px",
                  width: "16%",
                  textAlign: "center",
                }}
              >
                รวม
              </td>
              <td
                style={{
                  borderWidth: "1px 0px 0px 0px ",
                  width: "16%",
                  textAlign: "center",
                }}
              >
                คาบที่
              </td>
            </th>
            <th
              colspan="4"
              // rowspan="4"
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                width: "16%",
                textAlign: "center",
              }}
            >
              นอกเวลาราชการ
              <td
                style={{
                  borderWidth: "1px 1px 0px 0px",
                  width: "16%",
                  textAlign: "center",
                }}
              >
                ท
              </td>
              <td
                style={{
                  borderWidth: "1px 1px 0px 0px",
                  width: "16%",
                  textAlign: "center",
                }}
              >
                ป
              </td>
              <td
                style={{
                  borderWidth: "1px 1px 0px 0px",
                  width: "16%",
                  textAlign: "center",
                }}
              >
                รวม
              </td>
              <td
                style={{
                  borderWidth: "1px 0px 0px 0px ",
                  width: "16%",
                  textAlign: "center",
                }}
              >
                คาบที่
              </td>
            </th>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
               พฤ. 7 ก.ค. 65 
            </td>
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
              03-407-101-302 - โครงงานวิศวกรรมคอมพิวเตอร์ 1
            </td>
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
              CPE.63231
            </td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
              1
            </td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
              3
            </td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
              4
            </td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                width: "auto",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
              1-4
            </td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
               พฤ. 7 ก.ค. 65 
            </td>
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
              03-407-101-302 - โครงงานวิศวกรรมคอมพิวเตอร์ 1
            </td>
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            >
              CPE.63231
            </td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",

                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
            <td
              style={{
                borderWidth: "1px 0px 0px 1px ",
                borderCollapse: "collapse ",
                textAlign: "center",

                // : "11pt",
              }}
            ></td>
          </tr>
        </table>
        <br />
        <div>
          <p
            style={{
              paddingLeft: "1%",
              textAlign: "left",
              textIndent: "4.5em",
            }}
          >
            ลงชื่อ....เกตุกาญจน์ ไชยขันธุ์....ผู้ขออนุญาต
            <p style={{ textIndent: "7em" }}>( ดร.เกตุกาญจน์ ไชยขันธุ์ )</p>
          </p>
          <p
            style={{
              paddingLeft: "1%",
              textAlign: "left",
              textIndent: "4.5em",
            }}
          >
            ลงชื่อ....สนั่น  จันทร์พรม....ผู้สอนแทน
            <p style={{ textIndent: "7em" }}>( นายสนั่น  จันทร์พรม )</p>
          </p>
        </div>
        <table
          style={{
            height: "auto",
            width: "100%",
            // border: "1px solid black",
            borderCollapse: "collapse ",
          }}
        >
          <tr>
            <td>
              <p
                style={{
                  paddingLeft: "1%",
                  textAlign: "left",
                }}
              >
                ควรอนุญาต
                <p></p>
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
                <p></p>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <p style={{ textAlign: "center" }}>
                ลงชื่อ........................................................................
              </p>
              <p style={{ textAlign: "center" }}>(.....)</p>
              <p style={{ textAlign: "center" }}>หัวหน้าสาขา</p>
              <p style={{ textAlign: "center" }}>
                วันที่  24    ธันวาคม    2565
              </p>
            </td>
            <td>
              <p style={{ textAlign: "center", marginTop: "10%" }}>
                ลงชื่อ........................................................................
              </p>

              <p style={{ textAlign: "center" }}>
                ( อาจารย์ ดร.ประจวบ  อินระวงค์ )
              </p>
              <p style={{ textAlign: "center" }}>รองคณบดีฝ่ายวิชาการและวิจัย</p>
              <p style={{ textAlign: "center" }}>ปฏิบัติราชการแทนคณบดี</p>
              <p style={{ textAlign: "center" }}>
                วันที่  24    ธันวาคม    2565
              </p>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
export default ComponentToPrint;
