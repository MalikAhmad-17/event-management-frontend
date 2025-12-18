// CreateEventWizard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEventWizard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // step state
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // form state
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: null, // FILE
    date: "",
    time: "",
    location: "",
    capacity: "",
    price: "",
  });

  const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleNext = () => {
    if (step === 1) {
      if (!form.title || !form.category) {
        alert("Please fill title and category");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!form.date || !form.location || !form.capacity) {
        alert("Please fill date, location and capacity");
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  // CREATE EVENT
  const handleCreate = async () => {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("price", form.price ? `₹${form.price}` : "Free");
    formData.append(
      "date",
      `${form.date} ${form.time || ""}`.trim()
    );
    formData.append("location", form.location);
    formData.append("organizer", user?.fullname || "Organizer");
    formData.append("registered", 0);
    formData.append("total", form.capacity);
    formData.append("totalparticipants", form.capacity);
    formData.append("description", form.description || "");

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        body: formData, // IMPORTANT: no headers
      });

      const data = await res.json();

      if (res.ok) {
        alert("Event created successfully");
        navigate("/organizer-dashboard");
      } else {
        alert(data.message || "Failed to create event");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-[#153b9a] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto">Create New Event</div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* STEP INDICATOR */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex-1 text-center ${step >= 1 ? "text-green-600" : "text-gray-400"}`}>
            1<br />
            <span className="text-sm">Basic Info</span>
          </div>
          <div className={`flex-1 text-center ${step >= 2 ? "text-green-600" : "text-gray-400"}`}>
            2<br />
            <span className="text-sm">Details</span>
          </div>
          <div className={`flex-1 text-center ${step >= 3 ? "text-green-600" : "text-gray-400"}`}>
            3<br />
            <span className="text-sm">Settings</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-200">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h3 className="font-semibold mb-4">Basic Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700">Event Title *</label>
                  <input
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md"
                  >
                    <option value="">Select category</option>
                    <option>Technology</option>
                    <option>Business</option>
                    <option>Music</option>
                    <option>Marketing</option>
                    <option>Education</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-700">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows="4"
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Event Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => update("image", e.target.files[0])}
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h3 className="font-semibold mb-4">Event Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-gray-700">Location *</label>
                  <input
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Capacity *</label>
                  <input
                    type="number"
                    value={form.capacity}
                    onChange={(e) => update("capacity", e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Ticket Price (INR)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h3 className="font-semibold mb-4">Event Summary</h3>

              <div className="text-sm text-gray-700 space-y-1">
                <div>Title: {form.title}</div>
                <div>Category: {form.category}</div>
                <div>Date: {form.date}</div>
                <div>Location: {form.location}</div>
                <div>Capacity: {form.capacity}</div>
                <div>Price: {form.price ? `₹${form.price}` : "Free"}</div>
              </div>
            </div>
          )}

          {/* CONTROLS */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleBack}
              className="bg-white border px-4 py-2 rounded-md"
            >
              ← Back
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleCreate}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
