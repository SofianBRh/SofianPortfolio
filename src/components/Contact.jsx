import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const apiKey1 = process.env.REACT_APP_API_KEY1;
const apiKey2 = process.env.REACT_APP_API_KEY2;
const apiKey3 = process.env.REACT_APP_API_KEY3;
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [countdown, setCountdown] = useState(5);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const nameInput = form.current.elements.from_name;
    const emailInput = form.current.elements.reply_to;
    const messageInput = form.current.elements.message;

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      openModal();
      return;
    }

    setShowForm(false);
    setIsLoading(true);

    emailjs.sendForm(apiKey1, apiKey2, form.current,apiKey3)
      .then((result) => {
        console.log(result.text);
        form.current.reset(); // Reset the form fields
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  useEffect(() => {
    let countdownTimer;

    if (isLoading) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [isLoading]);

  useEffect(() => {
    if (countdown === 0) {
      setIsLoading(false);
      setShowForm(true);
      setCountdown(5);
    }
  }, [countdown]);

  return (
    <div name="contact" className="w-full h-screen bg-gradient-to-b from-black to-gray-800 p-4 text-white">
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">Contact</p>
          <p className="py-6">Submit the form below to get in touch with me</p>
        </div>

        <div className="flex justify-center items-center">
          {showForm ? (
            <form onSubmit={sendEmail} ref={form} className="flex flex-col w-full md:w-1/2 relative">
              <>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Enter your name"
                  className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
                />

                <input
                  type="email"
                  name="reply_to"
                  placeholder="Enter your email"
                  className="my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
                />

                <textarea
                  name="message"
                  placeholder="Enter your message"
                  rows="10"
                  className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
                ></textarea>

                <button className="text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
                  Let's talk
                </button>
              </>
            </form>
          ) : (
            <div className="flex items-center justify-center w-full md:w-1/2">
              <div className="w-12 h-12 border-4 border-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black w-1/2 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Validation Error</h2>
              <p className="mb-4">Please fill in all fields before submitting the form.</p>
              <button className="text-white bg-blue-500 px-4 py-2 rounded-md" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-75 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Sending...</h2>
              <p className="text-white">Please wait. This may take a moment.</p>
              <p className="text-white">Countdown: {countdown}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
