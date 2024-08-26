
import React from 'react'
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import style from './About.module.scss'

const About = () => {
  return (
    <main className={style["main-about"]}>
      <section className={style.title}>
        <h2>About Us</h2>
        <h3>Welcome to <span>PYSCRIPT</span>!</h3>
        <p>
        At PyScript, we’re passionate about exploring the latest in technology, culture, and innovation. Our goal is to provide you with insightful, engaging, and well-researched content that not only informs but also inspires.
        </p>
      </section>
      <section>
        <h3>Our Mission</h3>
        <p>
        Our mission is to connect enthusiasts and experts through high-quality content, fostering a community of knowledge-sharing and thought-provoking discussions. We believe that knowledge is best when it’s shared, and we are committed to delivering articles that are both informative and accessible.
        </p>
      </section>
      <section className={style.list}>
        <h3>What We Offer</h3>
        <ol>
          <li><span>In-Depth Articles:</span>
          We dive deep into the latest tech trends, cultural phenomena, and practical guides, offering you detailed and well-researched content that adds value to your understanding.
          </li>
          <li><span>Interactive Community:</span>
          We value our readers and encourage engagement through comments, discussions, and social media. Join the conversation and be a part of our growing community.
          </li>
        </ol>
      </section>
      <section>
        <h3>Our Journey</h3>
        <p>
        PyScript began as a small project to share personal insights on emerging technologies, and is growing day by day with your valuable thoughts. Over the years, we’ve expanded our scope to include a broader range of topics and contributions from experts around the world.
        </p>
      </section>
      <section>
        <h3>Why We Write</h3>
        <p>
        In a world overflowing with information, our goal is to cut through the noise and deliver content that is thoughtfully curated and genuinely useful. We are driven by a commitment to fostering an informed and engaged community and believe that every reader deserves access to high-quality, relevant information.
        </p>
      </section>
      <section className={style["about-last"]}>
        <h3>Get In Touch</h3>
        <p>
        We love hearing from our readers! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us at <span title='not a real contact address'>contact@pyscript.com</span> . You can also follow us on <a href="#"><IoLogoWhatsapp /></a>   <a href="#"><FaFacebook /></a> <a href="#"><IoLogoInstagram /></a> <a href="#"><FaTelegram /></a> <a href="#"><FaXTwitter /></a> to stay updated with our latest posts and updates.
        </p>
        <p>
        Thank you for visiting PyScript. We’re excited to have you with us on this journey and look forward to sharing more with you.
        </p>
        <span>Warm regards,</span>
        <span>The PyScript Team</span>
      </section>
    </main>
  )
}

export default About
