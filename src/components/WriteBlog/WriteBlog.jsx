import React, { useState } from 'react';
import { FcAddImage } from "react-icons/fc";
import { Link } from 'react-router-dom';

const WriteBlog = () => {
  const [newBlog, setNewBlog] = useState({
    name: '',
    link: ''
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(newBlog).forEach((key) => formData.append(key, newBlog[key]));
    if (image) formData.append('image', image);

    fetch('https://affiliate-backend.onrender.com/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Blog and image uploaded successfully:', data);
      })
      .catch((error) => {
        console.error('Error uploading blog and image:', error);
      });
  };

  return (
    <div style={styles.container}>
      <Link to='/'>Go Back</Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Write Your Blog</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="file" id="file" onChange={handleImageChange} style={{ display: 'none' }} />
            <label htmlFor="file" style={{ cursor: 'pointer' }}>
              <FcAddImage style={{ width: '25px', height: '25px' }} />
            </label>
          </form>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          name="name"
          value={newBlog.id}
          onChange={handleInputChange}
          style={styles.textarea}
          placeholder="Enter Client Name"
        />
        <textarea
          name="link"
          value={newBlog.title}
          onChange={handleInputChange}
          style={styles.textarea}
          placeholder="Enter Amazon link"
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  textarea: {
    width: '100%',
    height: '25px',
    marginBottom: '10px',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    resize: 'none',
    overflow: 'hidden',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    marginTop: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default WriteBlog;
