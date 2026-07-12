'use client'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { trackContactSubmit } from '@/lib/analytics'

// Subject options per spec
const SUBJECT_OPTIONS = [
  'General Question',
  'Licensing',
  'Collaboration',
  'Feedback',
  'Report an Issue',
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    trackContactSubmit(subject)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-bg-elevated p-10 text-center flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-free/15 flex items-center justify-center text-free">
          <Send size={20} aria-hidden="true" />
        </div>
        <h2 className="font-heading text-heading-md text-text">Message sent</h2>
        <p className="font-body text-body-md text-text-secondary max-w-[340px]">
          Thank you — we will respond within two business days.
        </p>
      </div>
    )
  }

  const inputClass = "w-full h-11 px-4 rounded-md bg-bg border border-border text-text font-body text-body-sm placeholder:text-text-tertiary focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-border-focus/20 transition-colors duration-150"

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-bg-elevated p-8 flex flex-col gap-5"
      noValidate
    >
      {/* Subject dropdown */}
      <div>
        <label htmlFor="subject" className="block font-body text-label-sm font-medium text-text mb-2">
          Subject
        </label>
        <select
          id="subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className={inputClass}
        >
          {SUBJECT_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block font-body text-label-sm font-medium text-text mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-body text-label-sm font-medium text-text mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      {/* Company — optional */}
      <div>
        <label htmlFor="company" className="block font-body text-label-sm font-medium text-text mb-2">
          Company <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-body text-label-sm font-medium text-text mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          placeholder="Tell us what you have in mind…"
          className="w-full px-4 py-3 rounded-md bg-bg border border-border text-text font-body text-body-sm placeholder:text-text-tertiary resize-none focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-border-focus/20 transition-colors duration-150"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon={<Send size={15} />}
        iconPosition="right"
        fullWidth
      >
        Send message
      </Button>
    </form>
  )
}
