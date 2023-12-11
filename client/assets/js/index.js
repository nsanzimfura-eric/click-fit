// imports
import uploadFiles from "./imagesUpload.js";
import accordionMaker from "./accordionMaker.js";

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
      $("#cleck-fit-news-box").css("transform", "translate(0)");
    }
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error("Error fetching news:", textStatus, errorThrown);
  });
};
// ################## USERS FUNCTIONALITY #################
const usersApi = "http://localhost:8080/v1/users";

// Form upload functionality
const form = document.getElementById("FormAddUser");
const fullName = document.getElementById("fullName");
const email = document.getElementById("emailInput");
const password = document.getElementById("passwordInput");
const closeModalBtnCancel = document.getElementById("closeModalBtnCancel");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameValue = fullName.value;
  const emailValue = email.value;
  const passwordValue = password.value;

  const formData = {
    fullName: nameValue,
    email: emailValue,
    password: passwordValue,
  };
  console.log(formData);
  // handle submit data
  saveDataToTheDB(formData);
});

const saveDataToTheDB = (data) => {
  // here we create ad admin that is already added in the database,
  // by creating this user, it is like authentication, now we have right to post the user from the form
  // By scallability, this may be changed to use authentication, in the future,
  const admin = {
    fullName: "ClickFit Admin",
    email: "admin@clickfit.com",
    password: "Password123#",
  };

  const formData = { ...data, admin };

  $.ajax({
    url: usersApi,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: function (data, status) {
      console.log(data, status, "test------------");
      if (status === "success" && data.data) {
        alert("User added successfully");
        console.log(data);
        // close modal
        closeModalBtnCancel.click();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error adding user:", textStatus, errorThrown);
      alert("Failed to add user: " + jqXHR.responseJSON.error);
    },
  });
};

// display added users
const listOfClientsbtn = document.getElementById(
  "staticBackdropLabelClientsList"
);

const fetchAllUsers = () => {
  const accordionBox = document.getElementById("accordionFlushExample");
  $.ajax({
    url: usersApi,
    type: "GET",
    contentType: "application/json",
    success: function (data, status) {
      // clear div first
      accordionBox.innerHTML = "";
      // Handle the fetched user data here
      // For example, display the users in a table or list
      const users = data.data;
      if (users) {
        users.forEach((user) => {
          const userDetails = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            date: new Date(user.createdAt),
            role: user.type,
          };
          const accordion = accordionMaker(userDetails);
          accordionBox.innerHTML += accordion;
        });
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error fetching users:", textStatus, errorThrown);
      alert("Failed to fetch users: " + jqXHR.responseJSON.error);
    },
  });
};

// show users by on click
listOfClientsbtn.addEventListener("click", fetchAllUsers);

const bgDots = document.getElementById("bgDots");
const bgArms = document.getElementById("bgArms");
const rightHero = document.getElementById("rightHero");
const leftHero = document.getElementById("leftHero");

// handle change bg;
rightHero.addEventListener("mouseover", () => {
  bgArms.style.opacity = 0.1;
  bgDots.style.opacity = 0;
});
rightHero.addEventListener("mouseleave", () => {
  bgArms.style.opacity = 0;
  bgDots.style.opacity = 0.1;
});
leftHero.addEventListener("mouseover", () => {
  bgArms.style.opacity = 0;
  bgDots.style.opacity = 0.1;
});
leftHero.addEventListener("mouseleave", () => {
  bgArms.style.opacity = 0.1;
  bgDots.style.opacity = 0;
});
