import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import "../Styling/AvailableVenues.css";

export function AvailableVenues() {
  return (
    <div>
      <Navbar />
      <div className="Hero-image">
        <h1 className="text">
          Welcome To Novus Explore events, <br></br>Book your sits and create
          events{" "}
        </h1>
        {/* <p>
              From live music and fashion shows to exhibitions
              and other events, NOVUS gives users one simple
              place to find something worth attending.
            </p> */}

        <a href="/user">
          <div className="Button-container">
            <button className="buttons" type="button">
              Click Me
            </button>
          </div>
        </a>
      </div>
      <br></br>
      <div className="Hero-Two">
        <div>About Us</div>
      </div>
      <div className="content-wrapper">
            {/* Left Side: The Image Container */}
            <div className="left-side">
                <img src="assets/pexels-photo4passion-1772873.jpg" alt="Concert" />
            </div>
    
            <div className="right-side">
                <div className="text-content">
                    <h2 className="section-title">Quality Assurance</h2>
                    
                    <p>
                        "Hand-inspected for superior craftsmanship. <br />
                        This footwear is certified to meet our premium standards for durability and comfort."
                    </p>
                    
                    <p>
                        Investing in high-quality footwear is an investment in both your physical well-being and your personal style. 
                        Beyond the aesthetic appeal of premium materials like full-grain leather or breathable technical knits, 
                        superior craftsmanship ensures a structural integrity that supports your posture and provides lasting comfort throughout.
                    </p>
                    
                    <p >
                        While mass-produced alternatives may offer a temporary trend, well-made shoes are designed to develop a unique 
                        patina over time, becoming more comfortable and character-rich with every wear. By choosing quality over quantity, 
                        you prioritize durability and timeless design, ensuring that your foundation is as solid as it is sophisticated.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AvailableVenues;
