"use client";

import { useState } from "react";

export default function NewFundraiserPage() {
  const [title, setTitle] = useState("");
  const [causeType, setCauseType] = useState("self");

  const handleCreate = async () => {
    const res = await fetch("/api/fundraiser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        causeType,
        userId: "demo-user",
      }),
    });

    const data = await res.json();

    alert("Fundraiser created! ID: " + data.id);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Create Fundraiser</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginTop: 10, padding: 10 }}
      />

      <select
        value={causeType}
        onChange={(e) => setCauseType(e.target.value)}
        style={{ display: "block", marginTop: 10, padding: 10 }}
      >
        <option value="self">Myself</option>
        <option value="school">School</option>
        <option value="club">Club</option>
        <option value="nonprofit">Nonprofit</option>
        <option value="other">Other</option>
      </select>

      <button onClick={handleCreate} style={{ marginTop: 20, padding: 10 }}>
        Create
      </button>
    </main>
  );
}