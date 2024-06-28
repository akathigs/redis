import express from "express"
import * as feedController from "../controllers/feedControllers.js"

const router = express.Router()

router.get("/", feedController.getAllFeeds)
router.post("/",feedController.createFeed)
router.get("/:owner", feedController.getFeedByOwner)
router.put("/:id", feedController.updateFeed)
router.delete("/:id", feedController.deleteFeed)

export default router