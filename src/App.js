import { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("write the contact");
  const [newNumber, setNewNumber] = useState("write the number");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handlePersonsChange = (e) => {
    console.log("changed", e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    console.log("changed", e.target.value);
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    console.log("changed", e.target.value);
    setFilter(e.target.value);
  }

  const addNumber = (e) => {
    e.preventDefault();

    const numberObject = {
      name: newName,
      id: uuid(),
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(numberObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} persons={persons} />
      </div>
      <h2>Add a new</h2>
      <PersonsForm newName={newName} newNumber={newNumber} handlePersonsChange={handlePersonsChange} handleNumberChange={handleNumberChange} addNumber={addNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
     
    </div>
  );
};

export default App;
