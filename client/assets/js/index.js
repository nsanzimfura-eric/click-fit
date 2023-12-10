// imports
import uploadFiles from "./imagesUpload.js";

//  upload and drage and drop functionaliy
const uploadArea = document.getElementById("upload_dargable_area");
const imagesHolder = document.getElementById("imagesHolder");

// click event
uploadArea.addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();

  fileInput.onchange = function (e) {
    processUploadedImages(e.target.files);
  };
});

// Drag and drop events
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
  uploadArea.classList.add("dragging");
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
  processUploadedImages(files);
});

// handle file uploads in preview
const processUploadedImages = async (files) => {
  const validFiles = [];
  let imagesPreviewArr = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Only upload images type
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
        // Read thumbnails/preview
        imagesPreviewArr.push({ src: e.target.result, alt: singleImage.name });
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
  if ((imagesPreviewArr, length > 0)) {
    previewImagesUploaded(imagesPreviewArr);
  }
};

// preview images as thumbnails
const previewImagesUploaded = (images) => {
  images.forEach((img) => {
    const imgElement = document.createElement("img");
    imgElement.src = img.src;
    imgElement.alt = img.alt;
    imagesHolder.appendChild(imgElement);
  });

  imagesHolder.style.marginTop = "1rem";
};

// handle images preview and onload
const fetchImagesAndDisplay = async () => {
  imagesHolder.innerHTML = "";
  const url = "http://localhost:8080/api/images";
  const imgUrl = "http://localhost:8080/click-fit-images";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const imageFilenames = await response.json();
    const imagesToDisplay = [];

    imageFilenames?.images.forEach((filename) => {
      imagesToDisplay.push({ src: `${imgUrl}/${filename}`, alt: filename });
    });

    // display the images on the page
    if (imagesToDisplay) {
      previewImagesUploaded(imagesToDisplay);
    }
  } catch (error) {
    console.error("Failed to fetch images:", error);
  }
};

//  AJAX calls
// when Window finished loading
$(document).ready(function () {
  // display images
  fetchImagesAndDisplay();
  // ajax call
  fetchNews();
});

const fetchNews = () => {
  const urlNews = "http://numbersapi.com/1/30/date?json";
  $.get(urlNews, (data, status) => {
    if (status === "success") {
      $("#newsText").text(data.text);
      $("#dialyTrainees").text(data.number);
    }
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error("Error fetching news:", textStatus, errorThrown);
  });
};
