export const exportResumeToJson = (resumeData: any) => {
  return {
    personalInfo: {
      fullName: resumeData.personalInfo?.fullName || '',
      jobTitle: resumeData.personalInfo?.jobTitle || '',
      email: resumeData.personalInfo?.email || '',
      phone: resumeData.personalInfo?.phone || '',
      address: resumeData.personalInfo?.address || '',
      linkedinUrl: resumeData.personalInfo?.linkedinUrl || '',
      githubUrl: resumeData.personalInfo?.githubUrl || '',
      portfolioUrl: resumeData.personalInfo?.portfolioUrl || '',
      whatsapp: resumeData.personalInfo?.whatsapp || '',
      dateOfBirth: resumeData.personalInfo?.dateOfBirth || '',
      nationality: resumeData.personalInfo?.nationality || '',
      gender: resumeData.personalInfo?.gender || '',
      summary: resumeData.personalInfo?.summary || '',
    },
    experience: (resumeData.experience || []).map((exp: any) => ({
      company: exp.company || '',
      position: exp.position || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      current: exp.current || false,
      description: exp.description || '',
      experienceProjects: (exp.experienceProjects || []).map((proj: any) => ({
        name: proj.name || '',
        projectDescription: proj.projectDescription || '',
        format: proj.format || 'bullets',
        description: proj.description || '',
        bullets: proj.bullets || []
      }))
    })),
    education: (resumeData.education || []).map((edu: any) => ({
      institution: edu.institution || '',
      degree: edu.degree || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      description: edu.description || ''
    })),
    skills: (resumeData.skills || []).map((skill: any) => ({
      category: skill.category || '',
      skills: skill.skills || []
    })),
    projects: (resumeData.projects || []).map((proj: any) => ({
      name: proj.name || '',
      description: proj.description || '',
      technologies: proj.technologies || [],
      link: proj.link || '',
      highlights: proj.highlights || [],
      startDate: proj.startDate || '',
      endDate: proj.endDate || ''
    })),
    languages: (resumeData.languages || []).map((lang: any) => ({
      name: lang.name || '',
      level: lang.level || ''
    })),
    interests: (resumeData.interests || []).map((interest: any) => ({
      name: interest.name || ''
    })),
    certifications: (resumeData.certifications || []).map((cert: any) => ({
      name: cert.name || '',
      issuer: cert.issuer || '',
      date: cert.date || '',
      url: cert.url || ''
    }))
  };
};
