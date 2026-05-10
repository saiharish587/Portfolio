import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const updateActiveSection = () => {
      let current = 'hero';

      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.getAttribute('id');
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    })
  };

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' }
  ];

  return (
    <nav>
      <a href="#hero" className="nav-logo">
        SP<span>.</span>
      </a>

      {/* Desktop Menu */}
      <ul className="nav-links">
        {navLinks.map((link, i) => (
          <motion.li
            key={link.name}
            custom={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
          >
            <a href={link.href} className={activeSection === link.href.slice(1) ? 'active' : ''}>
              {link.name}
            </a>
          </motion.li>
        ))}
        <motion.li
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a href="#contact" className="nav-cta">
            Contact
          </a>
        </motion.li>
      </ul>

      {/* Mobile Menu Button */}
      <motion.div
        className="nav-toggle"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span style={{ transform: isOpen ? 'rotate(45deg) translateY(11px)' : 'rotate(0)' }} />
        <span style={{ opacity: isOpen ? 0 : 1 }} />
        <span style={{ transform: isOpen ? 'rotate(-45deg) translateY(-11px)' : 'rotate(0)' }} />
      </motion.div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.ul
          className="nav-links open"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link, i) => (
            <motion.li
              key={link.name}
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <a href={link.href} onClick={closeMenu}>
                {link.name}
              </a>
            </motion.li>
          ))}
          <motion.li
            custom={navLinks.length}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
          >
            <a href="#contact" className="nav-cta" onClick={closeMenu}>
              Contact
            </a>
          </motion.li>
        </motion.ul>
      )}
    </nav>
  );
};
