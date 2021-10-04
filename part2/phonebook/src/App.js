import Header from "./components/Header";
import Form from "./components/Form";
import Contacts from "./components/Contacts";
import Input from "./components/Input";
import axios from "axios";
import { useEffect, useState } from "react";

class Contact {
	constructor (name, number) {
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
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setContacts(response.data);
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

		if (contacts.find(contact => contact.name.toLowerCase() === newName.toLowerCase())) {
			return alert(`${newName} is already added to phonebook`);
		}

		setContacts(contacts.concat(new Contact(newName, newNumber)));
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
			<Contacts contacts={!filteredContacts.length > 0 ? contacts : filteredContacts} />
		</>
	);
}

export default App;