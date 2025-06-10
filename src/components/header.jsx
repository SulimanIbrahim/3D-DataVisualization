import React from "react";

const Header = () => (
  <header style={styles.header}>
    <h1 style={styles.title}>My Application</h1>
    <nav>
      <a href="/" style={styles.link}>Home</a>
      <a href="/about" style={styles.link}>About</a>
      <a href="/contact" style={styles.link}>Contact</a>
    </nav>
  </header>
);

const styles = {
  header: {
    backgroundColor: "#282c34",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    margin: "0 0 10px 0"
  },
  link: {
    margin: "0 10px",
    color: "white",
    textDecoration: "none"
  }
};

export default Header;