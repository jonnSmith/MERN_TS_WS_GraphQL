import * as mongoose from 'mongoose';

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

const Workspace = mongoose.model('Workspace', workspaceSchema);
export {Workspace};
