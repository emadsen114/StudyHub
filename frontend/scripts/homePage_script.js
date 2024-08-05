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
        searchResults.innerHTML = '';
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result';
            resultItem.textContent = result.title; // Adjust based on your schema
            searchResults.appendChild(resultItem);
        });
    }
});