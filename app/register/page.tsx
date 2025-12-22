"use client";

import { useState } from "react";

const undergraduateDepartments = [
  "Architecture", "Physics", "Artificial Intelligence", "Computational Finance",
  "Computer Science", "Computer Science (TIEST)", "Cyber Security", "Data Science",
  "Development Studies", "Economics & Finance", "English Linguistics", "Gaming and Animation",
  "Chemistry", "Management Sciences", "Textile Sciences", "Automotive Engg.",
  "Bio-Medical Engg.", "Chemical Engg.", "Civil Engg.", "Civil Engg. (TIEST)",
  "Computer Systems Engg.", "Construction Engg.", "Electrical Engg.", "Electronics Engg.",
  "Food Engg.", "Industrial & Manufacturing Engg.", "Materials Engg.", "Mechanical Engg.",
  "Metallurgical Engg.", "Petroleum Engg.", "Polymer & Petrochemical Engg.", "Software Engg.",
  "Telecommunications Engg.", "Textile Engg.", "Urban Engg."
];

const undergraduateYears = ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year"];

export default function Register() {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, department, year })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registered successfully! You will be notified when your results are uploaded.");
        setEmail("");
        setDepartment("");
        setYear("");
      } else {
        setMessage(`❌ Error: ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      setMessage("❌ Error connecting to server");
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900">NED University Result Notifier</h1>
          <p className="text-gray-700 mt-2 text-sm sm:text-base">Register to get notified when your results are uploaded</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-gray-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </label>

          <label className="flex flex-col text-gray-700">
            Department
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            >
              <option value="">Select Department</option>
              {undergraduateDepartments.map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-gray-700">
            Year
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            >
              <option value="">Select Year</option>
              {undergraduateYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="mt-4 bg-amber-900 text-white font-semibold py-3 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Register
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <footer className="mt-6 text-gray-600 text-xs sm:text-sm text-center">
          © 2025 NED University of Engineering & Technology
        </footer>
      </div>
    </div>
  );
}
