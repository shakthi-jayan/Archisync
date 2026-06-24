import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'ASSIGN', 'STATUS_CHANGE']
  },
  entityType: {
    type: String,
    required: true,
    enum: ['User', 'Project', 'Decision']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  details: {
    field: { type: String },          
    oldValue: { type: mongoose.Schema.Types.Mixed }, 
    newValue: { type: mongoose.Schema.Types.Mixed },
    metadata: { type: Object }        
  }
}, { timestamps: true });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
