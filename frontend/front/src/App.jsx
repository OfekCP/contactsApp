import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css'
import {Routes, Route ,Link} from 'react-router-dom'
import ContactList from './contactList.jsx'
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
      const response = await axios.get('http://localhost:8000/contacts');
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
         <Route path="/details/:id" element={<ContactDetails contacts={contacts} />} />
         <Route path="/calling/:id" element={<CallingScreen contacts={contacts} />} />
  </Routes>
  );
};

export default App;
