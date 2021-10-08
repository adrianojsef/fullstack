import axios from "axios";

const baseUrl = 'http://localhost:3001/contacts';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
}

const getContact = (id) => {
	const request = axios.get(`${baseUrl}/${id}`);
	return request.then(response => response.data);
}

const create = (newContact) => {
	const request = axios.post(baseUrl, newContact);
	return request.then(response => response.data);
}

const update = (id, contactDetails) => {
	const request = axios.put(`${baseUrl}/${id}`, contactDetails);
	return request.then(response => response.data);
}

const remove = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then(response => response.data);
}

export default { getAll, getContact, create, update, remove }