import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [folderId, setFolderId] = useState("");
  const [message, setMessage] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFolderIdChange = (e) => {
    setFolderId(e.target.value);
  };

  const onFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    if (!folderId) {
      setMessage("Please enter a folder ID");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", folderId);

    try {
      const response = await axios.post(
        "http://localhost:3333/s3upload/uploadtogdrive",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.webViewLink);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
    }
  };

  return (
    <div>
      <h1>Upload PDF to Google Drive</h1>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      <input
        type="text"
        placeholder="Enter folder ID"
        value={folderId}
        onChange={onFolderIdChange}
      />
      <button onClick={onFileUpload}>Upload</button>
      {message && <>
      <br />
      <span>File Uploaded: </span>
      <a href={message} target="__blank">{message}</a>
      </>}
    </div>
  );
};

export default FileUpload;
