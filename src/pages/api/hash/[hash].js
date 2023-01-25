import { validateHash } from '../../../utils/validateHash';
import { isNumeric } from '../../../utils/isNumeric';
var Web3 = require('web3');

export default async function handler(req, res) {
    const { hash } = req.query
    const MONGO_URL = process.env.MONGODB_URI
    const INFURA_URL = process.env.INFURA_URL
    const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
    if (validateHash(hash)) {
        const transaction = await web3.eth.getTransaction(hash);
        if (transaction) {
            console.log("txn")
            res.status(200).json({ data: transaction, isBlock: "false" })
        } else {
            console.log("block by hash")
            const block = await web3.eth.getBlock(hash);
            res.status(200).json({ data: block, isBlock: "true" })
        }
    } else {
        if (isNumeric(hash)) {
            const latestBlockNumber = await web3.eth.getBlockNumber();
            if (hash < latestBlockNumber) {
                //provided hash is block number instead
                console.log("block by number")
                const block = await web3.eth.getBlock(hash);
                console.log("block", block)
                res.status(200).json({ data: block, isBlock: "true" })
            }

        }
    }
}
