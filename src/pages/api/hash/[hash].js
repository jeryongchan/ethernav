import { validateHash } from '../../../utils/validateHash';
import { isNumeric } from '../../../utils/isNumeric';
var Web3 = require('web3');

export default async function handler(req, res) {
    const { hash } = req.query
    const url = "https://mainnet.infura.io/v3/4481b75d4452409cbb634431a86de1b9";
    const web3 = new Web3(new Web3.providers.HttpProvider(url));
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
