"use client";
import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [filename, setFilename] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setFilename(event.target.files[0].name);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'feriptks');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/devlognxn/image/upload',
        formData
      );
      console.log(response.data.public_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="file" onChange={handleFileChange} />
        <label>{filename}</label>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
