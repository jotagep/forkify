export const elements = {
    searchForm: document.querySelector('.search'),
    searchResults: document.querySelector('.results'),
    resultList: document.querySelector('.results__list'),
    searchResPage: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
}

export const elementString = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = parent => {
    const loader = parent.querySelector(`.${elementString.loader}`);
    if (loader) parent.removeChild(loader);
}