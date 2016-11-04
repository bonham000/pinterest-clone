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
				id: uuid(),
				src: img,
				author: user
			});

			image.save( (err, image) => {
				if (err) throw err;
				console.log('Saved:', image);
			});

			res.status(201).send('Image added!')

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








