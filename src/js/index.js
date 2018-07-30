import Search from './models/Search';
import Recipe from './models/Recipe';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader} from './views/base';

// Global state of the app
/**
 * - Search Object
 * - Current Object
 * - Shopping list objects
 * - Liked recipes
 */
const state = {};


// SEARCH CONTROLLER
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

        try {
            // 4) Search for recipes
            await state.search.getResult();

            // 5) Clear search form & loader
            clearLoader(elements.searchResults);
            form.reset();

            // 6) Render results on UI
            searchView.renderResults(state.search.result);
        } catch (error) {
            clearLoader(elements.searchResults);
            console.error('Error receiving recipes');
        }

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


// RECIPE CONTROLLER

const controlRecipe = async () => {
    // Get Id from URL
    const id = window.location.hash.replace('#', '');

    if (id) {

        // Create new recipe object
        state.recipe = new Recipe(id);

        // Prepare UI for change
        recipeView.cleanRecipe();
        renderLoader(elements.recipe);

        // Highlight search active item
        if (state.search) {
            searchView.highlightSelected(id);
        }
        
        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
    
            // Calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader(elements.recipe);
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            console.error('Error processing recipe!');
        }

    }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServings(state.recipe);
        }        
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServings(state.recipe);
    }

})