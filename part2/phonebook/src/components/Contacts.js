import Contact from './Contact';
import React from 'react';

const Contacts = ({ contacts }) => {
	return (
		<>
			{contacts.map((contact, index) => <Contact key={index} contact={contact} />)}
		</>
	);
};

export default Contacts;