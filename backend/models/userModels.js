import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Lead', 'Member'],
    default: 'Member',
    required: true,
  },
  assignedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
