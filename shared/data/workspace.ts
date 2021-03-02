import * as mongoose from 'mongoose';
import mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
});

workspaceSchema.set('toObject', { getters: true, virtuals: true });
workspaceSchema.plugin(mongooseLeanVirtuals);

const Workspace = mongoose.model('Workspace', workspaceSchema);
export {Workspace};
