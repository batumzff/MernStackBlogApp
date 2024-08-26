import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import footerStyle from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={footerStyle.footer}>
      <main className={footerStyle.container}>
        <section className={footerStyle.message}>
          Express Yourself Freely
        </section>
        <div className={footerStyle["footer-icons"]}>
          <div className={`${footerStyle.icon} ${footerStyle.iconWhatsapp}`}>
            <IoLogoWhatsapp />
          </div>
          <div className={`${footerStyle.icon} ${footerStyle.iconFacebook}`}>
            <FaFacebook />
          </div>
          <div className={`${footerStyle.icon} ${footerStyle.iconInstagram}`}>
            <IoLogoInstagram />
          </div>
          <div className={`${footerStyle.icon} ${footerStyle.iconTelegram}`}>
            <FaTelegram />
          </div>
          <div className={`${footerStyle.icon} ${footerStyle.iconTwitter}`}>
            <FaXTwitter />
          </div>
        </div>
      </main>
    </footer>
  );
};

export default Footer;
