import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './form.css';

const Form = () => {
  const [data, setData] = useState({ username: '', mail: '', contact: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch existing users on component mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://signupform-1b0d9-default-rtdb.firebaseio.com/users.json');
        const fetchedUsers = response.data ? Object.values(response.data) : [];
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

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

    let emailExists = false;
    let contactExists = false;

    // Check for duplicates
    users.forEach(user => {
      if (user.mail === mail) {
        emailExists = true;
      }
      if (user.contact === contact) {
        contactExists = true;
      }
    });

    if (emailExists && contactExists) {
      setError('Email and contact number already exists.');
    } else if (emailExists) {
      setError('Email already exists.');
    } else if (contactExists) {
      setError('Contact number already exists.');
    } else {
      setError('');
      try {
        const response = await axios.post('https://signupform-1b0d9-default-rtdb.firebaseio.com/users.json', data);
        console.log('Form submitted successfully:', response);
        setSuccess(true);
        setData({ username: '', mail: '', contact: '' });
        // Update users list with new user
        setUsers(prevUsers => [...prevUsers, data]);
      } catch (error) {
        console.error('There was an error submitting the form:', error);
        setError('Failed to submit form. Please try again.');
        setSuccess(false);
      }
    }
  };

  return (
    <div className="form-wrapper">
      
      <div className="form-container">
       <h1 className="form-title">Registration Form</h1>
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
