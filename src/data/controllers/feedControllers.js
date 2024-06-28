import feedRepositories from "../repositories/feedRepositories.js";
import feedSchema from "../models/Feed.js";

export async function createFeed(req,res){
    try{
        const newFeed = new feedSchema(req.body)
        const savedFeed = await feedRepositories.create(newFeed)

        res.status(201).json({
            statusCode: 201,
            message:"Feed criado com sucesso!",
            data:{
                savedFeed
            }
        })
    }
    catch(error){
        res.status(500).json({
            statusCode:500,
            message:error.message
        })
    }
}   

export async function getAllFeeds(req,res){
    try{
        const feeds = await feedRepositories.findAll()
        res.status(200).json(feeds)
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

export async function getFeedByOwner(req,res){
    try{
        const feeds = await feedRepositories.findByOwner(req.params.owner)
        res.status(200).json(feeds)
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

export async function updateFeed(req,res){
    try{
        const feed = await feedRepositories.updateById(req.params.id, req.body)
        res.status(200).json(feed)
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

export async function deleteFeed(req,res){
    try{
        const feed = await feedRepositories.deleteById(req.params.id)
        res.status(200).json(feed)
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}