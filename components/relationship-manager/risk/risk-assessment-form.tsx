"use client"

import type React from "react"

import { useState } from "react"

export function RiskAssessmentForm() {
  const [selectedClient, setSelectedClient] = useState("")
  const [assessmentType, setAssessmentType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setSelectedClient("")
        setAssessmentType("")
      }, 3000)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-slate-900">Risk Assessment Request</h3>
      </div>

      {isSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">Risk assessment request submitted successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-slate-700 mb-2">
            Select Client
          </label>
          <select
            id="client"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Choose a client...</option>
            <option value="acme-corp">Acme Corporation</option>
            <option value="global-tech">Global Tech Solutions</option>
            <option value="fintech-innovations">FinTech Innovations Ltd</option>
            <option value="secure-banking">Secure Banking Group</option>
            <option value="crypto-exchange">Crypto Exchange Pro</option>
          </select>
        </div>

        <div>
          <label htmlFor="assessment-type" className="block text-sm font-medium text-slate-700 mb-2">
            Assessment Type
          </label>
          <select
            id="assessment-type"
            value={assessmentType}
            onChange={(e) => setAssessmentType(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select assessment type...</option>
            <option value="initial">Initial Risk Assessment</option>
            <option value="periodic">Periodic Review</option>
            <option value="enhanced">Enhanced Due Diligence</option>
            <option value="transaction">Transaction-Based Review</option>
            <option value="escalation">Risk Escalation Review</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-2">
            Priority Level
          </label>
          <select
            id="priority"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select priority...</option>
            <option value="high">High - Urgent Review Required</option>
            <option value="medium">Medium - Standard Timeline</option>
            <option value="low">Low - Routine Assessment</option>
          </select>
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
            Assessment Reason
          </label>
          <textarea
            id="reason"
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the reason for this risk assessment..."
            required
          />
        </div>

        <div>
          <label htmlFor="due-date" className="block text-sm font-medium text-slate-700 mb-2">
            Required Completion Date
          </label>
          <input
            type="date"
            id="due-date"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Risk Assessment Request"}
        </button>
      </form>
    </div>
  )
}
