//contact
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import Reveal from './Reveal';
import { CONTACT } from '../data/portfolio';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section
      id="contact"
      number="07"
      eyebrow="Contact"
      title={
        <>
          Let's build <span className="accent">something great.</span>
        </>
      }
      sub="Open to freelance work, full-time roles, and collaborations. Have an idea? Let's talk."
    >
      <div className="contact-grid">
        <Reveal>
          <div className="contact-lines">
            <div className="contact-line">
              <span>Email</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
            <div className="contact-line">
              <span>GitHub</span>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                github.com/wafathima
              </a>
            </div>
            <div className="contact-line">
              <span>LinkedIn</span>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/wafa-fathima
              </a>
            </div>
            <div className="contact-line">
              <span>Location</span>
              <strong>{CONTACT.location}</strong>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit}>
            <label className="field">
              <span>Your Name</span>
              <input
                type="text"
                required
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </label>
            <label className="field">
              <span>Your Email</span>
              <input
                type="email"
                required
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
            </label>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Send Message</span>
              <ArrowUpRight size={15} style={{ position: 'relative', zIndex: 1 }} />
            </button>
            <p className="form-note">
              Submitting opens your default email application with your
              message prefilled. You can review and send it from there.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}