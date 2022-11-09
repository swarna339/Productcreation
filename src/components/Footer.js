import React from "react";
import styles from "../styles/Footer.module.css";

function Footer() {
  // footer component with some socai media  links
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.socialContainer}>
        <a
          href="https://www.linkedin.com/in/sriram-a-78494b1aa/"
          target="_blank"
        >
          <i class="fa-brands fa-linkedin"></i>
        </a>

        <a
          href="https://github.com/sriramarumugham/e-commerce-react-json-server"
          target="_blank"
        >
          <i class="fa-brands fa-github"></i>
        </a>

        <a href="" target="_blank">
          <i class="fa-brands fa-youtube"></i>
        </a>

        <a href="https://www.instagram.com/sriram_arumugham/" target="_blank">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
