import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding DMX Tech Services database...\n');

  // ─── Admin User ───────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12);
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@dmxtechservices.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@dmxtechservices.com',
      password: hashedPassword,
      name: 'DMX Admin',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created');

  // ─── Services ─────────────────────────────────────────────────
  const services = [
    {
      title: 'Mobile Application Development',
      slug: 'mobile-app-development',
      description: 'Build powerful, scalable mobile applications for iOS, Android, and cross-platform solutions that engage users and drive business growth.',
      icon: 'Smartphone',
      features: [
        'Native and cross-platform mobile apps',
        'User-centric UI/UX design',
        'Backend integration and API development',
        'App store deployment and maintenance',
        'Real-time push notifications',
        'Offline-first architecture',
      ],
      techStack: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)', 'Firebase', 'REST APIs'],
      order: 1,
    },
    {
      title: 'Web Application Development',
      slug: 'web-application-development',
      description: 'Create modern, responsive web applications with cutting-edge technologies that deliver exceptional user experiences and business value.',
      icon: 'Globe',
      features: [
        'Full-stack web application development',
        'Progressive Web Apps (PWA)',
        'E-commerce and enterprise solutions',
        'Performance optimization and SEO',
        'Cloud-native architecture',
        'CI/CD pipeline setup',
      ],
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
      order: 2,
    },
    {
      title: 'AI Tools & Services',
      slug: 'ai-tools-services',
      description: 'Leverage the power of artificial intelligence to automate processes, gain insights, and create innovative solutions tailored to your business needs.',
      icon: 'Brain',
      features: [
        'Custom AI model development and training',
        'Natural Language Processing (NLP) solutions',
        'Computer vision and image recognition',
        'AI-powered chatbots and automation',
        'Predictive analytics dashboards',
        'LLM integration and fine-tuning',
      ],
      techStack: ['Python', 'OpenAI', 'LangChain', 'TensorFlow', 'PyTorch', 'Hugging Face'],
      order: 3,
    },
    {
      title: 'Cybersecurity',
      slug: 'cybersecurity',
      description: 'Protect your digital assets with comprehensive security audits, penetration testing, and ongoing security consulting to safeguard your business.',
      icon: 'Shield',
      features: [
        'Security audits and vulnerability assessments',
        'Penetration testing and ethical hacking',
        'Security architecture and consulting',
        'Compliance and risk management',
        'Incident response planning',
        'Security awareness training',
      ],
      techStack: ['Kali Linux', 'Metasploit', 'OWASP', 'SIEM Tools', 'Burp Suite', 'Wireshark'],
      order: 4,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log('✅ Services seeded (4 services)');

  // ─── Courses ──────────────────────────────────────────────────
  const courses = [
    {
      title: 'Full-Stack AI & Cloud Engineering',
      slug: 'full-stack-ai-cloud-engineering',
      duration: '3 months',
      level: 'Advanced',
      description: 'Master full-stack development combined with AI integrations and cloud deployment on AWS. Build production-ready applications from day one.',
      curriculum: [
        { module: 'Frontend Development', topics: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'State Management'] },
        { module: 'Backend Development', topics: ['Node.js & Express', 'PostgreSQL & Prisma', 'REST & GraphQL APIs', 'Authentication'] },
        { module: 'AI Integration', topics: ['OpenAI API', 'LangChain', 'Vector Databases', 'AI-powered features'] },
        { module: 'Cloud & DevOps', topics: ['AWS EC2 & S3', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Monitoring'] },
      ],
      price: 24999,
      instructor: 'DMX Expert Team',
      featured: true,
      order: 1,
    },
    {
      title: 'AI/ML Training',
      slug: 'ai-ml-training',
      duration: '2 months',
      level: 'Intermediate',
      description: 'Comprehensive training in Machine Learning and Deep Learning. From fundamentals to building real-world AI models.',
      curriculum: [
        { module: 'Python for ML', topics: ['NumPy & Pandas', 'Data Visualization', 'Statistical Analysis'] },
        { module: 'Machine Learning', topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'] },
        { module: 'Deep Learning', topics: ['Neural Networks', 'CNNs & RNNs', 'TensorFlow & PyTorch'] },
        { module: 'LLMs & GenAI', topics: ['Transformers', 'Fine-tuning LLMs', 'RAG Systems', 'Prompt Engineering'] },
      ],
      price: 19999,
      instructor: 'DMX AI Team',
      featured: true,
      order: 2,
    },
    {
      title: 'DevOps & AWS Cloud Engineering',
      slug: 'devops-aws-cloud-engineering',
      duration: '3 months',
      level: 'Intermediate',
      description: 'Become a DevOps engineer. Master CI/CD, containerization, and AWS cloud services to deploy and manage scalable infrastructure.',
      curriculum: [
        { module: 'Linux & Bash', topics: ['Shell Scripting', 'System Administration', 'Networking Basics'] },
        { module: 'Docker & Kubernetes', topics: ['Containerization', 'Orchestration', 'Helm Charts'] },
        { module: 'AWS Core Services', topics: ['EC2, S3, RDS', 'Lambda & API Gateway', 'VPC & Security Groups'] },
        { module: 'CI/CD & IaC', topics: ['GitHub Actions', 'Jenkins', 'Terraform', 'Monitoring with Grafana'] },
      ],
      price: 22999,
      instructor: 'DMX Cloud Team',
      featured: true,
      order: 3,
    },
    {
      title: 'Cybersecurity & Ethical Hacking',
      slug: 'cybersecurity-ethical-hacking',
      duration: '2 months',
      level: 'Intermediate',
      description: 'Learn offensive and defensive cybersecurity. Master penetration testing, ethical hacking, and how to secure systems against real-world threats.',
      curriculum: [
        { module: 'Security Fundamentals', topics: ['Networking Protocols', 'Cryptography', 'OWASP Top 10'] },
        { module: 'Penetration Testing', topics: ['Reconnaissance', 'Exploitation with Metasploit', 'Post-exploitation'] },
        { module: 'Web App Security', topics: ['SQL Injection', 'XSS & CSRF', 'Burp Suite'] },
        { module: 'Defensive Security', topics: ['SIEM Tools', 'Incident Response', 'Security Hardening'] },
      ],
      price: 18999,
      instructor: 'DMX Security Team',
      featured: false,
      order: 4,
    },
    {
      title: 'Microsoft Azure Cloud & Security',
      slug: 'microsoft-azure-cloud-security',
      duration: '2 months',
      level: 'Intermediate',
      description: 'Get Azure certified. Learn Azure services, identity management, and cloud security best practices for enterprise environments.',
      curriculum: [
        { module: 'Azure Fundamentals', topics: ['Azure Portal', 'Virtual Machines', 'Storage Accounts', 'Azure AD'] },
        { module: 'Azure Services', topics: ['App Service', 'Azure Functions', 'Cosmos DB', 'Azure SQL'] },
        { module: 'Security & Compliance', topics: ['Azure Security Center', 'Key Vault', 'RBAC', 'Compliance Tools'] },
        { module: 'Certification Prep', topics: ['AZ-900 Prep', 'AZ-104 Prep', 'Practice Exams'] },
      ],
      price: 17999,
      instructor: 'DMX Cloud Team',
      featured: false,
      order: 5,
    },
    {
      title: 'Linux & System Administration for Cloud',
      slug: 'linux-system-administration-cloud',
      duration: '1.5 months',
      level: 'Beginner',
      description: 'Build a solid foundation in Linux. Learn system administration, shell scripting, and prepare for cloud infrastructure management.',
      curriculum: [
        { module: 'Linux Basics', topics: ['File System', 'User Management', 'Permissions & ACLs'] },
        { module: 'Shell Scripting', topics: ['Bash Scripting', 'Automation Tasks', 'Cron Jobs'] },
        { module: 'Networking', topics: ['TCP/IP', 'DNS & DHCP', 'Firewall (iptables, ufw)'] },
        { module: 'Cloud Prep', topics: ['SSH & Key Management', 'Web Servers (Nginx/Apache)', 'Basic Security Hardening'] },
      ],
      price: 12999,
      instructor: 'DMX Linux Team',
      featured: false,
      order: 6,
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
  }
  console.log('✅ Courses seeded (6 courses)');

  // ─── Testimonials ─────────────────────────────────────────────
  const testimonials = [
    {
      quote: 'DMX Tech Services transformed our business with a custom mobile app that exceeded all expectations. The team is incredibly professional and delivered on time.',
      name: 'Rahul Sharma',
      company: 'TechStartup India',
      role: 'CEO & Founder',
      rating: 5,
      order: 1,
    },
    {
      quote: 'The AI integration DMX built for us automated 60% of our manual processes. ROI was visible within the first month. Highly recommended!',
      name: 'Priya Patel',
      company: 'DataDriven Pvt Ltd',
      role: 'CTO',
      rating: 5,
      order: 2,
    },
    {
      quote: 'I completed the Full-Stack AI & Cloud Engineering course and landed a ₹12 LPA job within 2 months. The curriculum is industry-relevant and the mentors are top-notch.',
      name: 'Amit Kumar',
      company: 'Amazon India',
      role: 'Software Engineer',
      rating: 5,
      order: 3,
    },
    {
      quote: 'The cybersecurity audit DMX conducted uncovered 3 critical vulnerabilities in our system. Their team fixed everything and now we are fully compliant.',
      name: 'Neha Gupta',
      company: 'FinSecure Solutions',
      role: 'CISO',
      rating: 5,
      order: 4,
    },
    {
      quote: 'World-class web development at competitive pricing. Our e-commerce platform went from concept to launch in 6 weeks with zero downtime.',
      name: 'Vikram Singh',
      company: 'ShopNow India',
      role: 'Product Manager',
      rating: 5,
      order: 5,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${testimonial.order}` },
      update: testimonial,
      create: { id: `testimonial-${testimonial.order}`, ...testimonial },
    });
  }
  console.log('✅ Testimonials seeded (5 testimonials)');

  // ─── Team Members ─────────────────────────────────────────────
  const teamMembers = [
    { name: 'Arjun Mehta', role: 'CEO & Founder', bio: 'Full-stack engineer with 10+ years experience building enterprise-grade products. Passionate about AI and cloud technologies.', order: 1 },
    { name: 'Kavya Reddy', role: 'CTO', bio: 'AI/ML specialist with expertise in LLMs, computer vision, and scalable cloud architectures. Previously at Google.', order: 2 },
    { name: 'Rohan Verma', role: 'Head of Cybersecurity', bio: 'Certified ethical hacker (CEH) and CISSP with 8+ years in enterprise security and compliance.', order: 3 },
    { name: 'Divya Shah', role: 'Lead Mobile Developer', bio: 'Expert in React Native and Flutter. Has shipped 30+ mobile apps to the App Store and Play Store.', order: 4 },
  ];

  for (const member of teamMembers) {
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }
  console.log('✅ Team members seeded (4 members)');

  // ─── Site Settings ────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      companyName: 'DMX Tech Services',
      email: 'info@dmxtechservices.com',
      phone: '+91 9876543210',
      address: 'Hyderabad, Telangana, India',
      linkedIn: 'https://linkedin.com/company/dmxtechservices',
      twitter: 'https://twitter.com/dmxtechservices',
      instagram: 'https://instagram.com/dmxtechservices',
    },
  });
  console.log('✅ Site settings seeded');

  console.log('\n🎉 Seeding complete! Database is ready.\n');
  console.log(`   Admin login: ${process.env.ADMIN_EMAIL || 'admin@dmxtechservices.com'}`);
  console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
