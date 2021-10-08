import Header from "./components/Header";
import Form from "./components/Form";
import Contacts from "./components/Contacts";
import Input from "./components/Input";
import contactService from "./services/contacts";
import { useEffect, useState } from "react";

class Contact {
	constructor (id, name, number) {
		this.id = id;
		this.name = name;
		this.number = number;
	}
}

function App() {
	const [contacts, setContacts] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [filteredContacts, setFilteredContacts] = useState([]);

	useEffect(() => {
		contactService
			.getAll()
			.then(list => setContacts(list))
			.catch(error => {
				alert('could not retrieve the list of contacts from the server');
				console.log('could not retrive the list of contacts from the server', error);
				setContacts([]);
			});
	}, []);

	const filterContacts = (event) => {
		setFilter(event.target.value);
		setFilteredContacts(contacts.filter(contact => contact.name.toLowerCase().includes(event.target.value.toLowerCase())));
	};

	const addContact = (event) => {
		event.preventDefault();

		if (!newName) {
			return alert('the new name cannot be empty');
		}

		if (!newNumber) {
			return alert('the new number cannot be empty');
		}

		const existingContact = contacts.find(contact => contact.name.toLowerCase() === newName.toLowerCase());

		if (existingContact) {
			if (window.confirm(`${existingContact.name} is already added to the phonebook, replace the old number with a new one?`)) {
				contactService
					.update(existingContact.id, { ...existingContact, number: newNumber })
					.then(contactUpdated => setContacts([ ...contacts.filter(contact => contact.id !== contactUpdated.id), contactUpdated ]))
					.catch(error => {
						alert('could not update the contact number');
						console.log('could not update the contact number', error);
					});
			}

			return;
		}

		const largestIdContact = contacts.reduce((largest, current) => current.id > largest.id ? current : largest);
		const newId = largestIdContact.id + 1;

		contactService
			.create(new Contact(newId, newName, newNumber))
			.then(newContact => setContacts(contacts.concat(newContact)))
			.catch(error => {
				alert(`could not create a new contact`);
				console.log('could not create a new contact', error);
			});
	}

	const deleteContact = (id) => {
		contactService
			.remove(id)
			.then(data => setContacts(contacts.filter(contact => contact.id !== id)))
			.catch(error => {
				alert('could not remove the contact');
				console.log('could not remove the contact', error);
			});
	}

	const fields = [
		{ id: 'name', name: 'name', value: newName, handler: (event) => setNewName(event.target.value) },
		{ id: 'number', name: 'number', value: newNumber, handler: (event) => setNewNumber(event.target.value) }
	];

	return (
		<>
			<Header level="2" text="Phonebook" />
			<Input label="filter shown with" name="filter" value={filter} handler={filterContacts} />
			<Header level="3" text="add a new" />
			<Form action={addContact} fields={fields} buttonLabel="add" />
			<Header level="2" text="Numbers" />
			<Contacts contacts={!filteredContacts.length > 0 ? contacts : filteredContacts} onClick={(id) => deleteContact(id)} />
		</>
	);
}

export default App;