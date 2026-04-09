// const { constant } = require('lodash');
const UserModel = require('../models/user.model');
const { getInfoData, getInfoDataOmit } = require('../utils');

class UserController {

    getMe = async (req, res) => {
        try {
            console.log('[GET]::getMe::');
            const { userId } = req.user;

            if (!userId) {
                return res.status(200).json({
                    status: false,
                    message: 'No right'
                })
            }

            const user = await UserModel.findById(userId).lean();

            return res.status(200).json({
                status: !!user,
                user: user ? getInfoDataOmit({ fileds: ["password", "role", "status", "verificationToken", "refreshToken", "passwordChangedAt", "passwordResetToken", "passwordResetExpires"], object: user }) : null
            })
        } catch (error) {

        }
    }


    getUser = async (req, res) => {
        try {
            console.log('[GET]::getUser::');
            const { userId } = req.params;

            if (!userId) {
                return res.status(200).json({
                    status: false,
                })
            }

            const user = await UserModel.findById(userId).select('fullName').lean();
            if (!user) {
                return res.status(404).json({
                    status: false,
                });
            }
            
            return res.status(200).json({
                status: !!user,
                user: user ? getInfoDataOmit({ fileds: ["password", "role", "status", "verificationToken", "refreshToken", "passwordChangedAt", "passwordResetToken", "passwordResetExpires"], object: user }) : null
            
            });
        } catch (error) {

        }
    }

    getUsers = async (req, res) => {
        try {
            console.log('[GET]::getUsers::');

            const users = await UserModel.find().select('fullName').lean();
            if (!users) {
                return res.status(404).json({
                    status: false,
                });
            }
            
            return res.status(200).json({
                status: !!users,
                user: users,

            });
        } catch (error) {
        }
    }

    getPersonnels = async (req, res) => {
        try {
            console.log('[GET]::getPersonnels::');

            const personnels = await UserModel.find({role: {$in: ['moderator', 'assistant', 'broker']}}).select('fullName role').lean();
            if (!personnels) {
                return res.status(404).json({
                    status: false,
                });
            }
            
            return res.status(200).json({
                status: !!personnels,
                personnels: personnels,

            });
        } catch (error) {
        }
    }

    updateActive = async (req, res) => {
        try {
            console.log('[update]::userID::active::', req?.params?.userId, req?.body?.isActive);
            const { userId } = req?.params;
            const { isActive } = req?.body;
            const user = await UserModel.findByIdAndUpdate(userId, {isActive}, {new: true});

            if (!user) {
                return res.status(404).json({
                    status: false,
                });
            }
            
            return res.status(200).json({
                status: !!user,
                user: user ? getInfoDataOmit({ fileds: ["password", "role", "status", "verificationToken", "refreshToken", "passwordChangedAt", "passwordResetToken", "passwordResetExpires"], object: user }) : null
            
            });
        } catch (error) {

        }
    
    }


 
}

module.exports = new UserController();