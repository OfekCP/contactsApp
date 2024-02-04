import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import {Routes, Route ,Link} from 'react-router-dom'
import ContactList from './ContactList.jsx'
import CreateContact from './CreateContact.jsx'
 import ContactDetails from './ContactDetails.jsx'
 import CallingScreen from './CallingScreen.jsx'
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
  <Routes>
    <Route path="/"   element={<ContactList contacts={contacts} onContactClick={handleContactClick} />} />
    <Route
            path="/create"
            element={<CreateContact onAddContact={fetchContacts} />}
          />
         <Route path="/:id" element={<ContactDetails contacts={contacts} />} />
         <Route path="/calling/:id" element={<CallingScreen contacts={contacts} />} />
  </Routes>
  );
};

export default App;
