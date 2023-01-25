var Web3 = require('web3');
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { last } from 'lodash';
import { Chart } from '../../components/Chart';

import { getLatestBlocksFromDB, getBlocksFromNode, writeBlocksToDB } from "../../utils/getRecentBlocks"
var Block = require('../../models/Block')
const mongoose = require('mongoose');

const getLabelFromObject = (obj) => {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datesInUnix = Object.keys(obj);
    var labels = []
    datesInUnix.forEach((date) => {
        const currDate = new Date(parseInt(date) * 1000);
        const label = String(currDate.getDate() + "-" + months[currDate.getMonth()] + "-" + currDate.getFullYear());
        labels.push(label)
    })
    return labels;
}

const getDataFromObject = (obj) => {
    const data = Object.values(obj)
    return data
}

const getChartData = (obj, color) => {
    const data = {
        labels: getLabelFromObject(obj),
        datasets: [
            {
                data: getDataFromObject(obj),
                borderColor: color,
                backgroundColor: color,
            },
        ],
    };
    return data;
}

function Analytics({ totalTxnsPastNDay, blockBinsByPastNDay, txnBinsByPastNDay, txnBinsPerSecByPastNDay }) {

    return (
        <>
            <Grid item container direction="row" alignItems="center" justify="center">
                <Grid item xs={3.5} />
                <Grid item container xs={5} direction="column" textAlign="left" alignItems="left">
                    <Typography variant="h6" margin="2rem 0 0.4rem 2rem"><strong>Analytics</strong></Typography>
                    <Typography variant="subtitles1" margin="0 0 2.5rem 2rem">{totalTxnsPastNDay} transactions past 7 days</Typography>
                    <Grid item xs={3} container direction="column" alignItems="center" justify="center" margin="0 0 2rem 0">
                        <Chart data={getChartData(blockBinsByPastNDay, 'rgb(0,139,139)')} title={"Blocks Per Day"} />
                    </Grid>
                    <Grid item xs={3} container direction="column" alignItems="center" justify="center" margin="0 0 2rem 0">
                        <Chart data={getChartData(txnBinsByPastNDay, 'rgb(255, 99, 132)')} title={"Txns Per Day"} />
                    </Grid>
                    <Grid item xs={3} container direction="column" alignItems="center" justify="center" margin="0 0 5rem 0">
                        <Chart data={getChartData(txnBinsPerSecByPastNDay, "rgb(138,43,226)")} title={"Throughput (txns/sec)"} />
                    </Grid>
                </Grid>
                <Grid item xs={3.5} />
            </Grid>
        </>
    )
}

export default Analytics


const getBlocksFromDBPastNDays = async (n) => {
    try {
        const now = Math.floor(Date.now() / 1000);
        const lastDate = getLastDateForDBQuery(n);
        const blocks = await Block.find().where('timestamp').gt(lastDate).lt(now);
        return blocks;
    } catch (err) {
        console.log(err)
    }
}

const getUTCDay = date => {
    var thatDay = new Date(date * 1000).setUTCHours(0, 0, 0, 0);
    thatDay = thatDay / 1000;
    return thatDay
}

const getToday = () => {
    var dateToday = new Date().setUTCHours(0, 0, 0, 0);
    return dateToday / 1000
}

const getLastDateForDBQuery = n => {
    // for data from at least past n days
    return getToday() - n * 86400
}

export async function getStaticProps() {
    // past 3 days first
    // access DB to retrieve blocks (time <= past 7 days)
    // iterate through blocks, for each timestamp, check which day it belongs to and bin it by count
    // daily txns > total number of txns (by summation)
    // daily txns > txns by second per day (divide by 24*3600)
    // console.log(getLastDateForDBQuery(3))
    // console.log(getUTCDay(1674413339))

    //########
    const MONGO_URL = process.env.MONGODB_URI;
    mongoose.connect(MONGO_URL);
    const INFURA_URL = process.env.INFURA_URL
    const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));

    const latestBlockFromDB = await getLatestBlocksFromDB(1);
    const latestBlockNumberFromDB = latestBlockFromDB[0].number
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const blocksToInsertDB = await getBlocksFromNode(web3, latestBlockNumberFromDB, latestBlockNumber)

    console.log("lengthOfBlocksToInsert", blocksToInsertDB.length)
    await writeBlocksToDB(blocksToInsertDB)

    const pastNDays = 7
    const blocksPastNDays = await getBlocksFromDBPastNDays(pastNDays)
    console.log("blocksPastNDays.length", blocksPastNDays.length)

    const today = getToday();
    const lastDate = getLastDateForDBQuery(pastNDays);
    var blockBinsByPastNDay = {}
    var txnBinsByPastNDay = {}

    for (var day = today; day > lastDate; day -= 86400) {
        blockBinsByPastNDay[day] = 0;
        txnBinsByPastNDay[day] = 0;
    }

    blocksPastNDays.forEach(block => {
        const timestampByDay = getUTCDay(block.timestamp);
        const dates = Object.keys(blockBinsByPastNDay);
        const dateIndex = dates.indexOf(String(timestampByDay));
        if (dateIndex != -1) {
            blockBinsByPastNDay[timestampByDay] += 1;
            txnBinsByPastNDay[timestampByDay] += block.transactions.length;
        }
        // else {
        //     console.log("Doesn't exist.");
        // }
    })
    const txnBinsPerSecByPastNDay = {};
    var count = 0
    for (const [key, value] of Object.entries(txnBinsByPastNDay)) {
        txnBinsPerSecByPastNDay[key] = value / 3600 / 24
        count += value;
    }
    const totalTxnsPastNDay = count;
    return {
        props: {
            totalTxnsPastNDay: totalTxnsPastNDay,
            blockBinsByPastNDay: blockBinsByPastNDay,
            txnBinsByPastNDay: txnBinsByPastNDay,
            txnBinsPerSecByPastNDay: txnBinsPerSecByPastNDay
        },
        revalidate: 10
    }
}


    // const blockBinsByPastNDay = {
    //     '1674000000': 0,
    //     '1674086400': 5052,
    //     '1674172800': 7168,
    //     '1674259200': 7163,
    //     '1674345600': 7160,
    //     '1674432000': 7165,
    //     '1674518400': 6445
    // }
    // const txnBinsByPastNDay = {
    //     '1674000000': 0,
    //     '1674086400': 728852,
    //     '1674172800': 1024504,
    //     '1674259200': 994076,
    //     '1674345600': 889814,
    //     '1674432000': 947725,
    //     '1674518400': 924193
    // }