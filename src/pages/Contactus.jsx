import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Contactus = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_jx6m45e',     // Replace with your EmailJS service ID
      'template_bkg7juc',    // Replace with your EmailJS template ID
      form.current,
      'mAS3Hdh-_F5Vav-Kr'      // Replace with your EmailJS public key (user_xxx)
    )
    .then((result) => {
        alert('Message sent successfully!');
        form.current.reset(); // Clear form after success
    }, (error) => {
        alert('Failed to send message. Please try again.');
        console.error(error.text);
    });
  };

  return (
    <div className='contactcont'>
      <h1><b>Contact Us</b></h1>
      <p>We'd love to hear from you! Whether you have a question, feedback, or just want to
        share your culinary adventures, feel free to reach out to us.</p>

      <h3><b>Get in Touch</b></h3>
      <p><b>Email:</b> info@foodytale.com</p>
      <p><b>Phone:</b> +1 (123) 456-7890</p>
      <p><b>Address:</b> 123 Culinary Lane, Foodie City, FC 12345</p>

      <h3><b>Follow Us</b></h3>
      <p>Stay connected and get the latest updates, recipes, and stories by following us on social media:</p>
      <p><b>Facebook:</b> facebook.com/foodytale</p>
      <p><b>Instagram:</b> instagram.com/foodytale</p>
      <p><b>Twitter:</b> twitter.com/foodytale</p>
      <p><b>Pinterest:</b> pinterest.com/foodytale</p>

      <h4><b>Send Us a Message</b></h4>
      <p>If you prefer, you can also send us a message directly through our website.
        Just fill out the form below, and we'll get back to you as soon as possible.</p>

      <div className='contact-form'>
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contactus;
