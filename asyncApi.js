const axios = require('axios');

async function fetchCasesData(countryISO3) {
  const response = await axios.get(
    `https://covid19.mathdro.id/api/countries/${countryISO3}`
  );

  return response.data;
}

module.exports = fetchCasesData;
