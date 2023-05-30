import { useState, useEffect } from "react";
import Notification from "./components/Notification";

import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import module from "./services/personsModule";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("write the contact");
  const [newNumber, setNewNumber] = useState("write the number");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    module.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

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
  };

  const addNumber = (e) => {
    e.preventDefault();

    const numberObject = {
      name: newName,

      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      const confirm = window.confirm(
        `${numberObject.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );

        module
        .update(personToUpdate.id, numberObject)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== personToUpdate.id ? person : response.data
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMessage(`Information of ${numberObject.name} has already been removed from server`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter((person) => person.id !== personToUpdate.id));
        });
      }
      return;
    }

    module
    .create(numberObject)
    .then((response) => {
      setSuccessMessage(`Added ${numberObject.name}`);
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  const deleteNumber = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) {
      module.remove(id).then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Notification message={successMessage} messageType='success'/>
        <Notification message={errorMessage} messageType='error'/>
        <Filter
          filter={filter}
          handleFilterChange={handleFilterChange}
          persons={persons}
        />
      </div>
      <h2>Add a new</h2>
      <PersonsForm
        newName={newName}
        newNumber={newNumber}
        handlePersonsChange={handlePersonsChange}
        handleNumberChange={handleNumberChange}
        addNumber={addNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deleteNumber={deleteNumber} />
    </div>
  );
};

export default App;
