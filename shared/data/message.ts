import * as mongoose from 'mongoose';
import mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    workspaceId: {
      type: String,
      required: false,
      unique: false,
    },
    text: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);
messageSchema.set('toObject', { getters: true, virtuals: true });
messageSchema.plugin(mongooseLeanVirtuals);

const Message = mongoose.model('Message', messageSchema);
export { Message };