  // this function is used to redirect the user to the createPost page
  document.querySelector("#back").addEventListener('click', async function() {
    //let textContent = document.querySelector("#content").innerHTML;
    //let titleBox = document.querySelector("#title");
    //let descriptionBox = document.querySelector("#description");
    //let tags = document.querySelectorAll('.tag');

    
    //let titleContent = titleBox.value;
    //let descriptionContent = descriptionBox.value;

    // save the contents to localStorage
    //localStorage.setItem('content', textContent);
    //localStorage.setItem('title', titleContent);
    //localStorage.setItem('description', descriptionContent);
    //localStorage.setItem('tag', JSON.stringify(Array.from(tags).map(tag => tag.textContent)));

    //console.log(localStorage.getItem('text'));
    //console.log(localStorage.getItem('title'));
    //console.log(localStorage.getItem('description'));

    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get('id');

    // setting draft to false, so it calls updatePost instead of createPost
    /*
    const res = await fetch(`/api/auth/updatePost/${postID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ draft: false })
    });

    if (!res.ok) {
      console.log("Error updating post");
      return;
    }
    */
    window.location.href = `editPost.html?id=${postID}`;  //make a new page for edit page
});

document.querySelector("#submit").addEventListener('click', async function() {
  if (confirm("Post successful!")) {
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
                draft: false
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
    window.location.href = "homePage.html";
  }
});

//once previewPost.html is loaded, the contents of the text boxes are set to the saved contents
window.onload = async function() {
  // get the saved contents from localStorage
  //let textContent = localStorage.getItem('content');
  //let titleContent = localStorage.getItem('title');
  //let descriptionContent = localStorage.getItem('description');
  //let tags = JSON.parse(localStorage.getItem('tag'));

  // Get the post ID from the URL
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
  
  document.querySelector("#content").innerHTML = post.post.content;
  document.querySelector("#title").value = post.post.title;
  document.querySelector("#description").value = post.post.description;

  console.log(post.post.tags);

  let tagContainer = document.querySelector('.tag-container');
  post.post.tags.forEach(tag => {
    let tagElement = document.createElement('span');
    //console.log(tag.slice(0, -1));
    tagElement.textContent = tag
    tagElement.classList.add('tag');
    //tagElement.classList.add('remove-tag'); not working
    tagContainer.appendChild(tagElement);
  });

  // add username into the username field
  let usernameField = document.getElementById('author-label');
  //temporary
  usernameField.value = "Author: " + post.post.author;

  // add current date into the date field
  let dateField = document.getElementById('date-label');
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleString();
  dateField.value = "Date: " + formattedDate;

};