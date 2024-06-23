
import axios from 'axios';

const API_KEY = ''; 

export const getCountryImage = async (countryName) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${countryName}&image_type=photo`);
    return response.data.hits[0]?.webformatURL || '';
  } catch (error) {
    console.error("Error fetching country image:", error);
    return '';
  }
};
