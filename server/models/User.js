import e from 'express';
import express from 'express';
import mongoose from 'mongoose';
import { time } from 'three/tsl';

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,       
        },
        imageUrl: { 
            type: String,
            required: true,
        },
        enrolledCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
            }
        ],
    }, {timestamps: true}); 

const User = mongoose.model('User', userSchema);

export default User;