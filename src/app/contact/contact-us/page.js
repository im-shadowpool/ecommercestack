import PageTitle from "@/components/my-components/page-title/PageTitle";

export default function ContactPage() {
  return (
    <>
   <PageTitle title="Contact Us" />
    <div className="padding-container py-6">
      <div className="bg-white mx-auto max-w-[80%] flex flex-col md:flex-row rounded shadow-lg">
        {/* Contact Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-evenly">
          <h2 className="text-xl font-bold">Question? Just ask.</h2>
          <p className="text-gray-600">
            We pride ourselves on exceptional customer service.
          </p>
          <form className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-md"
              required
            />
            <textarea
              placeholder="Message"
              className="w-full p-3 border rounded-md h-28"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-700 text-white p-3 rounded-md hover:bg-green-800"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="w-full md:w-1/2 p-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.5427110460673!2d144.78813957584967!3d-37.84759003597196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6620202667339%3A0x71ef875c54adcc06!2sUnit%201%2F25%20Burns%20Rd%2C%20Altona%20VIC%203018%2C%20Australia!5e0!3m2!1sen!2sin!4v1722483596016!5m2!1sen!2sin"
            width="100%"
            height="500"
            allowFullScreen
            loading="lazy"
            className="rounded-md border"
          ></iframe>
        </div>
      </div>
    </div>
    </>
  );
}
