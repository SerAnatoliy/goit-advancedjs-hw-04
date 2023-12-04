import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css'


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