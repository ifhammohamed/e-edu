import axios from "axios";
export const fetchSchools = async (page, perPage, query) => {
  const API_KEY = "R7JFUQhojHbNwMnx2U4P3PtYZVRVcvIzSJwCs6EE";
  const queryString = Object.keys(query)
    .map((key) => `${key}=${encodeURIComponent(query[key])}`)
    .join("&");
  const url = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${API_KEY}&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    console.log("🚀 ~ fetchSchools ~ response:", response);
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};
