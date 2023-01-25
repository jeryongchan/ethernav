import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BlockSchema = new Schema({
    baseFeePerGas: Number,
    difficulty: Number,
    extraData: String,
    gasLimit: Number,
    gasUsed: Number,
    hash: String,
    logsBloom: String,
    miner: String,
    mixHash: String,
    nonce: String,
    number: {
        type: Number,
        required: true,
        index: true,
        unique: true,
    },
    parentHash: String,
    receiptsRoot: String,
    sha3Uncles: String,
    size: Number,
    stateRoot: String,
    timestamp: Number,
    totalDifficulty: Number,
    transactions: [String],
    transactionsRoot: String,
    uncles: [Number]
})

module.exports = mongoose.models.Block || mongoose.model('Block', BlockSchema)      
// module.exports = mongoose.models["Block"] ?? mongoose.model("Block", BlockSchema)
// export default mongoose.models.Block || mongoose.model('Block', BlockSchema)