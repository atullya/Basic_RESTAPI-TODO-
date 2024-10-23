import React from "react";

export default function ComponentA({ user }) {
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Location: {user.location}</p>
      <p>Gender: {user.gender}</p>
    </div>
  );
}
