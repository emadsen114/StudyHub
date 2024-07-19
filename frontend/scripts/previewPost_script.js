  // this function is used to redirect the user to the createPost page
  document.querySelector("#back").addEventListener('click', function() {
    //let textBox = document.querySelector("#text-input");
    let titleBox = document.querySelector("#title");
    let descriptionBox = document.querySelector("#description");

    //let textContent = textBox.value;
    let titleContent = titleBox.value;
    let descriptionContent = descriptionBox.value;

    // save the contents to localStorage
    //localStorage.setItem('text', textContent);
    localStorage.setItem('title', titleContent);
    localStorage.setItem('description', descriptionContent);

    //console.log(localStorage.getItem('text'));
    //console.log(localStorage.getItem('title'));
    //console.log(localStorage.getItem('description'));
    window.location.href = "createPost.html";
});

//once previewPost.html is loaded, the contents of the text boxes are set to the saved contents
document.addEventListener('DOMContentLoaded', function() {
  // get the saved contents from localStorage
  //let content = localStorage.getItem('text');
  let titleContent = localStorage.getItem('title');
  let descriptionContent = localStorage.getItem('description');

  // set the values of the text boxes
  //document.querySelector("#text-input").innerHTML = content.toString();
  document.querySelector("#title").value = titleContent;
  document.querySelector("#description").value = descriptionContent;
});