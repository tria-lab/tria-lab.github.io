export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Contact</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Get in Touch</h2>
        <p className="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Address</h3>
            <p>
              TRIA Laboratory
              <br />
              Building A, Room 301
              <br />
              University Campus
              <br />
              City, State 12345
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Email</h3>
            <p>contact@trialab.edu</p>
            <h3 className="mt-4 mb-2 text-lg font-semibold">Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Office Hours</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Contact Form</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  )
}
