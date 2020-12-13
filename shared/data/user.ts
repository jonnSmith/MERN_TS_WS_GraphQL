import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
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

userSchema.set('toObject', { getters: true, virtuals: true });

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

const User = mongoose.model('User', userSchema);
export {User};
