import React from "react";
import uuid from "react-uuid";

const Filter = ({ filter, handleFilterChange, persons }) => {
    const result = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()) && filter !== ""
    );
   
    
    
    return (
      <div>
        filter shown with{" "}
        <input value={filter} onChange={handleFilterChange}  />
        {result.length > 0 ? (
        result.map((person) => (
            
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))) : ( <p>No match found</p>)}
        
      </div>
    );
        
};

export default Filter;
 