export const getJsonTemplate = () => {
  return {
    personalInfo: {
      fullName: "John Doe",
      jobTitle: "Software Engineer",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "San Francisco, CA",
      linkedinUrl: "https://linkedin.com/in/johndoe",
      githubUrl: "https://github.com/johndoe",
      portfolioUrl: "https://johndoe.dev",
      whatsapp: "+1 (555) 987-6543",
      dateOfBirth: "01/01/1990",
      nationality: "American",
      gender: "Male",
      summary: "Experienced software engineer with 5+ years..."
    },
    experience: [
      {
        company: "Tech Company Inc.",
        position: "Senior Software Engineer",
        startDate: "2021-01",
        endDate: "",
        current: true,
        description: "Led development of...",
            experienceProjects: [
          {
            name: "Project Name",
            projectDescription: "Brief description of what the project is",
            format: "bullets",
            description: "",
            bullets: ["Achievement 1", "Achievement 2"]
          }
        ]
      }
    ],
    education: [
      {
        institution: "University Name",
        degree: "Bachelor of Science in Computer Science",
        startDate: "2014-09",
        endDate: "2018-05",
        description: "Relevant coursework: Data Structures, Algorithms..."
      }
    ],
    skills: [
      {
        category: "Programming Languages",
        skills: ["JavaScript", "TypeScript", "Python"]
      },
      {
        category: "Frameworks",
        skills: ["React", "Node.js"]
      }
    ],
    projects: [
      {
        name: "Project Name",
        description: "Built a...",
        technologies: ["React", "TypeScript"],
        link: "https://github.com/...",
        highlights: ["Achieved 50% performance improvement", "Used by 1000+ users"],
        startDate: "2023-01",
        endDate: "2023-06"
      }
    ],
    languages: [
      {
        name: "English",
        level: "Native"
      },
      {
        name: "Spanish",
        level: "Intermediate"
      }
    ],
    interests: [
      { name: "Open Source" },
      { name: "Machine Learning" }
    ],
    certifications: [
      {
        name: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023-01",
        url: "https://..."
      }
    ]
  };
};

export const validateResumeJson = (json: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!json) {
    errors.push("Empty JSON");
    return { valid: false, errors };
  }
  
  if (json.personalInfo) {
    if (typeof json.personalInfo.fullName !== 'string') errors.push("personalInfo.fullName must be a string");
    if (typeof json.personalInfo.email !== 'string') errors.push("personalInfo.email must be a string");
    if (typeof json.personalInfo.jobTitle !== 'string') errors.push("personalInfo.jobTitle must be a string");
  } else {
    errors.push("Missing personalInfo object");
  }
  
  if (!Array.isArray(json.experience)) errors.push("experience must be an array");
  if (!Array.isArray(json.education)) errors.push("education must be an array");
  if (!Array.isArray(json.skills)) errors.push("skills must be an array");
  
  return { valid: errors.length === 0, errors };
};

export const parseJsonResume = (jsonString: string) => {
  let json: any;
  
  try {
    json = JSON.parse(jsonString);
  } catch {
    throw new Error("Invalid JSON format");
  }
  
  const validation = validateResumeJson(json);
  if (!validation.valid) {
    throw new Error(`Invalid resume JSON: ${validation.errors.join(', ')}`);
  }
  
  const now = Date.now();
  
  return {
    personalInfo: {
      fullName: json.personalInfo?.fullName || '',
      jobTitle: json.personalInfo?.jobTitle || '',
      email: json.personalInfo?.email || '',
      phone: json.personalInfo?.phone || '',
      address: json.personalInfo?.address || '',
      linkedinUrl: json.personalInfo?.linkedinUrl || '',
      githubUrl: json.personalInfo?.githubUrl || '',
      portfolioUrl: json.personalInfo?.portfolioUrl || '',
      whatsapp: json.personalInfo?.whatsapp || '',
      dateOfBirth: json.personalInfo?.dateOfBirth || '',
      nationality: json.personalInfo?.nationality || '',
      gender: json.personalInfo?.gender || '',
      summary: json.personalInfo?.summary || '',
    },
    experience: (json.experience || []).map((exp: any, idx: number) => ({
      id: `exp-${now}-${idx}`,
      company: exp.company || '',
      position: exp.position || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      current: exp.current || false,
      description: exp.description || '',
      experienceProjects: (exp.experienceProjects || []).map((proj: any, pidx: number) => ({
        id: `proj-${now}-${idx}-${pidx}`,
        name: proj.name || '',
        projectDescription: proj.projectDescription || '',
        format: proj.format || 'bullets',
        description: proj.description || '',
        bullets: proj.bullets || []
      }))
    })),
    education: (json.education || []).map((edu: any, idx: number) => ({
      id: `edu-${now}-${idx}`,
      institution: edu.institution || '',
      degree: edu.degree || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      description: edu.description || ''
    })),
    skills: (json.skills || []).map((skill: any, idx: number) => ({
      id: `skill-${now}-${idx}`,
      category: skill.category || 'Skills',
      skills: skill.skills || []
    })),
    projects: (json.projects || []).map((proj: any, idx: number) => ({
      id: `proj-${now}-${idx}`,
      name: proj.name || '',
      description: proj.description || '',
      technologies: proj.technologies || [],
      link: proj.link || '',
      highlights: proj.highlights || [],
      startDate: proj.startDate || '',
      endDate: proj.endDate || ''
    })),
    languages: (json.languages || []).map((lang: any, idx: number) => ({
      id: `lang-${now}-${idx}`,
      name: lang.name || '',
      level: lang.level || ''
    })),
    interests: (json.interests || []).map((interest: any, idx: number) => ({
      id: `interest-${now}-${idx}`,
      name: interest.name || ''
    })),
    certifications: (json.certifications || []).map((cert: any, idx: number) => ({
      id: `cert-${now}-${idx}`,
      name: cert.name || '',
      issuer: cert.issuer || '',
      date: cert.date || '',
      url: cert.url || ''
    }))
  };
};
