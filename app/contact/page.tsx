import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <div style={{ maxWidth: 480 }}>
        <h1>Contact Us</h1>
        <form>
          <div className="field">
            <label className="field__label" htmlFor="name">Name</label>
            <input className="input" id="name" name="name" />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="email">Email</label>
            <input className="input" id="email" name="email" type="email" />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="message">Message</label>
            <textarea className="textarea" id="message" name="message" rows={5} />
          </div>
          <button type="submit" className="btn btn--primary">Send Message</button>
        </form>
      </div>
    </div>
  );
}
