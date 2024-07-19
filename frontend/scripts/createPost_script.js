// Used this to make the basis of the rich text editor:
// https://www.youtube.com/watch?v=la-0HOaNL10&t=72s&ab_channel=CodingArtist


let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");


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
document.querySelector("#save").addEventListener('click', function() {
    let textBox = document.querySelector("#text-input");
    let titleBox = document.querySelector("#title");
    let descriptionBox = document.querySelector("#description");

    let textContent = textBox.innerHTML;
    let titleContent = titleBox.value;
    let descriptionContent = descriptionBox.value;
  
    console.log("HTML content of the text box: " + textContent);
    //console.log(typeof textContent);
    console.log("Title: " + titleContent);
    //console.log(typeof titleContent);
    console.log("Description: " + descriptionContent);
    //console.log(typeof descriptionContent);

  });


  // this function is used to redirect the user to the previewPost page
document.querySelector("#next").addEventListener('click', function() {
    //let textBox = document.querySelector("#text-input");
    //let content = document.getElementById("text-input").innerHTML; // new
    let titleBox = document.querySelector("#title");
    let descriptionBox = document.querySelector("#description");

    //let textContent = textBox.innerHTML ? textBox.innerHTML : "";
    //console.log(textContent)
    let titleContent = titleBox.value;
    let descriptionContent = descriptionBox.value;

    // save the contents to localStorage
    //localStorage.setItem('text', textContent);
    //localStorage.setItem('text', content); // new
    localStorage.setItem('title', titleContent);
    localStorage.setItem('description', descriptionContent);

    //console.log(localStorage.getItem('text'));
    //console.log(localStorage.getItem('title'));
    //console.log(localStorage.getItem('description'));
    window.location.href = "previewPost.html";
});

// this function is used to clear all entries from the textboxes (clears local storage)
document.querySelector("#clear").addEventListener('click', function() {
    // Opens up a popup asking to confirm clear
    if (confirm('Are you sure you want to clear all fields? This cannot be undone.')) {
        localStorage.removeItem('text');
        localStorage.removeItem('title');
        localStorage.removeItem('description');
        document.querySelector("#text-input").value = "";
        document.querySelector("#title").value = "";
        document.querySelector("#description").value = "";
    }
});

window.onload = function() {
    // get the saved contents from localStorage
    //let textContent = localStorage.getItem('content'); //new
    let titleContent = localStorage.getItem('title');
    let descriptionContent = localStorage.getItem('description');
  
    // set the values of the text boxes
    //document.querySelector("#text-input").value = textContent;
    //document.getElementById('content').value = textContent; //new
    document.querySelector("#title").value = titleContent;
    document.querySelector("#description").value = descriptionContent;
  };