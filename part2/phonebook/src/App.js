import Header from "./components/Header";
import Form from "./components/Form";
import Contacts from "./components/Contacts";
import Input from "./components/Input";
import Notification from "./components/Notification";
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
	const [notification, setNotification] = useState({ message: '', type: '' });
	const [clearNotification, setClearNotification] = useState();

	function setupNotification(newNotification) {
		setNotification(newNotification);

		clearTimeout(clearNotification);
		setClearNotification(setTimeout(() => setNotification({ message: '', type: '' }), 5000));
	}

	useEffect(() => {
		contactService
			.getAll()
			.then(list => setContacts(list))
			.catch(() => {
				setupNotification({ message: 'Could not retrieve the list of contacts from the server', type: 'error' });
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
			setupNotification({ message: 'The new name cannot be empty', type: 'error' });
			return;
		}

		if (!newNumber) {
			setupNotification({ message: 'The new number cannot be empty', type: 'error' });
			return;
		}

		const existingContact = contacts.find(contact => contact.name.toLowerCase() === newName.toLowerCase());

		if (existingContact) {
			if (window.confirm(`${existingContact.name} is already added to the phonebook, replace the old number with a new one?`)) {
				contactService
					.update(existingContact.id, { ...existingContact, number: newNumber })
					.then(contactUpdated => {
						setupNotification({ message: `Updated ${contactUpdated.name}`, type: 'success' });
						setContacts([ ...contacts.filter(contact => contact.id !== contactUpdated.id), contactUpdated ]);
					})
					.catch(error => {
						switch(error.response?.status) {
							case 404:
								setupNotification({ message: 'The contact no longer exists', type: 'error' });
								break;
							
							default:
								setupNotification({ message: 'Could not update the contact', type: 'error' });
						}
					});
			}

			return;
		}

		const largestIdContact = contacts.reduce((largest, current) => current.id > largest.id ? current : largest);
		const newId = largestIdContact.id + 1;

		contactService
			.create(new Contact(newId, newName, newNumber))
			.then(newContact => {
				setupNotification({ message: `Added ${newContact.name}`, type: 'success' });
				setContacts(contacts.concat(newContact));
			})
			.catch(() => setupNotification({ message: 'Could not create a new contact', type: 'error' }));
	}

	const deleteContact = (id) => {
		contactService
			.remove(id)
			.then(() => {
				const removedContact = contacts.find(contact => contact.id === id);
				setupNotification({ message: `Removed ${removedContact.name}`, type: 'success' });
				setContacts(contacts.filter(contact => contact.id !== id));
			})
			.catch(error => {
				switch(error.response?.status) {
					case 404:
						setupNotification({ message: 'The contact has already been removed before', type: 'warning' });
						setContacts(contacts.filter(contact => contact.id !== id));
						break;
					
					default:
						setupNotification({ message: 'Could not update the contact', type: 'error' });
				}
			});
	}

	const fields = [
		{ id: 'name', name: 'name', value: newName, handler: (event) => setNewName(event.target.value) },
		{ id: 'number', name: 'number', value: newNumber, handler: (event) => setNewNumber(event.target.value) }
	];

	return (
		<>
			<Header level="2" text="Phonebook" />
			<Notification message={notification.message} type={notification.type} />
			<Input label="filter shown with" name="filter" value={filter} handler={filterContacts} />
			<Header level="3" text="add a new" />
			<Form action={addContact} fields={fields} buttonLabel="add" />
			<Header level="2" text="Numbers" />
			<Contacts contacts={!filteredContacts.length > 0 ? contacts : filteredContacts} onClick={(id) => deleteContact(id)} />
		</>
	);
}

export default App;