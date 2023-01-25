const _ = require("lodash");
var Web3 = require('web3');

async function getBlocksFromNode(web3, first, last) {
    const blockNumbers = _.range(first + 1, last + 1, 1)
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

export default async function getRecentTxns(n) {
    const INFURA_URL = process.env.INFURA_URL
    const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
    const latestBlockNumber = await web3.eth.getBlockNumber()
    const averageTxnsPerBlock = 139;
    const minNumBlocks = Math.ceil(n/averageTxnsPerBlock) + 1;
    const blocks = await getBlocksFromNode(web3, latestBlockNumber - minNumBlocks, latestBlockNumber)
    var txnHashes = []
    blocks.forEach(block => {
        txnHashes.push(...block.transactions);
    })
    // console.log(txnHashes)
    console.log("txnHashes.length", txnHashes.length);
    const txnHashesTruncated = txnHashes.slice(-n)
    console.log("truncated length", txnHashesTruncated.length);

    let txns = []
    await Promise.all(txnHashesTruncated.map(async (txnHash) => {
        let txn = await web3.eth.getTransaction(txnHash)
        txns.push(txn)
    }));
    return txns
}