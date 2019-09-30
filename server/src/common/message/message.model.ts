import * as mongoose from 'mongoose';

/**
 * Here is the our user schema which will be used to
 * validate the data sent to our database.
 */
const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // this must match the name we assigned to the workspace model
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

/**
 * This property will ensure our virtuals (including "id")
 * are set on the user when we use it.
 */
messageSchema.set('toObject', { getters: true, virtuals: true });


/**
 * Finally, we compile the schema into a model which we then
 * export to be used by our GraphQL resolvers.
 */
export default mongoose.model('Message', messageSchema);
