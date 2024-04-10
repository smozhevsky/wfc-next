import styles from "./Footer.module.scss";

export const Footer = () => (
  <footer className={styles.footer}>
    &#169; 2023 WFC. All rights reserved
    <div className={styles.rendered}>Rendered 18.10.2023</div>
  </footer>
);
