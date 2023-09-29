let response = require('../libs/responseLibs');
let jwt = require('../libs/tokenLib')
const user = require('../../database/selectUser');
const users = require('../../database/selectAllUsers');
const findUser = require('../../database/loginUser');
const changeDp = require('../../database/changeProfile');

const addUser = async (req, res) => {
    try {
        const save = await user.selectUser(req, res);
        if (save[1] === 1) {
            res.status(200).send(response.generate(false, 'Successfully created account', save));
        }
        else {
            res.status(201).send(response.generate(true, 'User Already Have an account', save));
        }
    } catch (error) {
        res.status(500).send(response.generate(true, error.message, null));
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await findUser.login(req, res);
        //console.log(user);

        if (user === false) {
            res.status(201).send(response.generate(true, 'Wrong Password', user));
        }
        else if (user.length > 0) {

            try {
                let userData = user[0];
                delete userData.password;
                let details = await jwt.generateToken(userData);
                res.status(200).send(response.generate(false, 'Login Successful', { details: details, id: userData.user_id, name: userData.name, email: userData.email, dp: userData.profile_image }));
            } catch (error) {
                console.log(error.message);
            }
        }

        else {
            res.status(202).send(response.generate(true, 'User not found', user));
        }
    } catch (error) {
        res.status(400).send(response.generate(true, 'Error', error.message));
    }
}

const getUsers = async (req, res) => {
    try {
        const allUsers = await users.selectAllUsers(req, res);
        if (allUsers.length > 0) {
            allUsers.forEach(user => {
                delete user.password;
            });
            res.status(200).send(response.generate(false, 'Users found', allUsers));
        } else {
            res.status(201).send(response.generate(false, 'Table is Empty', allUsers));
        }

    } catch (error) {
        console.log("Error from API ", error.message);
    }
}


const changeProfile = async (req, res) => {
    try {
        if (req.file) {
            const profile = await changeDp.changeProfile(req, res);
            console.log(profile);
            if (profile.length > 0) {
                res.status(200).send(response.generate(false, 'Picture Updated', profile));
            } else {
                res.status(202).send(response.generate(true, 'Picture Upload failed', null));
            }
        } else{
            res.status(400).send(response.generate(true, 'Invalid Image', null));
        }

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    addUser: addUser,
    loginUser: loginUser,
    getUsers: getUsers,
    changeProfile: changeProfile
}