'use client'

import { useForm } from '@/app/hooks/useForm'

// Contact form component
const ContactForm = () => {
    const { form, status, error, handleChange, handleSubmit } = useForm({
        initialValues: { name: '', email: '', message: '' },
        requiredFields: ['sender_name', 'sender_email', 'message'],
        formType: 'contact'
    })

    // Show success message
    if (status === 'success') {
        return (
            <div>
                <h2 className="text-xl font-extrabold text-white mb-2">Message sent</h2>
                <p className="text-white/60 text-sm">Thanks for getting in touch. We&apos;ll get back to you shortly.</p>
            </div>
        )
    }

    // Show form
    return (
        <div>
            <h2 className="text-xl font-extrabold text-white mb-2">Get in touch</h2>
            <p className="text-white/60 text-sm mb-6">Fill in the form below and we&apos;ll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary"
                />
                <textarea
                    name="message"
                    placeholder="Your message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary resize-none"
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                    {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>
            </form>
        </div>
    )
}

export default ContactForm
