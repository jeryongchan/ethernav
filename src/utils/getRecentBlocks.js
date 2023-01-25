const _ = require("lodash");
var Block = require('../models/Block')
// import Block from '../models/Block'
const mongoose = require('mongoose');
var Web3 = require('web3');

export async function getBlocksFromNode(web3, first, last) {
    const blockNumbers = _.range(first + 1, last + 1, 1)
    // const blockNumbers = _.range(16469238 - 50000, 16469238 -45000, 1) // last 20000 documents
    const batch = new web3.eth.BatchRequest()
    const total = blockNumbers.length;
    let counter = 0;
    let blocks = [];

    await new Promise(function (resolve, reject) {
        blockNumbers.forEach(blockNumber => {
            batch.add(
                web3.eth.getBlock.request(blockNumber, (error, data) => {
                    if (error) {
                        console.log("error", error)
                        return reject(error);
                    }
                    counter++;
                    console.log("blockNo:", blockNumber, " counter:", counter)
                    blocks.push(data);
                    if (counter === total) resolve();
                })
            )
        });
        batch.execute()
    });
    return blocks
}

export const getLatestBlocksFromDB = async (n) => {
    try {
        const blocks = await Block.find().sort({ number: -1 }).limit(n);
        return blocks;
    } catch (err) {
        console.log(err)
    }
}

export const writeBlocksToDB = async (blocksToInsertDB) => {
    try {
        await Block.insertMany(blocksToInsertDB);
        console.log("writefinish")
    } catch (err) {
        console.log(err)
    }
}

export default async function getRecentBlocks(numberOfBlocks) {
    const MONGO_URL = process.env.MONGODB_URI;
    mongoose.connect(MONGO_URL);
    const url = "https://mainnet.infura.io/v3/4481b75d4452409cbb634431a86de1b9";
    const web3 = new Web3(new Web3.providers.HttpProvider(url));

    //########
    const latestBlockFromDB = await getLatestBlocksFromDB(1);
    const latestBlockNumberFromDB = latestBlockFromDB[0].number
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const blocksToInsertDB = await getBlocksFromNode(web3, latestBlockNumberFromDB, latestBlockNumber)

    console.log("lengthOfBlocksToInsert", blocksToInsertDB.length)
    await writeBlocksToDB(blocksToInsertDB)
    const latestBlocks = await getLatestBlocksFromDB(numberOfBlocks);
    const latestBlocksJSON = JSON.parse(JSON.stringify(latestBlocks))
    console.log("firstBlock", blocksToInsertDB[0].number)
    console.log("lastBlock", blocksToInsertDB[blocksToInsertDB.length - 1].number)
    console.log("added", blocksToInsertDB[blocksToInsertDB.length - 1].number - blocksToInsertDB[0].number, "blocks to DB");
    return latestBlocksJSON;
}