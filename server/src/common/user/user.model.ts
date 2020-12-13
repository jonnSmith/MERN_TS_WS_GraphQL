import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

/**
 * Here is the our user schema which will be used to
 * validate the data sent to our database.
 */
const userSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace', // this must match the name we assigned to the workspace model
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
});

/**
 * This property will ensure our virtuals (including "id")
 * are set on the user when we use it.
 */
userSchema.set('toObject', { getters: true, virtuals: true });

/**
 * Never save the password directly onto the model,
 * always encrypt first.
 */
userSchema.pre('save', function preSave(this: any, next: () => {}) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt
      .genSalt(5)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(next);
  }
});

/**
 * Adds a method on the user object which we can use
 * to compare a user's password with.
 */
userSchema.method('comparePassword', function comparePassword(
  this: any,
  candidate: string
) {
  if (!this.password) {
    throw new Error('User has not been configured with a password.');
  }
  if (!candidate) {
    throw new Error('Password is wrong');
  }
  return bcrypt.compare(candidate, this.password);
});

/**
 * Finally, we compile the schema into a model which we then
 * export to be used by our GraphQL resolvers.
 */
const userModel = mongoose.model('User', userSchema);
export default userModel;
type UserSchema = typeof userModel.schema;
export {UserSchema};
