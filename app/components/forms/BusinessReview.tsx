'use client'

import { useForm } from '@/app/hooks/useForm'

interface BusinessReviewProps {
    planName: string
}

const BusinessReview = ({ planName }: BusinessReviewProps) => {
    const { form, status, error, handleChange, handleSubmit } = useForm({
        initialValues: { name: '', email: '', business_name: '', products_services: '', project: '' },
        formType: 'business-review',
        requiredFields: ['sender_name', 'sender_email', 'business_name', 'products_services', 'project'],
        extraData: { plan_name: planName }
    })

    if (status === 'success') {
        return (
            <div>
                <h2 className="text-xl font-extrabold text-white mb-2">Request received</h2>
                <p className="text-white/60 text-sm">{`Thanks for getting in touch. We'll get back to you shortly.`}</p>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-xl font-extrabold text-white mb-2">{planName}</h2>
            <p className="text-white/60 text-sm mb-6">{`Fill in the form below and we'll get back to you.`}</p>

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
                <input
                    type="text"
                    name="business_name"
                    placeholder="Your business name"
                    value={form.business_name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary"
                />
                <input
                    type="text"
                    name="products_services"
                    placeholder="What products or services do you sell?"
                    value={form.products_services}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary"
                />
                <textarea
                    name="project"
                    placeholder="Brief overview of your project"
                    value={form.project}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-primary resize-none"
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-primary text-brand-secondary font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                    {status === 'loading' ? 'Sending...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default BusinessReview
