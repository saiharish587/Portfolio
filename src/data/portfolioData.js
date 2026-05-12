import hawkImage from '../assets/HAWK.jpg';
import orbiusImage from '../assets/Orbius-AI.jpg';
import contactTracingImage from '../assets/Contact-Tracing.jpg';
import chaffImage from '../assets/Chaff.jpeg';

export const portfolioData = {
  hero: {
    name: 'Sai Harish',
    surname: 'Puchala',
    badge: 'Available for opportunities',
    tagline: 'Building immersive web experiences blending AI, modern design, and scalable frontend systems.',
    cta1: 'Explore Work',
    cta2: 'Download Resume',
    email: 'saiharish0088@gmail.com'
  },
  projects: [
    {
      id: 1,
      tag: 'FEATURED',
      icon: 'Monitor',
      title: 'HAWK',
      desc: 'Modern web application for real-time monitoring and analytics.',
      category: 'Real-time Monitoring',
      stack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      link: 'https://github.com/saiharish587',
      image: hawkImage,
      color: '#4F46E5'
    },
    {
      id: 2,
      icon: 'Bot',
      title: 'OrbiusAI',
      desc: 'AI-powered content generation platform with advanced NLP.',
      category: 'AI & Machine Learning',
      stack: ['Python', 'FastAPI', 'React', 'TensorFlow'],
      link: 'https://github.com/saiharish587',
      image: orbiusImage,
      color: '#06B6D4'
    },
    {
      id: 3,
      icon: 'LineChart',
      title: 'COVID Tracing',
      desc: 'Pandemic data visualization and tracking dashboard.',
      category: 'Data Visualization',
      stack: ['Vue.js', 'D3.js', 'Flask', 'PostgreSQL'],
      link: 'https://github.com/saiharish587',
      image: contactTracingImage,
      color: '#EF4444'
    },
    {
      id: 4,
      icon: 'AudioWaveform',
      title: 'Chaff',
      desc: 'Audio processing and noise reduction application.',
      category: 'Audio Processing',
      stack: ['JavaScript', 'Web Audio API', 'Python'],
      link: 'https://github.com/saiharish587',
      image: chaffImage,
      color: '#10B981'
    }
  ],
  skills: [
    {
      category: 'Frontend & Creative',
      items: ['React', 'Three.js', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'Next.js']
    },
    {
      category: 'Backend & AI',
      items: ['Python', 'Node.js', 'FastAPI', 'TensorFlow', 'PostgreSQL', 'Firebase']
    },
    {
      category: 'Architecture & Tools',
      items: ['System Design', 'Docker', 'AWS', 'Git', 'Vercel', 'UI/UX Design']
    }
  ],
  experience: {
    company: 'STUD Entertainments',
    role: 'Full Stack Developer Intern',
    period: 'Jun 2024 - Aug 2024',
    bullets: [
      'Engineered responsive web interfaces using React and modern design systems',
      'Architected scalable RESTful APIs leveraging Node.js and Express',
      'Integrated real-time bidirectional communication using Socket.io',
      'Collaborated closely with designers to refine user experience and micro-interactions'
    ]
  },
  education: [
    {
      school: 'B V Raju Institute of Technology',
      degree: 'BTech in Computer Science',
      details: 'Hyderabad, India • 2022-2026'
    },
    {
      title: 'Certifications',
      certs: [
        'Frontend Developer Internship - Meta',
        'AWS Cloud Practitioner Certification'
      ]
    }
  ],
  achievements: [
    { medal: 'Trophy', title: '1st Place', sub: 'Hackathon Winner' },
    { medal: 'Star', title: 'Top Performer', sub: '50+ Projects Completed' },
    { medal: 'Award', title: 'Open Source', sub: '5K+ GitHub Stars' }
  ],
  about: {
    text: `I build immersive web experiences blending AI, design, and scalable frontend systems. My focus lies at the intersection of cinematic UI/UX and intelligent architectures, crafting products that don't just function flawlessly but feel like a premium experience. I am passionate about 3D web design, modern animations, and creating digital environments that leave a lasting impact.`,
    facts: [
      { icon: 'Code2', label: 'Stack', value: 'React, Node, Python' },
      { icon: 'Cpu', label: 'Focus', value: 'Frontend & AI Systems' },
      { icon: 'Globe', label: 'Location', value: 'Hyderabad, India' }
    ]
  },
  contact: {
    title: 'Let\'s create something extraordinary.',
    subtitle: 'Ready to bring your vision to life? I\'m currently open to new opportunities and exciting collaborations.',
    email: 'saiharish0088@gmail.com',
    socials: [
      { name: 'GitHub', url: 'https://github.com/saiharish587' },
      { name: 'LinkedIn', url: 'https://linkedin.com' },
      { name: 'Email', url: 'mailto:saiharish0088@gmail.com' }
    ]
  }
};
