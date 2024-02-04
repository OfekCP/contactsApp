import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({
    contactName: '',
    phoneNum: '',
    contactEmail: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/contacts/${id}`);
      setContact(response.data);
      setUpdatedContact({
        contactName: response.data.contactName,
        phoneNum: response.data.phoneNum,
        contactEmail: response.data.contactEmail,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateContact = async () => {
    try {
      await axios.post(`http://localhost:8000/contacts/${id}/update`, updatedContact);
      fetchContact(); 
      setIsEditing(false); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      await axios.delete(`http://localhost:8000/contacts/${id}/delete`);
      navigate('/'); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const toggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  if (!contact) {
    return (
      <div className='app-container'>
        <h1>Contact</h1>
        <div className='phone-frame'>
          <div className='speaker'></div>
          <div className='frontCamera'></div>
          <div className='screen'>
          </div>
          <Link to="/">
            <div className='button1'></div>
          </Link>
        </div>
      </div>
    );
  }
  const handleClick = (contact) => {
    navigate(`/calling/${contact._id}`);
  };
  return (
    <div className='app-container'>
      <h1>Contact</h1>
      <div className='phone-frame'>
        <div className='speaker'></div>
        <div className='frontCamera'></div>
        <div className='screen'>
          <h2>Contact Details</h2>
          <p>Name: {contact.contactName}</p>
          <p>Phone Number: {contact.phoneNum}</p>
          <p>Email: {contact.contactEmail}</p>

          {isEditing ? (
            <>
              <h2>Edit Contact</h2>
              <input
                type="text"
                placeholder="Name"
                name="contactName"
                value={updatedContact.contactName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNum"
                value={updatedContact.phoneNum}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Email"
                name="contactEmail"
                value={updatedContact.contactEmail}
                onChange={handleChange}
              />
              <button onClick={handleUpdateContact}>Update</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              <button onClick={handleDeleteContact}>Delete</button>
            </>
          ) : (
            <>
            <button onClick={toggleEditing}>Edit</button>
            <button  onClick={() => handleClick(contact)}>call</button>
          </>
          )}
        </div>
        <Link to="/">
          <div className='button1'></div>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetails;
