// CreateEventWizard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEventWizard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // form state
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleNext = () => {
    if (step === 1) {
      if (!form.title || !form.category) { alert("Please fill title and category"); return; }
      setStep(2);
    } else if (step === 2) {
      if (!form.date || !form.location || !form.capacity) { alert("Please fill date, location and capacity"); return; }
      setStep(3);
    }
  };

  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleCreate = async () => {
    // prepare payload
    const payload = {
      title: form.title,
      category: form.category,
      price: form.price ? `₹${form.price}` : "Free",
      date: `${form.date} ${form.time || ""}`.trim(),
      location: form.location,
      organizer: user ? user.fullname : "Organizer",
      registered: 0,
      total: parseInt(form.capacity || 0),
      totalparticipants: parseInt(form.capacity || 0),
      image: form.image || "https://via.placeholder.com/800x400",
      description: form.description || "",
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div className="bg-[#153b9a] text-white py-4 px-6">
        <div className="max-w-6xl mx-auto">Create New Event</div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex-1 text-center ${step >= 1 ? "text-green-600" : "text-gray-400"}`}>1<br/><span className="text-sm">Basic Info</span></div>
          <div className={`flex-1 text-center ${step >= 2 ? "text-green-600" : "text-gray-400"}`}>2<br/><span className="text-sm">Details</span></div>
          <div className={`flex-1 text-center ${step >= 3 ? "text-green-600" : "text-gray-400"}`}>3<br/><span className="text-sm">Settings</span></div>
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-200">
          {step === 1 && (
            <div>
              <h3 className="font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700">Event Title *</label>
                  <input value={form.title} onChange={e => update("title", e.target.value)} className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md" placeholder="e.g., Tech Innovation Summit 2025" />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Category *</label>
                  <select value={form.category} onChange={e => update("category", e.target.value)} className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md">
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
                  <textarea value={form.description} onChange={e => update("description", e.target.value)} className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md" rows="4" placeholder="Tell people what your event is about..."></textarea>
                </div>

                <div>
                  <label className="text-sm text-gray-700">Event Image URL</label>
                  <input value={form.image} onChange={e => update("image", e.target.value)} className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md" placeholder="https://example.com/image.jpg" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-semibold mb-4">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Date *</label>
                  <input type="date" value={form.date} onChange={e => update("date", e.target.value)} className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Time</label>
                  <input type="time" value={form.time} onChange={e => update("time", e.target.value)} className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-700">Location *</label>
                  <input value={form.location} onChange={e => update("location", e.target.value)} className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md" placeholder="e.g., San Francisco Convention Center" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Capacity *</label>
                  <input type="number" value={form.capacity} onChange={e => update("capacity", e.target.value)} className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md" placeholder="e.g., 500" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Ticket Price (INR)</label>
                  <input type="number" value={form.price} onChange={e => update("price", e.target.value)} className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-md" placeholder="0 for free events" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-semibold mb-4">Payment & Settings</h3>

              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">Enable Online Payments</label>
                <div className="inline-flex items-center gap-3 p-4 bg-gray-100 rounded-md">
                  <div className="flex-1 text-sm text-gray-600">Accept payments via Stripe or Razorpay (not integrated)</div>
                  <input type="checkbox" className="h-5 w-5" />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-md border border-green-100">
                <h4 className="font-medium mb-2">Event Summary</h4>
                <div className="text-sm text-gray-700">
                  <div>Title: {form.title || "Not set"}</div>
                  <div>Category: {form.category || "Not set"}</div>
                  <div>Date: {form.date || "Not set"}</div>
                  <div>Location: {form.location || "Not set"}</div>
                  <div>Capacity: {form.capacity || "Not set"}</div>
                  <div>Price: {form.price ? `₹${form.price}` : "₹0"}</div>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <button onClick={handleBack} className="bg-white border border-gray-200 px-4 py-2 rounded-md">← Back</button>

            {step < 3 ? (
              <button onClick={handleNext} className="bg-green-600 text-white px-4 py-2 rounded-md">Next →</button>
            ) : (
              <button onClick={handleCreate} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-md">
                {loading ? "Creating..." : "Create Event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
