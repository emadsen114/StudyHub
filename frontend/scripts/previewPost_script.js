  // this function is used to redirect the user to the createPost page
  document.querySelector("#back").addEventListener('click', function() {
    let textContent = document.querySelector("#content").innerHTML;
    let titleBox = document.querySelector("#title");
    let descriptionBox = document.querySelector("#description");
    let tags = document.querySelectorAll('.tag');

    
    let titleContent = titleBox.value;
    let descriptionContent = descriptionBox.value;

    // save the contents to localStorage
    localStorage.setItem('content', textContent);
    localStorage.setItem('title', titleContent);
    localStorage.setItem('description', descriptionContent);
    localStorage.setItem('tag', JSON.stringify(Array.from(tags).map(tag => tag.textContent)));

    //console.log(localStorage.getItem('text'));
    //console.log(localStorage.getItem('title'));
    //console.log(localStorage.getItem('description'));
    window.location.href = "createPost.html";
});

document.querySelector("#submit").addEventListener('click', function() {
  // variables contain strings of the content, title, description, and tags
  let textContent = localStorage.getItem('content');
  let titleContent = localStorage.getItem('title');
  let descriptionContent = localStorage.getItem('description');
  let tags = JSON.parse(localStorage.getItem('tag'));

  // removes the 'x' from the tags
  tags = tags.map(tag => tag.slice(0, -1));
  
  //console.log("HTML content of the text box: " + textContent);
  //console.log("Title: " + titleContent);
  //console.log("Description: " + descriptionContent);
  //console.log("Tags: " + JSON.stringify(tags));
  window.location.href = "successfulPost.html";
});

//once previewPost.html is loaded, the contents of the text boxes are set to the saved contents
window.onload = function() {
  // get the saved contents from localStorage
  let textContent = localStorage.getItem('content');
  let titleContent = localStorage.getItem('title');
  let descriptionContent = localStorage.getItem('description');
  let tags = JSON.parse(localStorage.getItem('tag'));

  //console.log(textContent);
  //console.log(titleContent);
  //console.log(descriptionContent);
  // set the values of the text boxes
  
  document.querySelector("#content").innerHTML = textContent;
  document.querySelector("#title").value = titleContent;
  document.querySelector("#description").value = descriptionContent;

  let tagContainer = document.querySelector('.tag-container');
  tags.forEach(tag => {
    let tagElement = document.createElement('span');
    console.log(tag.slice(0, -1));
    tagElement.textContent = tag.slice(0,-1);
    tagElement.classList.add('tag');
    //tagElement.classList.add('remove-tag'); not working
    tagContainer.appendChild(tagElement);
  });
};