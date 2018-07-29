import Search from './models/Search';

import * as searchView  from './views/searchView';
import { elements, renderLoader, clearLoader, elementString } from './views/base';

// Global state of the app
/**
 * - Search Object
 * - Current Object
 * - Shopping list objects
 * - Liked recipes
 */
const state = {};

const controlSearch = async (e) => {
    const form = e.target;

    // 1) Get Query from view
    const query = form.search.value; 

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearResults();
        renderLoader(elements.searchResults);

        // 4) Search for recipes
        await state.search.getResult();

        // 5) Clear search form & loader
        clearLoader(elements.searchResults);
        form.reset();

        // 6) Render results on UI
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch(e);
    // TODO
});

elements.searchResPage.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});