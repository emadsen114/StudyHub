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
    let htmlContent = textBox.innerHTML;
  
    console.log("HTML content of the text box: " + htmlContent);
  });


  // this function is used to redirect the user to the previewPost page
document.querySelector("#next").addEventListener('click', function() {
    window.location.href = "previewPost.html";
});