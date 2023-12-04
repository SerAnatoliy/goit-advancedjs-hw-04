import axios from "axios";


const API_KEY = '41007167-88dba9d0c39a2133a3a0b3dca';
const BASE_URL = 'https://pixabay.com/api/';

export const PER_PAGE = 40

const request = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    },
});

export const fetchImages = async (query, page = 1, limit = 20) => {
    const response = await request.get('', {
        params: {
            q: query,
            page,
            per_page: limit,
        },

    })

    const { hits, totalHits } = response.data
    return {
        list: hits,
        total: totalHits,
    }
}
