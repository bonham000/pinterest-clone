'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
		id: String,
		src: String,
		author: String
});

module.exports = mongoose.model('Image', Image);