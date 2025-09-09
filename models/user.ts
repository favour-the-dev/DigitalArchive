import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Model } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  name?: string;
  role: "student" | "lecturer" | "admin";
  matricNumber?: string;
  dignitary?: string;
  isActive: boolean;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  updateLastLogin(): Promise<IUser>;
}

interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

const UserSchema = new mongoose.Schema<IUser, IUserModel>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters long'],
    maxlength: [100, 'Full name cannot exceed 100 characters'],
    match: [
      /^[a-zA-Z\s]+$/,
      'Full name can only contain letters and spaces'
    ]
  },
  name: {
    type: String,
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  role: {
    type: String,
    enum: ['student', 'lecturer', 'admin'],
    default: 'student',
    required: [true, 'Role is required']
  },
  matricNumber: {
    type: String,
    trim: true,
    sparse: true, // Only enforce uniqueness for non-null values
    required: function () {
      return this.role === "student"; // only required if role is student
    },
    match: [
      /^u\d{4}\/\d+$/, 
      "Matriculation number must be in the format u2019/5570108"
    ]
  },
  dignitary: {
    type: String,
    trim: true,
    default: "Prof.",
    required: function() {
      return this.role === "lecturer";
    },
    enum: ['Prof.', 'Dr.', 'Mr.', 'Ms.', 'Mrs.']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
})

// Hash password before saving
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next()
  
  try {
    // Hash password with cost of 12
    const saltRounds = 12
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Instance method to check password
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Instance method to update last login
UserSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date()
  return this.save()
}

// Static method to find user by email
UserSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() })
}

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User