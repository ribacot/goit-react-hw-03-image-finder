import axios from 'axios';
export default async function pixabayAPI({ id = null, q = null, page = 1, per_page='12' }) {
  try {
    const response = await axios('https://pixabay.com/api/?', {
      params: {
        key: '37410571-78e708f3fcce6ce73b7e36a87',
        image_type: 'photo',
        orientation: 'horizontal',
        id,
        q,
        page,
        per_page,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
