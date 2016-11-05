'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtConfig = require('../jwt-config');

var _jwtConfig2 = _interopRequireDefault(_jwtConfig);

var _uuidV = require('uuid-v4');

var _uuidV2 = _interopRequireDefault(_uuidV);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _image = require('../models/image');

var _image2 = _interopRequireDefault(_image);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

var app = module.exports = _express2.default.Router();

app.post('/api/add-image', function (req, res) {
	var _req$body = req.body,
	    img = _req$body.img,
	    user = _req$body.user,
	    token = _req$body.token;

	_jsonwebtoken2.default.verify(token, _jwtConfig2.default, function (err, decoded) {
		if (err) {
			res.status(401).send('Please login first!');
		} else {
			var image = new _image2.default({
				id: img.id,
				src: img.src,
				thumbnail: img.thumbnail,
				author: img.author,
				width: img.width,
				height: img.height,
				thumbnailWidth: img.thumbnailWidth,
				thumbnailHeight: img.thumbnailHeight
			});
			image.save(function (err, image) {
				if (err) throw err;
			});
			res.status(201).send('Image added!');
		}
	});
});

app.post('/remove-image', function (req, res) {
	var _req$body2 = req.body,
	    imageID = _req$body2.imageID,
	    token = _req$body2.token;

	_jsonwebtoken2.default.verify(token, _jwtConfig2.default, function (err, decode) {
		if (err) {
			res.status(401).send('You are not logged in!');
		} else {
			_image2.default.remove({ id: imageID }, function (err) {
				if (err) throw err;
			});
			res.status(201).send('Image removed!');
		}
	});
});

app.get('/retrieve-all-images', function (req, res) {
	_image2.default.find({}, function (err, images) {
		if (images) {
			res.status(201).send(images);
		} else if (err) {
			throw err;
		}
	});
});