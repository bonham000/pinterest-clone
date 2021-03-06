import express from 'express'
import assert from 'assert'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import secret from '../jwt-config'
import uuid from 'uuid-v4'
import dotenv from 'dotenv'
dotenv.config({silent: true});

import Image from '../models/image'
import User from '../models/users'

const app = module.exports = express.Router();

app.post('/api/add-image', (req, res) => {
	const { img, user, token } = req.body;
	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			res.status(401).send('Please login first!');
		} else {
			let image = new Image({
				id: img.id,
				src: img.src,
				thumbnail: img.thumbnail,
				author: img.author,
				width: img.width,
				height: img.height,
				thumbnailWidth: img.thumbnailWidth,
				thumbnailHeight: img.thumbnailHeight
			});
			image.save( (err, image) => {
				if (err) throw err;
			});
			res.status(201).send('Image added!')
		}
	});
});

app.post('/remove-image', (req, res) => {
	const { imageID, token } = req.body;
	jwt.verify(token, secret, (err, decode) => {
		if (err) { res.status(401).send('You are not logged in!') }
		else { Image.remove({ id: imageID }, function (err) { 
			if (err) throw err; });
			res.status(201).send('Image removed!');
		}
	});
});

app.get('/retrieve-all-images', (req, res) => {
	Image.find({}, (err, images) => {
		if (images) {
			res.status(201).send(images);
		} else if (err) { throw err; }
	});
});

