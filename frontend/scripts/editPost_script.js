// Used this to make the basis of the rich text editor:
// https://www.youtube.com/watch?v=la-0HOaNL10&t=72s&ab_channel=CodingArtist


let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");


//List of CSS Web Safe Fonts
let fontList = [
    "Arial", 
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT"
];

// Initial settings
const initializer = () => {
    // create options for font names
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //font size modifier
    for (let i = 1; i <= 12; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    // default text size
    fontSizeRef.value = 4;

    // main logic
    const modifyText = (command, defaultUi, value) => {
        // execCommand is a built-in function in js which is used to perform an action on the selected text
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
        // button id's are named after the execCommand actions
        document.execCommand(command, defaultUi, value);
    };

    // basic operations that don't need value parameters
    optionsButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modifyText(button.id, false, null);
        });
    });

    // advanced operations that need value parameters
    advancedOptionButton.forEach((button) => {
        button.addEventListener("change", () => {
            modifyText(button.id, false, button.value);
        });
    });


}

// this line is used to call the initializer function when the window is loaded
window.onload = initializer();


// this function is used to print the selected text into the console
document.querySelector("#save").addEventListener('click', async function() {
    if (confirm("Save as draft?")) {
        const urlParams = new URLSearchParams(window.location.search);
        const postID = urlParams.get('id');

        const response = await fetch(`/api/auth/getPost/${postID}`);
        const post = await response.json();

        // update Post object, call updatePost instead of createPost
        try {
            const res = await fetch(`/api/auth/updatePost/${postID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: document.querySelector("#title").value,
                    content: document.querySelector("#text-input").innerHTML,
                    description: document.querySelector("#description").value,
                    tags: tags.map(tag => tag.textContent.slice(0,-1)),
                    draft: true
                })
            });
            const data = await res.json()
            console.log(data);
            if(res.status === 400 || res.status === 401){
                return display.textContent = `${data.message}. ${data.error ? data.error : ''}`
            }
            window.location.href = `homePage.html`;
        } catch (error) {
            console.log("Not working");
        };
    }
  });



  // this function is used to redirect the user to the previewPost page
document.querySelector("#next").addEventListener('click', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get('id');

    const response = await fetch(`/api/auth/getPost/${postID}`);
    const post = await response.json();

    // update Post object, call updatePost instead of createPost
    try {
        const res = await fetch(`/api/auth/updatePost/${postID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: document.querySelector("#title").value,
                content: document.querySelector("#text-input").innerHTML,
                description: document.querySelector("#description").value,
                tags: tags.map(tag => tag.textContent.slice(0,-1)),
            })
        });
        const data = await res.json()
        console.log(data);
        if(res.status === 400 || res.status === 401){
            return display.textContent = `${data.message}. ${data.error ? data.error : ''}`
        }
        window.location.href = `previewPost.html?id=${data.post._id}`;
    } catch (error) {
        console.log("Not working");
    };


    }
    // save the contents to localStorage
    //localStorage.setItem('content', content);
    //localStorage.setItem('title', titleContent);
    //localStorage.setItem('description', descriptionContent);
    //localStorage.setItem('tag', JSON.stringify(tags.map(tag => tag.textContent)));

    //console.log(localStorage.getItem('content'));
    //console.log(localStorage.getItem('title'));
    //console.log(localStorage.getItem('description'));
    //window.location.href = "previewPost.html";
);

