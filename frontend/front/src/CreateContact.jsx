import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CreateContact = () => {
  const [newContact, setNewContact] = useState({
    contactName: '',
    phoneNum: '',
    contactEmail: '',
  });

  const handleCreateContact = async () => {
    if (!newContact.contactName || !newContact.phoneNum) {
      alert("Please fill in all required fields (Name, Phone Number, Email) before creating a contact.");
      return;
    }

    try {
      await axios.post('http://localhost:8000/contacts/create', newContact);
      setNewContact({
        contactName: '',
        phoneNum: '',
        contactEmail: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='app-container'>
        <h1>contacts</h1>
    <div className='phone-frame'>
      <div className='speaker'></div>
      <div className='frontCamera'></div>
      <div className='screen'>
        <h2>Create Contact</h2>
        <input
          type="text"
          placeholder="Name"
          value={newContact.contactName}
          onChange={(e) => setNewContact({ ...newContact, contactName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newContact.phoneNum}
          onChange={(e) => setNewContact({ ...newContact, phoneNum: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newContact.contactEmail}
          onChange={(e) => setNewContact({ ...newContact, contactEmail: e.target.value })}
        />
        <button onClick={handleCreateContact}>Create</button>
      </div><Link to="/"><div className='button1'></div></Link>
    </div></div>
  );
};

export default CreateContact;
