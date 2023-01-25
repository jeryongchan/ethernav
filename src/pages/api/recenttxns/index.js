import getRecentTxns from "../../../utils/getRecentTxns";

export default async function handler(req, res) {
    const txns = await getRecentTxns(2);
    res.status(200).json(txns);
}