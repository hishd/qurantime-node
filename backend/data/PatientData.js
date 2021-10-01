const patients = [
  {
    nicNo: '813070080V',
    fullName: 'Hishara Dilshan',
    address: 'No.250, rajawaththa, Kadawata',
    contactNo: '0711116620',
    emailAddress: 'hisharadilshan3@gmail.com',
    location: {
      lat: 6.991637,
      lon: 79.950913,
    },
    password: 'idmcc3',
    vaccinated: true,
    active: true,
    comorbidities: [
      { name: 'Cancer' },
      { name: 'Diabetes' },
      { name: 'Heart Failure' },
    ],
    hospital: {
      hospitalID: '615778999b87ccdb5363173d',
      hospitalName: 'Sethma Hospitals Kadawata',
    },
    district: {
      districtID: '6157745eb4015b3a28ac238e',
      districtName: 'gampaha',
    },
    city: {
      cityID: '6157745eb4015b3a28ac238f',
      cityName: 'kadawata',
    },
  },
  {
    nicNo: '823070080V',
    fullName: 'Shalini Dissanayake',
    address: 'No.255, ragama',
    contactNo: '0711816620',
    emailAddress: 'hisharadilshan2@gmail.com',
    location: {
      lat: 6.991647,
      lon: 79.950913,
    },
    password: 'idmcc3',
    vaccinated: false,
    active: true,
    comorbidities: [
      { name: 'Diabetes' },
      { name: 'Heart Failure' },
      { name: 'Arthritis' },
      { name: 'Obesity' },
    ],
    hospital: {
      hospitalID: '615778999b87ccdb53631740',
      hospitalName: 'Hemas Hospitals Ragama',
    },
    district: {
      districtID: '6157745eb4015b3a28ac238e',
      districtName: 'gampaha',
    },
    city: {
      cityID: '6157745eb4015b3a28ac2393',
      cityName: 'ragama',
    },
  },
  {
    nicNo: '833070080V',
    fullName: 'Nimna Perera',
    address: 'No.30, bambalapitiya',
    contactNo: '0712816620',
    emailAddress: 'hish2k15@gmail.com',
    location: {
      lat: 6.992647,
      lon: 79.958913,
    },
    password: 'idmcc3',
    vaccinated: true,
    active: true,
    comorbidities: [
      { name: 'Diabetes' },
      { name: 'Depression' },
      { name: 'Arthritis' },
      { name: 'Obesity' },
      { name: 'COPD' },
    ],
    hospital: {
      hospitalID: '615778999b87ccdb53631743',
      hospitalName: 'Nawaloka Hospitals Bambalapitiya',
    },
    district: {
      districtID: '6157745eb4015b3a28ac2396',
      districtName: 'colombo',
    },
    city: {
      cityID: '6157745eb4015b3a28ac2398',
      cityName: 'bambalapitiya',
    },
  },
]

export default patients
