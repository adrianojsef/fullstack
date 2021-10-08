import React from "react";

const Contact = ({ contact, onClick }) => {
    const confirmDeletion = () => {
        if (window.confirm(`Do you want to delete ${contact.name}?`)) {
            onClick(contact.id);
        }
    };

    return (
        <div>
            <label>{contact.name} {contact.number}</label>
            <button onClick={confirmDeletion}>delete</button>
        </div>
    );
};

export default Contact;