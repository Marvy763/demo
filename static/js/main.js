
function previewFile() {
   const preview = document.querySelector('img');
   var file = document.getElementById('fileInput').files[0];
   const reader = new FileReader();
  reader.addEventListener("load", function () {
   preview.src = reader.result; // show image in <img> tag
  }, false);
  if (file) {
   reader.readAsDataURL(file);
}
}
// clear upload file
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
file = document.getElementById('fileInput').files[0];
if (file) {
   var formData = new FormData();
   formData.append('file', file);
   fetch('/upload', {
         method: 'POST',
         body: formData,
      })
      .then(response => response.json())
      .then(data => {
         // let info =''; // for save key , value in sttring
         z= JSON.stringify(data);
         var result = JSON.parse(z);
         // for (const key in result) {
         //    // console.log(`${key}: ${result[key]}`);
         //    info +=`${key}: ${result[key]}`+ '&nbsp;';
         // }
         //display result in html tag 
         // document.getElementById("uploadCaptureInputFile").value = "";
         clearFileInput("fileInput");
         document.getElementById("scan").style.display = 'none';
         document.getElementById("result").style.display = 'block';
         document.getElementById("serverMsg").innerHTML = `${result['Type']}`;
         document.getElementById("resultAdvice").innerHTML = `${result['Description']}`;
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
   document.getElementById("scan").style.display = 'flex';
   document.getElementById("fileInput").style.display = 'none';
   document.getElementById("result").style.display = 'none';
}


//   function displayImgInNewTab(data) {
//      var image = new Image();
//      image.src = data
//      var w = window.open("");
//      w.document.write(image.outerHTML);
//   }