
const crypto = require('crypto')

const userModel = require('../models/user.model')
const { convertVNSlug2, randomInt } = require('../utils')
const { fakerVI } = require('@faker-js/faker');
const { random } = require('lodash');

class CreateController {

    usersRandom = async (req, res, next) => {
        try {
            for (let i = 0; i < 10; ++i) {
                const fullName = fakerVI.person.fullName();
                const userName = `user${i}`;;
                const email = convertVNSlug2(fullName).split(' ').join('') + i + '@gmail.com';
                const password = `@Fdsa1234.`;
                const verificationToken = crypto.randomBytes(32).toString('hex')

                const newUser = await userModel.create({ fullName, userName, email, password, verificationToken, status: 'active' })
                // Internal Server Error (500)
                if (!newUser) {
                    console.log({
                        status: false,
                        userIndex: i,
                        fullName,
                        userName,
                        email,
                        password
                    })
                }
            }

            // 201: CREATED
            return res.status(201).json({
                code: 201,
                status: true,
            })
        } catch (error) {
            next(error)
        }
    }

    one = async (req, res, next) => {
        try {
            console.log(`[P]::create one...::`, req.body)
            const { fullName, email, password, phone } = req.body

            // Check for missing inputs (400 Bad Request)
            if (!fullName || !email || !password || !phone) {
                return res.status(200).json({
                    code: 'xxx1',
                    status: false,
                    message: 'Missing input!'
                })
            }

            // Step 1: Check email exists (409 Conflict)
            const userEmail = await userModel.findOne({ email }).lean()
            const userPhone = await userModel.findOne({ phone }).lean()
            if (userEmail || userPhone) {
                return res.status(200).json({
                    code: 'xxx2',
                    status: false,
                    message: 'User already registered!'
                })
            }

            const verificationToken = crypto.randomBytes(32).toString('hex')
            const newUser = await userModel.create({ ...req.body, verificationToken, isActive: true })
            // Internal Server Error (500)
            if (!newUser) {
                console.log({
                    status: false,
                })
            }

            // 201: CREATED
            return res.status(201).json({
                code: 201,
                status: true,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }


}

module.exports = new CreateController()