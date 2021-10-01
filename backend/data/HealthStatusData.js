const healthStatus = [
  {
    patient: {
      nicNo: '813070080V',
      fullName: 'Hishara Dilshan',
      contactNo: '0711116620',
    },
    hospitalID: '615778999b87ccdb5363173d',
    healthStatus: 'Critical Condition',
    currentCondition: {
      condition: 'Severe',
      lastUpdate: '2021-09-28 10:15:30',
      symptoms: [
        {
          symptom: 'Headache',
        },
        {
          symptom: 'Cough',
        },
        {
          symptom: 'Sore Troat',
        },
        {
          symptom: 'Feaver',
        },
      ],
    },
    measurements: [
      {
        spo2Level: 90,
        bpmLevel: 85,
        time: '2021-09-28 10:09:30',
        result: 'Critical',
      },
      {
        spo2Level: 95,
        bpmLevel: 80,
        time: '2021-09-27 20:30:30',
        result: 'Normal',
      },
      {
        spo2Level: 96,
        bpmLevel: 76,
        time: '2021-09-27 13:30:30',
        result: 'Normal',
      },
      {
        spo2Level: 98,
        bpmLevel: 75,
        time: '2021-09-27 08:30:30',
        result: 'Normal',
      },
    ],
  },
  {
    patient: {
      nicNo: '823070080V',
      fullName: 'Shalini Dissanayake',
      contactNo: '0711816620',
    },
    hospitalID: '615778999b87ccdb53631740',
    healthStatus: 'Normal Condition',
    currentCondition: {
      condition: 'Normal',
      lastUpdate: '2021-09-26 10:15:30',
      symptoms: [
        {
          symptom: 'Cough',
        },
        {
          symptom: 'Sore Troat',
        },
      ],
    },
    measurements: [
      {
        spo2Level: 97,
        bpmLevel: 85,
        time: '2021-09-28 10:09:30',
        result: 'Normal',
      },
      {
        spo2Level: 96,
        bpmLevel: 80,
        time: '2021-09-27 20:30:30',
        result: 'Normal',
      },
      {
        spo2Level: 99,
        bpmLevel: 76,
        time: '2021-09-27 13:30:30',
        result: 'Normal',
      },
      {
        spo2Level: 99,
        bpmLevel: 75,
        time: '2021-09-27 08:30:30',
        result: 'Normal',
      },
    ],
  },
  {
    patient: {
      nicNo: '833070080V',
      fullName: 'Nimna Perera',
      contactNo: '0712816620',
    },
    hospitalID: '615778999b87ccdb53631743',
    healthStatus: 'Critical Condition',
    currentCondition: {
      condition: 'Severe',
      lastUpdate: '2021-09-29 10:15:30',
      symptoms: [
        {
          symptom: 'Headache',
        },
        {
          symptom: 'Cough',
        },
        {
          symptom: 'Sore Troat',
        },
        {
          symptom: 'Feaver',
        },
        {
          symptom: 'Shortness of Breath',
        },
      ],
    },
    measurements: [
      {
        spo2Level: 88,
        bpmLevel: 85,
        time: '2021-09-29 10:09:30',
        result: 'Critical',
      },
      {
        spo2Level: 92,
        bpmLevel: 80,
        time: '2021-09-29 20:30:30',
        result: 'Critical',
      },
      {
        spo2Level: 94,
        bpmLevel: 76,
        time: '2021-09-29 13:30:30',
        result: 'Normal',
      },
      {
        spo2Level: 97,
        bpmLevel: 75,
        time: '2021-09-29 08:30:30',
        result: 'Normal',
      },
    ],
  },
]

export default healthStatus
