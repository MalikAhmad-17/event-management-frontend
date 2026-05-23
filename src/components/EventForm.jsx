import React, { useState } from "react";
import { Switch } from "@headlessui/react";

function EventForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    price: "",
    enablePayments: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePayment = () => {
    setFormData({ ...formData, enablePayments: !formData.enablePayments });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", formData);
    alert("🎉 Event Created Successfully!");
  };

  const steps = ["Basic Info", "Details", "Settings"];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        
       
        <div className="relative flex justify-between mb-10">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0"></div>
          <div
            className="absolute top-4 left-0 h-1 bg-green-500 z-10 transition-all duration-500"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>

          {steps.map((label, index) => (
            <div key={index} className="flex flex-col items-center relative z-20">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                  step === index + 1
                    ? "bg-green-500"
                    : step > index + 1
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                {step > index + 1 ? "✓" : index + 1}
              </div>
              <p
                className={`text-sm mt-2 ${
                  step === index + 1 ? "text-green-600 font-semibold" : "text-gray-500"
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

     
        {step === 1 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-lg font-semibold mb-1 text-left ">Basic Information</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 text-left font-medium mb-1">Event Title </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Tech Innovation Summit 2025"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-left text-gray-700 font-medium mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                >
                  <option value="">Select category</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Meetup">Meetup</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-left font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  placeholder="Tell people what your event is about..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-left text-gray-700 font-medium mb-1">Event Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                />
              </div>
            </div>

            <div className="flex justify-between mt-8 border-t pt-4">
              <button
                type="button"
                className="border px-5 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Next →
              </button>
            </div>
          </form>
        )}

        {/* DETAILS */}
        {step === 2 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-lg font-semibold mb-4">Event Details</h2>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-left text-gray-700 font-medium mb-1">Location *</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Mumbai Convention Center"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Capacity *</label>
                  <input
                    type="number"
                    name="capacity"
                    placeholder="e.g., 200"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Ticket Price *</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g., 499"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8 border-t pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="border px-5 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Next →
              </button>
            </div>
          </form>
        )}

        {/* SETTINGS */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg  text-left font-semibold mb-4">Payment & Settings</h2>

            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold">Enable Online Payments</p>
                <p className="text-sm text-gray-500">
                  Accept payments via Stripe or Razorpay
                </p>
              </div>
              <Switch
                checked={formData.enablePayments}
                onChange={togglePayment}
                className={`${
                  formData.enablePayments ? "bg-green-500" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    formData.enablePayments ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            <div className="bg-green-50 p-4 rounded-md border border-green-100 mt-6">
              <h3 className="font-semibold mb-2">Event Summary</h3>
              <p>Title: {formData.title || "Not set"}</p>
              <p>Category: {formData.category || "Not set"}</p>
              <p>Date: {formData.date || "Not set"}</p>
              <p>Location: {formData.location || "Not set"}</p>
              <p>Capacity: {formData.capacity || "Not set"}</p>
              <p>Price: ₹{formData.price || 0}</p>
            </div>

            <div className="flex justify-between mt-8 border-t pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="border px-5 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
              >
                ✓ Create Event
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EventForm;
