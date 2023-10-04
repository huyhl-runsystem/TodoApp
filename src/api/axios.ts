import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('https://todoapp-uit.vercel.app/api-docs/');
    console.log(response.data); 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

