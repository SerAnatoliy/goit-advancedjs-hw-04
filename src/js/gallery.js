import { fetchImages } from "./API_script";
import SimpleLightBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PER_PAGE } from "./API_script";
import { toast } from "./izitoast";

function createGallery(
    render,
    {
        initialPage,
        initialQuery,
        initialList,
        limit,
        loader,
        smoothScroll,
        loadMore,
    }
) {
    let page = initialPage || 1
    let query = initialQuery || ''
    let list = initialList || []
    let total = null
    fetchData()
    async function fetchData() {
        if (!query) return
        try {
            loader && loader.show()
            loadMore.hide()

            const data = await fetchImages(query, page, limit)

            console.log('data', data)

            list.push(...data.list)
            total = data.total

            const isEndCollection = limit * page >= total
            const isCollectionEmpty = data.list.length === 0

            if (isCollectionEmpty) {
                toast.emptylist()
            }
            else if (isEndCollection) {
                toast.endCollection()
            }
            else if (page === 1) {
                toast.foundTotal(total)
            }

            render(list)

            if (!isEndCollection) loadMore.show()

            smoothScroll && page !== 1 && isCollectionEmpty && smoothScroll()
        }
        catch (error) {
            console.log('error', error)
            toast.fetchError()
        }
        finally {
            loader && loader.hide()
        }
    }
    return {
        getPage() {
            return page
        },
        increasePage() {
            page += 1
        },
        resetPage() {
            page = 1
        },
        setQuery(newQuery) {
            this.resetPage();
            this.clearList();
            query = newQuery
            fetchData()
        },
        clearList() {
            list = []
        }
    }
}

function createGAlleryMarkup(list) {
    return list.map(createGalleryMarkup).join('');
}

function createGalleryMarkup({
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
    webformatURL,
}) {
    return `
  <div class="photo-card">
    <a class="photo-card__link" href="${largeImageURL}">
        <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b><span>${likes}</span>
        </p>
        <p class="info-item">
            <b>Views</b><span>${views}</span>
        </p>
        <p class="info-item">
            <b>Comments</b><span>${comments}</span>
        </p>
        <p class="info-item">
            <b>Downloads</b><span>${downloads}</span>
        </p>
    </div>
</div>`;
}
const form = document.querySelector('.search');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loaderRef = document.querySelector('.loader');

const lightbox = new SimpleLightBox('.gallery', {
    showCounter: false,
});

const galleryInstance = createGallery(render, {
    limit: PER_PAGE,
    loader: createHideable(loaderRef),
    smoothScroll,
    loadMore: createHideable(loadMoreBtn),
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const query = e.target.elements.searchQuery.value.trim();

    galleryInstance.setQuery(query);
});

loadMoreBtn.addEventListener('click', () => {
    galleryInstance.increasePage();
});


function render(data) {
    const markup = createGAlleryMarkup(data);
    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

function smoothScroll() {
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2.3,
        behavior: 'smooth',
    });
}

function createHideable(instance) {
    return {
        show() {
            instance.classList.add('visible');
        },
        hide() {
            instance.classList.remove('visible');
        },
    };
}