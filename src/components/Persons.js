import React from "react";
import uuid from "react-uuid";
const Persons = ({ persons, deleteNumber }) => {
  return persons.map((person) => (
    <p key={uuid()}>
      {person.name} {person.number} <button onClick={() => deleteNumber(person.id)}>delete</button>
    </p>
  ));
};

export default Persons;
