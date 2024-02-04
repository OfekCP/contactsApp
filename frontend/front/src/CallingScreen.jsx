import React, { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CallingScreen = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
   const nav=useNavigate()

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/contacts/${id}`);
      setContact(response.data);
    } catch (error) {
      console.error(error);
    }
  };
const handleDisconnect=()=>{
    nav(`/details/${contact._id}`)
}
  return (
    <div className="app-container">
        <h1>contact</h1>
        <div className='phone-frame'>
        <div className='speaker'></div>
        <div className='frontCamera'></div>
        <div className='screen'>
      {contact ? (
        <>
        <h1>Calling {contact.contactName}...</h1>
        <button className='disconnect' onClick={() => handleDisconnect(contact)}>disconnect</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
    <div className='button'></div>
    </div>
    </div>
  );
};

export default CallingScreen;
