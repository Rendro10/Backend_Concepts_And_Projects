const shortid = require('shortid');
const URL = require("../models/url.model");



async function generateShortUrl(req,res){
    const body = req.body;

    if(!body.url){
        return res.status(400).json({error:"Url is Required!"})
    }
    const shortID = shortid();
    await URL.create({
        shortId:shortID,
        redirectUrl: body.url,
        visitHistory:[],
        createdBy:req.user._id
    });

    return res.render('home',{
        id:shortID
    })
    // return res.json({id:shortID});
}

module.exports ={
    generateShortUrl
}