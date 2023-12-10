// imports
import uploadFiles from "./imagesUpload";

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
  uploadArea.classList.remove("dragging");

  const files = e.dataTransfer.files;
  uploadFilesPreview(files);
});

// handle file uploads in preview
const uploadFilesPreview = async (files) => {
  const validFiles = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Only upload images
    if (!file.type.match("image.*")) {
      alert("Only upload image plz!");
      continue;
    }
    //  get allowed files
    validFiles.push(file);
    const reader = new FileReader();

    reader.onload = ((singleImage) => {
      uploadArea.classList.add("dragging");
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

    reader.readAsDataURL(file);
  }
  // Handle upload call
  if (validFiles.length > 0) {
    try {
      await uploadFiles(validFiles);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  }
};
