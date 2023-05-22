const router = require("express").Router();
const { where } = require("sequelize");
const { Friend, User } = require("../../db/models");

router.get("/", async (req, res) => {
    try {
        const userFriends = await Friend.findAll({
            where: { user_id: req.session.user.user_id },
        });
        const users = await User.findAll({
            raw: "true"
        })
        const map = {}
        for (let i = 0; i < users.length; i++) {
            map[users[i].id] = users[i]
        }
        const arr = []
        for (let i = 0; i < userFriends.length; i++) {
            const user = map[userFriends[i].dataValues.friend_id];
            arr.push({
                id: user.id,
                name: user.user_name
            })
        }
        res.json(arr);
    } catch (error) {
        console.error("Failed to get friends:", error);
        res.status(400).json({ error: "Failed to get friends" });
    }
});

router.post("/", async (req, res) => {
    try {
        const userId = req.session.user.user_id
        const { name } = req.body;
        const friend = await User.findOne({
            where: { user_name: name },
        });

        if (!friend) {
            return res.status(404).json({ error: "Friend not found" });
        }
        const existingFriend = await Friend.findOne({
            where: { user_id: userId, friend_id: friend.dataValues.id },
        });

        if (existingFriend) {
            return res.status(400).json({ error: "Friend already exists" });
        }
        const newFriend = await Friend.create({
            user_id: userId,
            friend_id: friend.dataValues.id,
        });

        res.status(201).json(newFriend);
    } catch (error) {
        console.error("Failed to add friend:", error);
        res.status(400).json({ error: "Failed to add friend" });
    }
});

router.delete("/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const friend = await Friend.findOne({
            where: { user_id: req.session.user.user_id, friend_id: user_id },
        });

        if (!friend) {
            return res.status(404).json({ error: "Friend not found" });
        }

        await friend.destroy();

        res.json({ message: "Friend deleted" });
    } catch (error) {
        console.error("Failed to delete friend:", error);
        res.status(400).json({ error: "Failed to delete friend" });
    }
});

module.exports = router;
