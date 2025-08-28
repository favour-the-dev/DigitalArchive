import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongoose'
import User from '../../../../models/user'
import { signupSchema } from '../../../../schemas/schema'

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate request data
    const validationResult = signupSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { fullName, email, password, role, matricNumber } = validationResult.data

    // Connect to database
    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false,
          message: 'User already exists with this email' 
        },
        { status: 409 }
      )
    }

    // Check if matriculation number already exists (for students)
    if (role === "student" && matricNumber) {
      const existingMatricNumber = await User.findOne({ matricNumber })
      if (existingMatricNumber) {
        return NextResponse.json(
          {
            success: false,
            message: "This matriculation number is already registered",
          },
          { status: 409 }
        )
      }
    }

    // Create new user (password will be hashed automatically by pre-save hook)
    const userData = {
      email: email.toLowerCase().trim(),
      password,
      fullName: fullName.trim(),
      name: fullName.trim(), // Also set name field for backward compatibility
      role: role,
    }

    // Add matriculation number for students
    if (role === "student" && matricNumber) {
      userData.matricNumber = matricNumber.trim()
    }

    const newUser = new User(userData)
    const savedUser = await newUser.save()

    // Return success response (without password)
    const userResponse = {
      id: savedUser._id.toString(),
      email: savedUser.email,
      fullName: savedUser.fullName,
      name: savedUser.name,
      role: savedUser.role,
      isActive: savedUser.isActive,
      createdAt: savedUser.createdAt,
    }

    // Include matriculation number in response for students
    if (savedUser.matricNumber) {
      userResponse.matricNumber = savedUser.matricNumber
    }

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: userResponse
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error.message, error.stack);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message)
      return NextResponse.json({ 
        success: false,
        message: 'Validation error', 
        errors 
      }, { status: 400 })
    }

    // Handle duplicate key error (shouldn't happen due to our check, but just in case)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      const message = field === 'matricNumber' 
        ? 'This matriculation number is already registered'
        : 'User already exists with this email'
      
      return NextResponse.json(
        { 
          success: false,
          message 
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}