import axios from "axios";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css'

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
iziToast.settings({
    timeout: 3000,
    position: 'center',
    maxWidth: '400px',
    titleSize: '16px',
    messageSize: '14px',
})

const warning = message => {
    iziToast.warning({
        title: 'Attention!',
        message,
    })
}

const error = message => {
    iziToast.error({
        title: 'An error have ocrred!',
        message,
    })
}

const success = message => {
    iziToast.success({
        title: 'Success!',
        message,
    })
}

export const toast = {
    emptylist: message => {
        warning(
            message || 'We could not found any images matching your search request'
        )
    },
    endCollection: message => {
        warning(
            message || 'That is all for now. You have reached the end of the result list'
        )
    },
    fetchError: message => {
        error(message || 'Error have occured. Please try again later')
    },
    foundTotal: message => {
        success(message || `We have found ${total} images`)
    },
}