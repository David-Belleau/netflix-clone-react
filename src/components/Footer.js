import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return <footer className="footer">{currentYear} - Netflix Clone</footer>
}

export {Footer}
