import chaffImage from '../assets/Chaff.jpeg';
import contactTracingImage from '../assets/Contact-Tracing.jpg';
import hawkImage from '../assets/HAWK.jpg';
import orbiusAIImage from '../assets/Orbius-AI.jpg';
import aiArticleProcessorImage from '../assets/AI-Article-Processor.png';

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
      link: 'https://github.com/saiharish587/Chaff.git',
      image: chaffImage,
      color: '#10B981'
    },
    {
      id: 2,
      icon: 'Activity',
      title: 'Contact Tracing',
      desc: 'Health tracking and contact tracing application designed to monitor and manage disease spread. Real-time location tracking, notification system, and health status updates.',
      category: 'Health & Tracking',
      stack: ['React', 'Firebase', 'Maps API', 'JavaScript'],
      link: 'https://github.com/saiharish587/contact-tracing.git',
      image: contactTracingImage,
      color: '#EF4444'
    },
    {
      id: 3,
      icon: 'Eye',
      title: 'HAWK - Surveillance System',
      desc: 'Advanced surveillance and monitoring system with real-time alerting capabilities. Features video stream processing, anomaly detection, and comprehensive logging.',
      category: 'Security & Monitoring',
      stack: ['React', 'Python', 'OpenCV', 'WebSocket'],
      link: 'https://github.com/saiharish587/HAWK.git',
      image: hawkImage,
      color: '#1F2937'
    },
    {
      id: 4,
      icon: 'Zap',
      title: 'Orbius AI',
      desc: 'AI-powered intelligent assistant leveraging machine learning models for natural language processing and contextual understanding. Provides personalized recommendations and smart automation.',
      category: 'AI/ML Platform',
      stack: ['React', 'Python', 'TensorFlow', 'NLP'],
      link: 'https://github.com/saiharish587/Orbius-AI.git',
      image: orbiusAIImage,
      color: '#6366F1'
    },
    {
      id: 5,
      tag: 'FEATURED',
      icon: 'Sparkles',
      title: 'AI-Article-Processor',
      desc: 'Intelligent article processing system powered by AI. Automatically extracts, summarizes, and categorizes content from multiple sources with advanced NLP and machine learning algorithms.',
      category: 'AI/NLP Platform',
      stack: ['Python', 'NLP', 'Machine Learning', 'Web Scraping'],
      link: 'https://github.com/saiharish587/AI-Article-Processor.git',
      image: aiArticleProcessorImage,
      color: '#8B5CF6'
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
    period: 'Jul 2025 - Nov 2025',
    bullets: [
      'Built responsive React components following modern design patterns and best practices',
      'Developed RESTful APIs using Node.js and Express with proper error handling',
      'Implemented real-time features with Socket.io for live collaboration',
      'Collaborated with design team to translate wireframes into functional, pixel-perfect UI'
    ]
  },
  education: [
    {
      school: 'M B Grammar High School',
      degree: '10th Grade',
      details: 'Hyderabad, Telangana, India • Graduated 2021'
    },
    {
      school: 'Sri Chaitanya Jr Kalashala',
      degree: 'Intermediate',
      details: 'IDPL, Telangana, India • Graduated 2027'
    },
    {
      school: 'B V Raju Institute of Technology',
      degree: 'B.Tech in Data Science',
      details: 'Narsapur, Telangana, India • Expected Apr 2027'
    },
    {
      title: 'Certifications',
      certs: []
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
  ,
  certificates: [
    {
      id: 1,
      title: 'Internship Completion Certificate',
      issuer: 'STUD Entertainments',
      link: 'https://www.linkedin.com/posts/saiharishpuchala_internship-completion-letter-activity-7466324931472097280-48UE'
    },
    {
      id: 2,
      title: 'Microsoft Applied Skills: Accelerate AI-assisted Development by using GitHub Copilot',
      issuer: 'Microsoft',
      link: 'https://www.linkedin.com/posts/saiharishpuchala_github-copilot-activity-7461680995415801856-VxkS'
    },
    {
      id: 3,
      title: 'AWS Academy Certificate',
      issuer: 'AWS Academy',
      link: 'https://www.linkedin.com/posts/saiharishpuchala_aws-cloud-certificate-activity-7457749536405377024-1IoV'
    },
    {
      id: 4,
      title: 'Front-end Dev with JavaScript',
      issuer: 'TASK',
      link: 'https://www.linkedin.com/posts/saiharishpuchala_frontenddevelopment-javascript-webdevelopment-activity-7453836102500659200-5oRg'
    },
    {
      id: 5,
      title: 'Data Engineer Certificate',
      issuer: 'AICTE',
      link: 'https://www.linkedin.com/posts/saiharishpuchala_data-engineer-certificate-by-aicte-activity-7419738026299445249-bEeW'
    },
    {
      id: 6,
      title: 'Deloitte Data Analytics Certificate',
      issuer: 'Deloitte',
      link: 'https://www.linkedin.com/posts/saiharishpuchala_deloitte-data-analytics-job-certificate-activity-7354940656160559104-ypEq'
    }
  ]
};
