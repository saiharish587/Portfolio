import chaffImage from '../assets/Chaff.jpeg';

export const portfolioData = {
  hero: {
    name: 'Sai Harish',
    surname: 'Puchala',
    badge: 'Open to Internships & Full-time Roles',
    tagline: 'Full Stack Developer crafting responsive web applications with React, Python, and Firebase. Passionate about UI/UX design and clean code.',
    cta1: 'View My Work',
    cta2: 'Download Resume',
    email: 'saiharish0088@gmail.com'
  },
  projects: [
    {
      id: 1,
      tag: 'FEATURED',
      icon: 'ShoppingCart',
      title: 'Chaff',
      desc: 'E-commerce platform enabling farmers to directly sell agricultural residue (stubble) to manufacturers. Features secure authentication, inventory management, and transaction processing.',
      category: 'E-commerce Platform',
      stack: ['React', 'Firebase', 'Tailwind CSS', 'JavaScript'],
      link: 'https://github.com/saiharish587',
      image: chaffImage,
      color: '#10B981'
    },
    {
      id: 2,
      icon: 'Leaf',
      title: 'Urban Plant Guide',
      desc: 'Smart urban gardening platform connecting plant enthusiasts. Features plant identification, care guides, and community discussions with real-time updates.',
      category: 'Community Platform',
      stack: ['React', 'Firebase', 'JavaScript', 'Tailwind CSS'],
      link: 'https://github.com/saiharish587',
      image: null,
      color: '#06B6D4'
    },
    {
      id: 3,
      icon: 'ClipboardList',
      title: 'Student Dashboard',
      desc: 'Event registration and student management platform. Allows students to discover events, register for activities, and track participation history.',
      category: 'Dashboard & CMS',
      stack: ['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
      link: 'https://github.com/saiharish587',
      image: null,
      color: '#8B5CF6'
    },
    {
      id: 4,
      icon: 'Building2',
      title: 'Banking System',
      desc: 'Desktop banking application with user authentication, account management, and transaction processing. Built with Java Swing for the UI and MySQL for data persistence.',
      category: 'Desktop Application',
      stack: ['Java Swing', 'MySQL', 'JDBC', 'OOP'],
      link: 'https://github.com/saiharish587',
      image: null,
      color: '#F59E0B'
    },
    {
      id: 5,
      icon: 'Cube',
      title: '3D Interactive Portfolio',
      desc: 'Experiential portfolio with interactive 3D elements and smooth animations. Showcases skills through engaging UI/UX design and frontend creativity.',
      category: '3D Web Design',
      stack: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
      link: 'https://github.com/saiharish587',
      image: null,
      color: '#EC4899'
    },
    {
      id: 6,
      icon: 'BookOpen',
      title: 'Community Stories',
      desc: 'Anonymous story-sharing platform where users can share experiences and read stories from the community. Features voting, commenting, and content moderation.',
      category: 'Social Platform',
      stack: ['React', 'Firebase', 'Tailwind CSS', 'JavaScript'],
      link: 'https://github.com/saiharish587',
      image: null,
      color: '#06B6D4'
    }
  ],
  skills: [
    {
      category: 'Frontend Development',
      items: ['React.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Tailwind CSS']
    },
    {
      category: 'Backend & Database',
      items: ['Python', 'Firebase', 'JavaScript', 'MySQL', 'Java']
    },
    {
      category: 'Design & Tools',
      items: ['UI/UX Design', 'Responsive Design', 'Git', 'REST APIs', 'Cloud Computing']
    }
  ],
  experience: {
    company: 'STUD Entertainments',
    role: 'Full Stack Developer Intern',
    period: 'Jun 2024 - Aug 2024',
    bullets: [
      'Built responsive React components following modern design patterns and best practices',
      'Developed RESTful APIs using Node.js and Express with proper error handling',
      'Implemented real-time features with Socket.io for live collaboration',
      'Collaborated with design team to translate wireframes into functional, pixel-perfect UI'
    ]
  },
  education: [
    {
      school: 'B V Raju Institute of Technology',
      degree: 'B.Tech in Data Science',
      details: 'Hyderabad, India • 2022-2027'
    },
    {
      title: 'Focus Areas',
      certs: [
        'Full-stack Web Development',
        'Database Design & Cloud Services'
      ]
    }
  ],
  achievements: [
    { medal: 'Trophy', title: '1st Prize', sub: 'Bugzilla - Technical Debugging Competition' },
    { medal: 'Star', title: 'Gold Medalist', sub: 'State & District-Level Kabaddi Championships' },
    { medal: 'Award', title: 'Bronze Medalist', sub: 'National-Level Kabaddi Tournament' }
  ],
  about: {
    text: `I'm a B.Tech Data Science student passionate about building web experiences that work beautifully and feel intuitive. I enjoy combining clean code with thoughtful UI/UX design to create products that users actually want to use. When I'm not coding, you'll find me gaming, designing interfaces, or exploring new technologies.`,
    facts: [
      { icon: 'Code2', label: 'Focus', value: 'React, Python, Firebase' },
      { icon: 'Cpu', label: 'Interests', value: 'UI/UX, Coding, Gaming' },
      { icon: 'Globe', label: 'Location', value: 'Hyderabad, India' }
    ]
  },
  contact: {
    title: 'Let\'s collaborate and build something great.',
    subtitle: 'I\'m open to internships, freelance projects, and learning opportunities. Feel free to reach out!',
    email: 'saiharish0088@gmail.com',
    socials: [
      { name: 'GitHub', url: 'https://github.com/saiharish587' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/saiharishpuchala/' },
      { name: 'Email', url: 'mailto:saiharish0088@gmail.com' }
    ]
  }
};
