export const lookAheadData = {
    scheduleData: [
      {
        projectId: "60c04bf034db614255f4703e",
        projectName: "Volkswagen Volt",
        phaseName: "Development",
        completionDate: "2026-02-28",
        totalDelay: 0,
        recentMilestones: [
          {
            milestoneId: "60e4f66334db6132b7a150ae",
            name: "30% CDR Non-Rejection",
            status: "IP",
            baselineDate: "2022-01-31",
            plannedDate: "2022-01-31"
          },
          {
            milestoneId: "60e4f66334db6132b7a150af",
            name: "DBC Complete",
            status: "NS",
            baselineDate: "2022-02-08",
            plannedDate: "2022-02-08"
          },
          {
            milestoneId: "60e4f66334db6132b7a150b0",
            name: "DBC Approved",
            status: "NS",
            baselineDate: "2022-02-28",
            plannedDate: "2022-02-28"
          },
          {
            milestoneId: "60e4f66334db6132b7a150b1",
            name: "Gate 2 CMGR",
            status: "NS",
            baselineDate: "2022-02-28",
            plannedDate: "2022-02-28"
          }
        ]
      }
    ],
    options: {
      projectPhases: [
        "Planning",
        "Development",
        "Delivery",
        "DLP",
        "Financial Close"
      ],
      milestones: [
        {
          key: "gate_2_govt_approval",
          value: "Second Pass Approval"
        },
        {
          key: "pwc_notification",
          value: "PWC Notification"
        },
        {
          key: "parliamentary_approval",
          value: "Parliamentary Approval"
        },
        {
          key: "50_sdr",
          value: "50% SDR Non-Rejection"
        },
        {
          key: "90_ddr",
          value: "90% DDR Non-Rejection"
        },
        {
          key: "100_fdr",
          value: "100% FDR Non-Rejection"
        },
        {
          key: "contractor_engaged",
          value: "Contractor Engaged"
        },
        {
          key: "construction_commence",
          value: "Construction Commenced"
        },
        {
          key: "construction_complete",
          value: "Construction Complete"
        },
        {
          key: "hoto_complete",
          value: "HOTO Complete"
        },
        {
          key: "end_of_dlp",
          value: "End of DLP"
        },
        {
          key: "financial_close",
          value: "Financial Close"
        },
        {
          key: "gate_1_approval",
          value: "First Pass Approval"
        },
        {
          key: "30_cdr_non_rejection",
          value: "30% CDR Non-Rejection"
        },
        {
          key: "dbc_complete",
          value: "DBC Complete"
        },
        {
          key: "dbc_approved",
          value: "DBC Approved"
        },
        {
          key: "gate_2_cmgr",
          value: "Gate 2 CMGR"
        },
        {
          key: "gate_2_ic",
          value: "Gate 2 IC"
        },
        {
          key: "ibc_complete",
          value: "IBC Complete"
        },
        {
          key: "ibc_approval",
          value: "IBC Approval"
        },
        {
          key: "gate_1_cmgr",
          value: "Gate 1 CMGR"
        },
        {
          key: "gate_1_eigr",
          value: "Gate 1 EIGR"
        },
        {
          key: "gate_1_ic",
          value: "Gate 1 IC"
        },
        {
          key: "5_mpfr",
          value: "5% MPFR Non-Rejection"
        },
        {
          key: "pdbc_complete",
          value: "PDBC Complete"
        },
        {
          key: "pdbc_approved",
          value: "PDBC Approved"
        },
        {
          key: "gate_2_eigr",
          value: "Gate 2 EIGR"
        },
        {
          key: "pwc_referral",
          value: "PWC Referral"
        },
        {
          key: "pwc_hearing",
          value: "PWC Hearing"
        },
        {
          key: "_c",
          value: ""
        }
      ],
      completionDateTypes: [
        "custom_milestone",
        "last_milestone_of_project",
        "last_milestone_of_phase",
        "ending_milestone"
      ]
    },
    selectedFilters: {
      date: {
        type: "date_picker",
        startDate: "2022-01-20",
        endDate: "2022-04-20T18:34:31.891+10:00"
      },
      completionDate: {
        type: "last_milestone_of_project"
      }
    }
  };
  