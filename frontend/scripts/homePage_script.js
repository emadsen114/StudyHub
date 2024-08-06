document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
            const results = await response.json();
            displayResults(results);
        } else {
            searchResults.innerHTML = '';
        }
    });

    function displayResults(results) {
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result';
            resultItem.innerHTML = `<a href="/post/${result._id}">${result.title}</a>`;
            searchResults.appendChild(resultItem);
        });
    }
});

import { stripHtmlTags } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
            const results = await response.json();
            displayResults(results);
        } else {
            searchResults.innerHTML = '';
        }
    });

    function displayResults(results) {
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result';
            resultItem.innerHTML = `<a href="/post/${result._id}">${stripHtmlTags(result.title)}</a>`;
            searchResults.appendChild(resultItem);
        });
    }
});