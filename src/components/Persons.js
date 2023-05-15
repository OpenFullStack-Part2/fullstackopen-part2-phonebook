import React from "react";
import uuid from "react-uuid";
const Persons = ({ persons }) =>

{ return (
    persons.map((person) => (
    <p key={uuid()}>
      {person.name} {person.number}
    </p>
  )))}

export default Persons