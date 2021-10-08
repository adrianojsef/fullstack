import Contact from './Contact';
import React from 'react';

const Contacts = ({ contacts, onClick }) => {
	return (
		<>
			{contacts.map((contact, index) => <Contact key={index} contact={contact} onClick={onClick} />)}
		</>
	);
};

export default Contacts;