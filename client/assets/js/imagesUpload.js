const uploadFiles = async (files) => {
  const url = "http://localhost:8080/api/upload";
  const formData = new FormData();

  for (const file of files) {
    formData.append("images", file, file.name);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Successfully uploaded", data);
  } catch (error) {
    console.error("Error during file upload:", error);
  }
};

export default uploadFiles;
