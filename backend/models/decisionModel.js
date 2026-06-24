import mongoose from 'mongoose';

const decisionSchema = new mongoose.Schema({
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project', 
        required: true 
        },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
        required: true,
    },
    dependencies: [{
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Decision'
    }],
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'], // Example statuses
        default: 'Pending',
        required: true,
    }
}, {
  timestamps: true
});

decisionSchema.index({ projectId: 1 }); 
decisionSchema.index({ author: 1 });

const Decision = mongoose.model("Decision", decisionSchema);
export default Decision;
