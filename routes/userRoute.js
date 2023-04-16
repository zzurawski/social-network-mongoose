const router = require('express').Router()

const {
        getUsers,
        getUserById,
        makeUser,
        deleteUser,
        updateUser,
        addFriend,
        removeFriend,
        } = require('../controller/user');

router.route('/')
    .get(getUsers)
    .post(makeUser);

router.route('/:userId')
    .get(getUserById)
    .delete(deleteUser)
    .post(updateUser)

router.route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;