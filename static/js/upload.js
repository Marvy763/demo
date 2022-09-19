//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
      let uploadTag = `<input type="file" value=${file} />`
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
      
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
// preloader
const loader = document.querySelector("#preloader");
// showing loading
function displayLoading() {
  loader.classList.add("display");
  // // to stop loading after some time
  // setTimeout(() => {
  //     loader.classList.remove("display");
  // }, 5000);
}

// hiding loading 
function hideLoading() {
  loader.classList.remove("display");
}

// upload file - not necessary
// function previewFile() {
//   const preview = document.querySelector('img');
//   var file = document.getElementById('fileInput').files[0];
//   const reader = new FileReader();
//  reader.addEventListener("load", function () {
//   preview.src = reader.result; // show image in <img> tag
//  }, false);
//  if (file) {
//   reader.readAsDataURL(file);
// }
// }
// clear upload file - not necessary cause we reload the page
function clearFileInput(id) 
{ 
   var oldInput = document.getElementById(id); 

   var newInput = document.createElement("input"); 

   newInput.type = "file"; 
   newInput.id = oldInput.id; 
   newInput.name = oldInput.name; 
   newInput.className = oldInput.className; 
   newInput.style.cssText = oldInput.style.cssText; 
   // TODO: copy any other relevant attributes 

   oldInput.parentNode.replaceChild(newInput, oldInput); 
}

function uploadFile() {
  displayLoading()
// file = document.getElementById('fileInput').files[0];
if (file) {
  var formData = new FormData();
  formData.append('file', file);
  fetch('/upload', {
        method: 'POST',
        body: formData,
     })
     .then(response => response.json())
     .then(data => {
        hideLoading()
        z= JSON.stringify(data);
        var result = JSON.parse(z);
        document.getElementById("scan").style.display = 'none';
        document.getElementById("result").style.display = 'flex';
        document.getElementById("serverMsg").innerHTML = `${result['Type']}`;
        document.getElementById("resultAdvice").innerHTML = `${result['Description']}`;

        if (result['Status'] == 'Normal'){
          document.getElementById('image').style.background = 'url(https://i.pinimg.com/564x/7f/dd/76/7fdd76af700e8cdd06583ea3d70817b7.jpg) no-repeat center / cover';
        }
        else {
          document.getElementById('image').style.background = 'url(https://img.freepik.com/premium-vector/young-woman-calms-her-friend-who-is-sad_10045-395.jpg?w=740) no-repeat center / cover'
        }
     })
     .catch(error => {
        console.error(error);
     });
  // previewFile()
}else{
  alert('error');
}
}
function tryAgain(){
  location.reload()
}
