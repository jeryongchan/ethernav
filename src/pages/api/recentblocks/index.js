import getRecentBlocks from "../../../utils/getRecentBlocks";

export default async function handler(req, res) {
    const blocks = await getRecentBlocks(15);
    res.status(200).json(blocks);
}