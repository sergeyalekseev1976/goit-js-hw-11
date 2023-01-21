import axios from 'axios';

const FETCH_URL = 'https://pixabay.com/api/';
const KEY = '31635899-1cb6f37c9ae866ffd2c461d46';

export async function fetchImages(query, page, perPage) {
  try {
    const response = await axios.get(
      `${FETCH_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response;
  } catch (error) {}
}
