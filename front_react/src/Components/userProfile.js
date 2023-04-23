import React, { useState } from "react";

function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("123 Main St, Anytown USA");

  function handleSubmit(event) {
    event.preventDefault();
    // handle form submission
  }

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Address:
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProfilePage;

