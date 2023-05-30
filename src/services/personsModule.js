import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPersons) => {
 return axios.post(baseUrl, newPersons)
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newPersons) => {
  return axios.put(`${baseUrl}/${id}`, newPersons);
}


export default { getAll,create, remove, update}
