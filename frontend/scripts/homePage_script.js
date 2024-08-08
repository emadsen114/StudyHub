

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

const displayGreeting = async () => {
    const res = await fetch("/api/auth/currentUser");
    const data = await res.json();
    if (res.ok) {
        const greeting = document.querySelector(".greeting");
        greeting.textContent = `Hello, ${data.username}`;
    } else {
        return null;
    }
};
displayGreeting();

const getRole = async () => {
    const res = await fetch("/api/auth/currentUser");
    const data = await res.json();
    const link = document.querySelector(".dropdown-content a[href='/basic']");
    const adminLink = document.getElementById("admin-link"); 
    if (res.ok) {
        if (data.role === "admin") {
            adminLink.style.display = "block";
        }
    } else {
        return null;
    }
};
getRole();

// save button for each post
const saveButtons = document.querySelectorAll('.save-post');

saveButtons.forEach(button => {
    button.addEventListener('click', updateSaveList);
});

async function updateSaveList(e) {
    console.log("button pressed!")
    const res = await fetch("/api/auth/currentUser");
    const data = await res.json();
    //console.log(data);
    const userID = data.user;
    const postID = e.target.dataset.id;
    //console.log(userID);
    //console.log(postID);
    //console.log(data.savedList);
    const updatedSaveList = data.savedList
    updatedSaveList.push(postID);
    //console.log(updatedSaveList);
    //console.log(`/api/auth/updateSaveList/${userID}/${postID}`)

    const res2 = await fetch(`/api/auth/updateSaveList/${userID}/${postID}`);


    console.log("post saved!")
}