import React, { useState, useRef, useEffect } from "react";
import { Card, TextInput } from "flowbite-react";
import axios from 'axios';

export const Cli = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const outputEndRef = useRef(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleCommandSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5001/exe",
      { command: input },
      { headers: { 'Content-Type': 'application/json' } }
    );
    setOutput(response.data.output);
    setInput("");
  };

  useEffect(() => {
    outputEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  return (
    <div className="w-full space-y-4 flex flex-col h-64 bg-black text-white overflow-auto p-4">
      <div className="flex-grow">
        <pre className="whitespace-pre-wrap">{output}</pre>
        <div ref={outputEndRef}></div>
      </div>
      <form onSubmit={handleCommandSubmit}>
        <TextInput
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full bg-black text-white"
        />
      </form>
    </div>
  );
};