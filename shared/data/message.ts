import * as mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

const Message = mongoose.model('Message', messageSchema);
export { Message };