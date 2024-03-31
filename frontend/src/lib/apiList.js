export const server = "http://localhost:8080";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  uploadVerificationDocument: `${server}/upload/verification`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  adminLogin: `${server}/auth/admin/login`,
  adminSignup: `${server}/auth/admin/signup`,
  verify: `${server}/api/verify`,
  getRecruiter: `${server}/api/getRecruiters`,
  status: `${server}/api/recruiter/status`,

  //new route added -------------------------------------------------change--------------------------------------
  getVerificationDocument: (userId) => `${server}/api/verification/${userId}`,

  // new route for resume
  resume: `${server}/api/resume`,
  resumePdf: (resumeId) => `${server}/api/resume/${resumeId}/pdf`,
};

export default apiList;
