const router = require("express").Router();
const { publicPosts, privatePosts } = require("../data.json");
const authToken = require("../authToken");

router.get("/public", (req, res) => {
    res.json(publicPosts);
});  

router.get("/private", authToken, (req, res) => {
    res.json(privatePosts);
});  

module.exports = router;