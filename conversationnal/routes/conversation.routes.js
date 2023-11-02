const router = require("express").Router()
const Conversation = require("./../models/Conversation.model")

/**
 * ! All routes are prefixed by /api/conversation
 */

router.post("/", async (req, res, next) => {
	try {
		const myId = req.user._id
		const otherId = req.body.id
		const newConversation = await Conversation.create({
			participants: [myId, otherId],
		})
		res.status(201).json(newConversation)
	} catch (error) {
		next(error)
	}
})

router.get("/", async (req, res, next) => {
	try {
		const allConversationsOfUser = await Conversation.find({
			participants: { $in: [req.user._id] },
		}).populate("participants")
		res.json(allConversationsOfUser)
	} catch (error) {
		next(error)
	}
})

module.exports = router