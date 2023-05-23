const router = require("express").Router();
const { Op } = require("sequelize");
const { Friend, User } = require("../../db/models");

router.get("/", async (req, res) => {
    try {
        const userFriendsRaw = await Friend.findAll({
            where: {
                [Op.or]: [{ user_id: req.session.user.id }, { friend_id: req.session.user.id }],
            },
            raw: true,
        });

        if (userFriendsRaw.length === 0) {
            return res.json([]);
        }

        const userFrends = userFriendsRaw.map((freind) => {
            if (freind.user_id === req.session.user.id) {
                return freind.friend_id
            } else {
                return freind.user_id
            }
        })
        const users = await User.findAll({
            raw: "true"
        })
        const map = {}
        for (let i = 0; i < users.length; i++) {
            map[users[i].id] = users[i]
        }
        const arr = []
        for (let i = 0; i < userFrends.length; i++) {
            const user = map[userFrends[i]];
            arr.push({
                id: user.id,
                name: user.user_name,
                avatar: user.user_avatar
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
        const userId = req.session.user.id
        const { name } = req.body;
        const friend = await User.findOne({
            where: { user_name: name },
        });

        if (!friend) {
            return res.status(404).json({ error: "Friend not found" });
        }
        const existingFriend = await Friend.findOne({
            [Op.or]: [{ user_id: userId, friend_id: friend.dataValues.id }, { user_id: friend.dataValues.id, friend_id: userId }],
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
            [Op.or]: [{ user_id: req.session.user.id, friend_id: user_id }, { user_id: user_id, friend_id: req.session.user.id }],
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
