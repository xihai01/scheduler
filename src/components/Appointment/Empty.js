import React from "react";

//component takes in a onAdd()
export default function Empty(props) {
  const { onAdd } = props;
  return (
    <main
      onClick={(e) => {
        onAdd();
      }}
      className="appointment__add"
    >
      <img className="appointment__add-button" src="images/add.png" alt="Add" />
    </main>
  );
}
