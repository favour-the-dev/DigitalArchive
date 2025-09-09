import { NextRequest, NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongoose'
import User from '../../../../models/user'
import { signupSchema } from '../../../../schemas/schema'

export async function POST(request) {
  try {
    const body = await request.json()
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

    const { fullName, email, password, role, matricNumber, dignitary } = validationResult.data
    await connectDB()
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
    const userData = {
      email: email.toLowerCase().trim(),
      password,
      fullName: fullName.trim(),
      name: fullName.trim(),
      role: role,
    }

    if (role === "student" && matricNumber) {
      userData.matricNumber = matricNumber.trim()
    }

    if(role === "lecturer" && dignitary) {
      userData.dignitary = dignitary.trim()
    }

    const newUser = new User(userData)
    const savedUser = await newUser.save()

    const userResponse = {
      id: savedUser._id.toString(),
      email: savedUser.email,
      fullName: savedUser.fullName,
      name: savedUser.name,
      role: savedUser.role,
      isActive: savedUser.isActive,
      createdAt: savedUser.createdAt,
    }

    if (savedUser.matricNumber) {
      userResponse.matricNumber = savedUser.matricNumber
    }

    if(savedUser.role === "lecturer" && savedUser.dignitary) {
      userResponse.dignitary = savedUser.dignitary
    }

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: userResponse
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error.message, error.stack);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message)
      return NextResponse.json({ 
        success: false,
        message: 'Validation error', 
        errors 
      }, { status: 400 })
    }

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