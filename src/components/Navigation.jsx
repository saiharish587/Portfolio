import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section[id]');
      let current = 'hero';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' }
  ];

  return (
    <>
      <motion.nav
        className={`glass ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#hero" className="nav-logo">
          Sai<span>.</span>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
          Let's Talk
        </a>

        <button 
          className="mobile-menu-btn d-none" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu glass-card"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '90px',
              left: '5%',
              right: '5%',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              padding: '2rem'
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                style={{
                  color: activeSection === link.href.slice(1) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  fontWeight: 500
                }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="btn-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setIsOpen(false)}
              style={{ justifyContent: 'center', marginTop: '1rem' }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
