// import React, {useState} from "react";
// import emailjs from "@emailjs/browser";
// import "../Styling/ApplicationForm.css";

// export function ApplicationForm(){
//     const [formData, setFormData] = useState({
//         fullnmae: "",
//         email: "",
//         phone: "",
//         experience: "",
//         motivation: "",
//         eventType: "",
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = (e) => {
//   e.preventDefault();

//   emailjs
//     .send(
//       "service_qnpw5un",
//       "__ejs-test-mail-service__",
//       formData,
//       "PcPMzpQ4tUTsaEn2s"
//     )
//     .then(
//       (result) => {
//         console.log("Application sent:", result.text);
//         alert("Your manager application has been submitted!");

//         setFormData({
//           fullName: "",
//           email: "",
//           phone: "",
//           experience: "",
//           motivation: "",
//           eventType: "",
//         });
//       },
//       (error) => {
//         console.error("EmailJS error:", error);
//         alert("Something went wrong. Please try again.");
//       }
//     );
// };

//     return (
//         <div className="application-ppage">
//             <div className="application-card">

//                 <div className="application-header">
//                     <h1>Manager Application</h1>
//                     <p>
//                         Interested in managing events? Complete the form below to apply.
//                     </p>
//                 </div>
//                 <form onSubmit={handleSubmit} className="application-form">

//                     <div className="form-group">
//                         <label htmlFor="fullName">Full Name</label>
//                         <input
//                         type="text"
//                         id="fullname"
//                         name="fullname"
//                         placeholder="Enter your full name"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         required
//                         />
//                     </div>

//                     <div className="form-row">
//                         <label htmlFor="email">Email Address</label>
//                         <input 
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="Enter your email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="phone">Phone Number</label>
//                         <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         placeholder="Enter your phone number"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="motivation">
//                         </label>

//                         <textarea
//                         // id="motivation"
//                         // name="motivation"
//                         // placeholder="Tell us why you would like to become a manager..."
//                         // onChange={formData}
//                         // rows="6"
//                         // Example for the Full Name input field around line 107
                        
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                         required
//                         />
//                     </div>

//                     <button type="submit" className="submit-button">
//                         Submit Application
//                     </button>

//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ApplicationForm

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../Styling/ApplicationForm.css";

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    motivation: "",
    eventType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_qnpw5un",
        "template_uiyvakd",
        formData,
        "PcPMzpQ4tUTsaEn2s"
      )
      .then(
        (result) => {
          console.log("Application sent:", result.text);
          alert("Your manager application has been submitted!");

          setFormData({
            fullName: "",
            email: "",
            phone: "",
            experience: "",
            motivation: "",
            eventType: "",
          });
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (

    <div className="application-ppage">
            {/* <Navbar /> */}
      <div className="application-card">
        <div className="application-header">
          <h1>Manager Application</h1>
          <p>
            Interested in managing events? Complete the form below to apply.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="motivation">Motivation</label>
            <textarea
              id="motivation"
              name="motivation"
              placeholder="Tell us why you would like to become a manager..."
              value={formData.motivation}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
