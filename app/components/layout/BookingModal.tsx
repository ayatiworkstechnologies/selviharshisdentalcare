"use client";

import type React from "react";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  services: string[];
};

export function BookingModal({ open, onClose, services }: BookingModalProps) {
  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: hook into your API / form handler
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-black text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="mb-1 text-xl font-semibold text-slate-900">
          Book an Appointment
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          Fill in your details and we&apos;ll get back to you shortly.
        </p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
              placeholder="Your phone"
            />
          </div>

          <div>
            <label
              htmlFor="preferred-service"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Preferred Service
            </label>
            <select
              id="preferred-service"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
              defaultValue=""
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              placeholder="Select your preferred date"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-[#111111] px-4 py-2.5 text-sm font-semibold text-white hover:bg-black transition-colors"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
