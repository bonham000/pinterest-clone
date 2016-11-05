'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
		id: String,
		src: String,
		thumbnail: String,
		author: String,
		width: Number,
		height: Number,
		thumbnailWidth: Number, 
		thumbnailHeight: Number
});

module.exports = mongoose.model('Image', Image);