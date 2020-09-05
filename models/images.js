const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer = require('multer');
const config=require('../config/database');

const Image = new Schema({
  filename: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Image', Image)
module.exports.addImages=function(newItem,callback) {
    newItem.save(callback);
}