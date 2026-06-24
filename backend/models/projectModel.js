import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  decisions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Decision'
  }]
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
