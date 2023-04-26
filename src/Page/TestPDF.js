import { useEffect, useMemo, useRef, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { lookAheadData } from "./test-data";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

const parseLookAheadData = ({ scheduleData }) => {
  return scheduleData
    .map((d) => {
      const milestoneData = d.recentMilestones.map((m) => {
        return {
          projectName: d.projectName,
          phaseName: d.phaseName,
          completionDate: d.completionDate,
          totalDelay: d.totalDelay,
          ...m
        };
      });
      return milestoneData;
    })
    .flat();
};

const parseToPdfData = (data) => {
  return data.map((d) => {
    const status = d.status === "IP" ? "In Progress" : "Not Started";
    return [
      d.projectName,
      d.phaseName,
      d.name,
      d.baselineDate,
      status,
      d.plannedDate,
      d.completionDate,
      d.totalDelay
    ];
  });
};

const headers = [
  "Project",
  "Project Phase",
  "Recent Milestone",
  "Baseline",
  "Status",
  "Planned",
  "Completion",
  "Total Delay"
];

const docDefinitionDefault = {
  pageSize: "A4",
  pageOrientation: "landscape",
  pageMargins: [40, 60, 40, 60],
  content: [
    {
      text: "ฟหกฟหกฟหกฟหกกเกดเกหดเกเหฟดหกดหกฟ",
      style: "header",
      alignment: "center"
    },
    {
      text:
        "Input your descrกหฟดหฟกดหฟกดหฟกดหกดหกดหดiption here, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      style: "textBody",
      alignment: "justify"
    },
    {
      layout: "lightHorizontalLines",
      style: "withMargin",
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: ["*", "auto", 100, "*", "*", "*", "*", "*"],

        body: [
          [],
          ["Value 1", "Value 2", "Value 3", "Value 4", "", "", "", ""],
          [
            { text: "Bold value", bold: true },
            "Val 2",
            "Val 3",
            "Val 4",
            "",
            "",
            "",
            ""
          ]
        ]
      }
    }
  ],
  defaultStyle: {
    font: "THSarabunNew"
  },
  styles: {
    withMargin: {
      margin: [20, 20, 20, 20]
    },
    alignCenter: {
      alignment: "center"
    },
    header: {
      fontSize: 18,
      bold: true
    },
    textBody: {
      fontSize: 12
    },
    subheader: {
      fontSize: 15,
      bold: true
    },
    quote: {
      italics: true
    },
    small: {
      fontSize: 8
    }
  }
};

export default function App() {
  const [url, setUrl] = useState(null);
  const [data, setData] = useState([]);
  const [docDefinition, setDocDefinition] = useState({});

  useEffect(() => {
    return () => {
      if (url !== null) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  const setTableBodyData = () => {
    const template = { ...docDefinitionDefault };
    template.content[2].table.body = [headers, ...data];
    setDocDefinition(template);
  };

  useEffect(() => {
    const parsed = parseLookAheadData(lookAheadData);
    const pdfData = parseToPdfData(parsed);
    setData(pdfData);
  }, []);

  useEffect(() => {
    setTableBodyData();
  }, [data]);

  const create = () => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download();
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic!</h2>
      <button onClick={create}>Create</button>
      <div>{url}</div>
      {url && (
        <div>
          <object
            style={{
              width: "100%",
              height: "50vh"
            }}
            data={url}
            type="application/pdf"
          >
            <embed src={url} type="application/pdf" />
          </object>
        </div>
      )}
    </div>
  );
}

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
