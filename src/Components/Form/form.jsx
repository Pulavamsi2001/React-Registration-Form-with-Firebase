import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import './form.css';

const Form = () => {
  const [data, setData] = useState({ username: '', mail: '', contact: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, mail, contact } = data;

    if (!username || !mail || !contact) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await axios.post('https://signupform-1b0d9-default-rtdb.firebaseio.com/users.json', data);
      console.log('Form submitted successfully:', response);
      setSuccess(true);
      setError('');
      setData({ username: '', mail: '', contact: '' }); // Clear form fields
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      setError('Failed to submit form. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-title">Registration Form</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Username"
            className="form-input"
          />
          <br />
          <input
            type="email"
            name="mail"
            value={data.mail}
            onChange={handleChange}
            placeholder="Email"
            className="form-input"
          />
          <br />
          <input
            type="text"
            name="contact"
            value={data.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="form-input"
          />
          <br />
          <button type="submit" className="form-button">Submit</button>
        </form>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">Form submitted successfully!</div>}
      </div>
    </div>
  );
};

export default Form;