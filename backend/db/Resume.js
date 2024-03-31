const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  summary: String,
  email: String,
  location: String,
  contactNumber: String,
  education: [
    {
      institutionName: {
        type: String,
        required: true,
      },
      degree: String,
      startYear: Number,
      endYear: Number,
    },
  ],
  projects: [
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      link: String,
    },
  ],
  skills: [String],
});


module.exports = mongoose.model("Resume", resumeSchema);
