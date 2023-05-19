const express = require("express");
const { Friend } = require("../../db/models");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { user_id, friend_id } = req.body;
        const friend = await Friend.create({ user_id, friend_id });
        res.status(201).json(friend);
    } catch (error) {
        res.status(400).json({ error: "Failed to create friend" });
    }
});

// Get all friends
router.get("/", async (req, res) => {
    try {
        const friends = await Friend.findAll();
        res.json(friends);
    } catch (error) {
        res.status(400).json({ error: "Failed to get friends" });
    }
});

// Get a specific friend by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const friend = await Friend.findByPk(id);
        if (friend) {
            res.json(friend);
        } else {
            res.status(404).json({ error: "Friend not found" });
        }
    } catch (error) {
        res.status(400).json({ error: "Failed to get friend" });
    }
});

// Update a friend
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, friend_id } = req.body;
        const friend = await Friend.findByPk(id);
        if (friend) {
            await friend.update({ user_id, friend_id });
            res.json(friend);
        } else {
            res.status(404).json({ error: "Friend not found" });
        }
    } catch (error) {
        res.status(400).json({ error: "Failed to update friend" });
    }
});

// Delete a friend
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const friend = await Friend.findByPk(id);
        if (friend) {
            await friend.destroy();
            res.json({ message: "Friend deleted" });
        } else {
            res.status(404).json({ error: "Friend not found" });
        }
    } catch (error) {
        res.status(400).json({ error: "Failed to delete friend" });
    }
});

module.exports = router;
