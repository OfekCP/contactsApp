import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ContactDetails from './ContactDetails';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/contacts');
      const sortedContacts = response.data.sort((a, b) =>
        a.contactName.localeCompare(b.contactName)
      );
      setContacts(sortedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactClick = (contact) => {
    navigate(`/details/${contact._id}`);
  };

  return (
    <div className='app-container'>
      <h1>Contact</h1>
      <div className='phone-frame'>
        <div className='speaker'></div>
        <div className='frontCamera'></div>
        <div className='screen'>
          <h2>Contacts</h2>
          <Link to="/create">
            <button className='create'>+</button>
          </Link>
          <input
            type="text"
            placeholder="Search by Name or Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {contacts
              .filter((contact) =>
                contact.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.phoneNum.includes(searchTerm)
              )
              .map((contact) => (
                <li key={contact._id} onClick={() => handleContactClick(contact)}>
                  {contact.contactName}
                </li>
              ))}
          </ul>
        </div>
        <div className='button'></div>
      </div>
    </div>
  );
};

export default ContactList;
