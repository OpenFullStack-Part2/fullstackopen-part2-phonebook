import React from "react";

const PersonsForm = ({ newName, newNumber, handlePersonsChange, handleNumberChange, addNumber, update }) => {
return (
<form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handlePersonsChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
  };

export default PersonsForm