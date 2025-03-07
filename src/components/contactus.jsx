import React, { useState } from 'react';
import "../styles/contactus.css";

export default function contactus() {
    return (
        <div>
            <div class="contact-container">
                <form action="https://api.web3forms.com/submit" method="POST" class="contact-left">
                    <div class="contact-left-title">
                        <h2>Get in touch</h2>
                        <hr />
                    </div>
                    <input type="hidden" name="access_key" value="f9549c7a-c110-4dff-b9d5-ccf642b13c2b" />
                    <input type="text" name="name" placeholder="Your Name" class="contact-inputs" required />
                    <input type="email" name="email" placeholder="Your Email" class="contact-inputs" required />
                    <textarea name="message" placeholder="Your Message..." class="contact-inputs" required></textarea>
                    <button type="submit">Submit <img src="assets/arrow_icon.png" alt="" /></button>
                </form>
                <div class="contact-right">
                </div>
            </div>
        </div>

    )
}