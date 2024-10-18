import "./ContactStyles.css";
import { useState } from "react";

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({
    email: "",
    name: "",
    messageDescription: "",
  });

  const handleChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  let body = {
    data: {
      email: contactForm.email,
      name: contactForm.name,
      messageDescription: contactForm.messageDescription,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.name) {
      alert("Please fill out your email and name");
    } else {
      fetch("https://africart-strapi-api.onrender.com/api/messages", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      }).then((response) => response.json());
      alert("Your inquiry has been successfully receievd");
      setContactForm({ email: "", name: "", messageDescription: "" });
    }
  };
  return (
    <>
      <div className=" lg:flex lg:justify-center lg:items-center contact lg:h-5/6 lg:m-16">
        <div className="lg:w-1/2 w-full">
          <h1 className="text-5xl font-bold m-4">Contact Us</h1>
          <h3 className="mt-6 m-4">
            Need to get in touch with us? Fill out the form with your inquiry.
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center contact-form lg:p-6  ">
          <form action="" className=" form-contact">
            <div className="lg:flex form-div">
              <div className="m-2 flex flex-col">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  required
                  value={contactForm.email}
                  placeholder="Enter your email"
                  className="lg:w-64 lg:p-2 p-4 rounded outline-none bg-[#ddd]"
                  onChange={handleChange}
                />
              </div>
              <div className="m-2 flex flex-col">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={contactForm.name}
                  placeholder="Enter your name"
                  onChange={handleChange}
                  className="lg:w-64 lg:p-2 p-4 rounded outline-none bg-[#ddd]"
                />
              </div>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="">Message</label>
              <textarea
                name="messageDescription"
                id=""
                cols={3}
                rows={5}
                value={contactForm.messageDescription}
                onChange={handleChange}
                className="rounded outline-none bg-[#ddd] lg:p-2 p-4"></textarea>
            </div>
            <button
              className="bg-[#102262] w-full text-white p-2  rounded-2xl font-semibold"
              onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
