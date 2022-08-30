const express = require('express');
const mongoose = require('mongoose');

const menSchema = new mongoose.Schema({
  image:{
  
  },
  title:{
  
  },
  category:{
  
  },
  discretion:{
  
  },
  date:{
  
  },
  time:{
  
  },
  keys:{
  
  }
})

const video = new mongoose.model("video" ,menSchema );

module.exports = video;