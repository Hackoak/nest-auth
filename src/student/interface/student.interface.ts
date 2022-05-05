import {Document } from 'mongoose'
export interface Student extends Document{
readonly name:String,
readonly age:Number,
readonly city:String,
readonly initial:String,
}