// this function is used to clear all entries from the textboxes (clears local storage)
document.querySelector("#clear").addEventListener('click', async function() {
    // Opens up a popup asking to confirm clear
    if (confirm('Are you sure you want to clear all fields? This cannot be undone.')) {
        clearTags();

        const urlParams = new URLSearchParams(window.location.search);
        const postID = urlParams.get('id');

        const response = await fetch(`/api/auth/getPost/${postID}`);
        const post = await response.json();

        // update Post object, call updatePost instead of createPost
        try {
            const res = await fetch(`/api/auth/updatePost/${postID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: "",
                    content: "",
                    description: "",
                    tags: [],
                })
            });
            const data = await res.json()
            console.log(data);
            if(res.status === 400 || res.status === 401){
                return display.textContent = `${data.message}. ${data.error ? data.error : ''}`
            }
        } catch (error) {
            console.log("Not working");
        };
        //localStorage.removeItem('content');
        //localStorage.removeItem('text');
        //localStorage.removeItem('title');
        //localStorage.removeItem('description');
        //document.querySelector("#content").value = ""; // This causes an error TypeError, but still works after refresh
        //document.querySelector("#title").value = "";
        //document.querySelector("#description").value = "";

        localStorage.removeItem('posts');
        // temp solution as clear doesn't work immediately
        // only clears after page is manually refreshed by user,
        // but it is supposed to automatically clear after confirm clear
        //window.location.reload();
    }
});


// Used this to create the basis of the tagging system
// https://www.youtube.com/watch?v=qYRiB8c6gLQ&ab_channel=UzoanyaDominic
const button = document.querySelector('#add-button');
const tagInput = document.querySelector('#input');

const form = document.forms[0];
const tagContainer = document.querySelector('.tag-container');

const tags_string = []; // Stores string values of tags
const tags = []; // Stores the tag elements

const createTag = (tagValue) => {
    const value = tagValue.trim();

    if (value === '' || tags.includes(value)) return;

    const tag = document.createElement('span');
    const tagContent = document.createTextNode(value);
    tag.setAttribute('class', 'tag');
    tag.appendChild(tagContent);

    const close = document.createElement('span');
    close.setAttribute('class', 'remove-tag');
    close.innerHTML = '&#10006;';
    close.onclick = handleRemoveTag;

    tag.appendChild(close);
    tagContainer.appendChild(tag);
    tags.push(tag); // Stores the tag elements
    // Add the new tag to the tags array
    //tags.push(tag.textContent.slice(0,-1));
    tags_string.push(value); // Stores the string value instead of the element

    tagInput.value = '';
    tagInput.focus();
};

const savePost = () => {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const content = document.querySelector("#text-input").innerHTML;

    // No need to initialize tags here again, it's already available globally
    const post = { title, description, content, tags_string: [...tags_string] }; // Use spread operator to copy tags
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
};

document.querySelector("#save").addEventListener('click', savePost);

const handleFormSubmit = (e) => {
    e.preventDefault();
    createTag(tagInput.value);
    //localStorage.setItem('tag', JSON.stringify(tags.map(tag => tag.value)));
}

const handleRemoveTag = (e) => {
    const item = e.target.textContent;
    e.target.parentElement.remove();
    tags.splice(tags.indexOf(item), 1);

    // Remove the tag from the tags array
    /*
    const index = tags.indexOf(e.target.textContent.slice(0,-1));
    if (index > -1) {
        tags.splice(index, 1);
    }
    */
}

function clearTags() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.querySelector('.remove-tag').click(); // Iterates through all tags and clicks the remove button
        tag.remove();
    });
    //tags.length = 0; // Clear the tags array
    //localStorage.removeItem('tag'); // Clear the tags from localStorage
}

form.addEventListener('submit', handleFormSubmit);

const displayGreeting = async () => {
    const res = await fetch("/api/auth/currentUser");
    const data = await res.json();
    if (res.ok) {
        const greeting = document.querySelector(".greeting");
<<<<<<< HEAD
        greeting.textContent = `Editing post for ${data.username}`;
=======
        greeting.textContent = `Editing Post for ${data.username}`;
>>>>>>> 97bc39d5258b6a2a85683a77793bbcf0d2e5f274
        console.log("message printed")
    } else {
        return null;
    }
  };
  displayGreeting();

window.onload = async function() {
    /*
    // get the saved contents from localStorage
    let textContent = localStorage.getItem('content');
    let titleContent = localStorage.getItem('title');
    let descriptionContent = localStorage.getItem('description');
    let tags = JSON.parse(localStorage.getItem('tag'));
    
  
    // set the values of the text boxes
    document.querySelector("#text-input").innerHTML = textContent;
    document.querySelector("#title").value = titleContent;
    document.querySelector("#description").value = descriptionContent;
    let tagContainer = document.querySelector('.tag-container');
    // for each tag in the tags array, create a tag element
    // if tags is not empty, create a tag for each tag in the array
    if (tags) {
        tags.forEach(tag => {
            createTag(tag);
        });
    }
    */
    // Get the post ID from the URL **DOESNT WORK**
    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get('id');
    console.log(postID)

    const response = await fetch(`/api/auth/getPost/${postID}`);
    const post = await response.json();
    console.log(post);
    //console.log(textContent);
    //console.log(titleContent);
    //console.log(descriptionContent);
    // set the values of the text boxes
    
    document.querySelector("#text-input").innerHTML = post.post.content;
    document.querySelector("#title").value = post.post.title;
    document.querySelector("#description").value = post.post.description;

    const saved_tags = post.post.tags;
    console.log(saved_tags);
    let tagContainer = document.querySelector('.tag-container');
    if (saved_tags) {
        saved_tags.forEach(tag => {
            createTag(tag);
        });
    }

  };

 