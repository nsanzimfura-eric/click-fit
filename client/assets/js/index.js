// global copnstants
// colors
const green = "#75f94c";
const white = "#ffffff";
const black = "#000000";

//  upload and drage and drop functionaliy
const uploadArea = document.getElementById("upload_dargable_area");
const imagesHolder = document.getElementById("imagesHolder");

// click event
uploadArea.addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();

  fileInput.onchange = function (e) {
    uploadFilesPreview(e.target.files);
  };
});

// Drag and drop events
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
  uploadArea.classList.add("dragging");
  activeDraggingShow();
});

uploadArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  e.stopPropagation();
  uploadArea.classList.remove("dragging");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  uploadArea.classList.add("dragging");

  const files = e.dataTransfer.files;
  uploadFilesPreview(files);
});

// handle file uploads in preview
const uploadFilesPreview = (files) => {
  console.log(files, "test files");
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Only upload images
    if (!file.type.match("image.*")) {
      return alert("Only upload image plz!");
    }
    const reader = new FileReader();

    reader.onload = ((singleImage) => {
      return (e) => {
        // Read thumbnails
        const imgElement = document.createElement("img");
        imgElement.src = e.target.result;
        imgElement.alt = singleImage.name;
        imagesHolder.appendChild(imgElement);
        imagesHolder.style.marginTop = "1rem";
      };
    })(file);
    uploadArea.classList.remove("dragging");

    const images = reader.readAsDataURL(file);
  }
};
