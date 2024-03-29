import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const create = (person) => axios.post(baseUrl, person).then((res) => res.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

const update = (person) =>
  axios.put(`${baseUrl}/${person._id}`, person).then((res) => res.data);

export default { getAll, create, remove, update };
