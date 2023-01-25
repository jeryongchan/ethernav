const Block = require('../../../models/block')
const mongoose = require('mongoose');
var Web3 = require('web3');


const getLatestBlocksFromDB = async (n) => {
    try {
        const blocks = await Block.find().sort({ number: -1 }).limit(n);
        return blocks;
    } catch (err) {
        console.log(err)
    }
}


export default async function handler(req, res) {
    const MONGO_URL = process.env.MONGODB_URI;
    mongoose.connect(MONGO_URL);
    const latestBlocks = await getLatestBlocksFromDB(10);
    const latestBlocksJSON = JSON.parse(JSON.stringify(latestBlocks))

    res.status(200).json(latestBlocksJSON)
  }
  