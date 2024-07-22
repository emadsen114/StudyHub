  // this function is used to redirect the user to the createPost page
  document.querySelector("#back").addEventListener('click', function() {
    let textContent = document.querySelector("#content").innerHTML;
    let titleBox = document.querySelector("#title");
    let descriptionBox = document.querySelector("#description");

    
    let titleContent = titleBox.value;
    let descriptionContent = descriptionBox.value;

    // save the contents to localStorage
    localStorage.setItem('content', textContent);
    localStorage.setItem('title', titleContent);
    localStorage.setItem('description', descriptionContent);

    //console.log(localStorage.getItem('text'));
    //console.log(localStorage.getItem('title'));
    //console.log(localStorage.getItem('description'));
    window.location.href = "createPost.html";
});

//once previewPost.html is loaded, the contents of the text boxes are set to the saved contents
window.onload = function() {
  // get the saved contents from localStorage
  let textContent = localStorage.getItem('content');
  let titleContent = localStorage.getItem('title');
  let descriptionContent = localStorage.getItem('description');

  console.log(textContent);
  console.log(titleContent);
  console.log(descriptionContent);
  // set the values of the text boxes
  
  document.querySelector("#content").innerHTML = textContent;
  document.querySelector("#title").value = titleContent;
  document.querySelector("#description").value = descriptionContent;
};