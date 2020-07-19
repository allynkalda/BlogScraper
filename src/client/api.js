import axios from 'axios';

const GetText = async (data) => {
  const response = await axios.post('api/getText', { url: data });
  return response.data;
};

export default GetText;
