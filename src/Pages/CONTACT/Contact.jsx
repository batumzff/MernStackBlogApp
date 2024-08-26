import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTelegram, FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import style from "./Contact.module.scss"


const Contact = () => {
  return (
    <main className={style.main}>
      <section className={style["contact-container"]}>
        <h3>
          Illuminate Your <span>Thoughts</span> Your <span>Dreams</span>
        </h3>
        <div className={style.explanation}>
          <p>In the digital landscape of today's web, effective communication channels are crucial for building a strong connection with your audience. Our blog project integrates a thoughtfully designed Contact Page, aimed at enhancing user engagement and providing a seamless avenue for readers to reach out.</p>
          <p>The Contact Page serves as a vital touchpoint between our blog and its readers, offering a simple yet powerful form for users to get in touch. Whether readers have questions, feedback, or suggestions, this page is their gateway to direct communication. Designed with a user-friendly interface, the contact form includes essential fields such as Name, Email, and Message, ensuring that users can easily convey their thoughts and inquiries.</p>
          <p>Our approach to the Contact Page goes beyond mere functionality. With a modern, clean design powered by React and styled using Sass, the form not only looks appealing but also performs optimally across devices. The responsiveness of the page ensures that users on mobile devices have the same smooth experience as those on desktop. Additionally, the form's validation and feedback mechanisms are designed to provide users with immediate confirmation and error handling, thereby enhancing the overall user experience.</p>
          <p>What sets our Contact Page apart is its focus on accessibility and security. Each input field is equipped with appropriate labels and validation to ensure that users with varying needs can interact with the form effortlessly. On the security front, we prioritize data protection by sanitizing inputs to safeguard against common web vulnerabilities.</p>
          <p>Moreover, the integration with our backend allows for efficient handling of form submissions. This ensures that user messages are captured and processed reliably, enabling us to respond promptly and maintain a strong relationship with our readers. The feedback loop provided by the Contact Page not only helps in improving our content but also in fostering a more interactive and engaged community.</p>
          <p>In summary, the Contact Page is more than just a form; it's a bridge that connects us with our readers. It reflects our commitment to open communication and responsiveness, key elements in building a vibrant and connected online community. By focusing on both design and functionality, we ensure that every interaction is smooth, secure, and engaging, ultimately enhancing the overall value of our blog project.</p>
        </div>
        <div className={style["contact-info"]}>
          <a href="tel:123456789">
          <FaPhone />
          <span>Call Us</span>
          
          </a>
          <a href="mailto:pyscript@gmail.com">
            <BsFillEnvelopeAtFill />
           <span>Mail Us:</span> 
            <span className={style.email}>pyscript@gmail.com</span>
          </a>
        </div>
        <div className={style["contact-footer"]}>
          <div className={style.icons}>
            <div className={style.whatsapp}>
              <IoLogoWhatsapp />
            </div>
            <div className={style.facebook}>
              <FaFacebook />
            </div>
            <div className={style.instagram}>
              <IoLogoInstagram />
            </div>
            <div className={style.telegram}>
              <FaTelegram />
            </div>
            <div className={style.twitter}>
              <FaXTwitter />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;