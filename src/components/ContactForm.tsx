'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CtaButton from '@/components/CtaButton';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setFormSubmitted(true);
    reset();

    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="rounded-lg border border-black/15 bg-white p-6 md:p-8">
      <h2 className="mb-6 text-center text-2xl font-bold text-black">Send Us a Message</h2>

      {formSubmitted ? (
        <div className="mb-6 rounded-lg border border-black/20 bg-white p-4 text-center text-black">
          <p>Thank you for your message. We&apos;ll get back to you soon!</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-black">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            className={`w-full rounded-md border bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black ${
              errors.name ? 'border-red-500' : 'border-black/20'
            }`}
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-black">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={`w-full rounded-md border bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black ${
              errors.email ? 'border-red-500' : 'border-black/20'
            }`}
            placeholder="john@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium text-black">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            className={`w-full rounded-md border bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black ${
              errors.subject ? 'border-red-500' : 'border-black/20'
            }`}
            placeholder="How can we help?"
            {...register('subject', { required: 'Subject is required' })}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-black">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full rounded-md border bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black ${
              errors.message ? 'border-red-500' : 'border-black/20'
            }`}
            placeholder="Your message here..."
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters',
              },
            })}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <CtaButton as="button" type="submit" icon="arrow">
            Send Message
          </CtaButton>
        </div>
      </form>
    </div>
  );
}
