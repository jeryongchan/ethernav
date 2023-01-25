import Link from 'next/link'
import getRecentBlocks from "../utils/getRecentBlocks";
import getRecentTxns from "../utils/getRecentTxns";
import BlockList from '../components/RecentBlockList';
import TxnList from '../components/RecentTxnList';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
// import * as fs from 'fs'
// const path = require('path');

function Home({ blocks, txns }) {
    const theme = useTheme()
    return (
        <>
            <Grid container sx={{ width: "100%", justifyContent: "center", paddingTop: "1rem" }}>
                <Grid item xs={4} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ justifyContent: "center", display: "flex" }} marginBottom="1rem">
                        <Typography variant="subtitle1"><strong>Last 100 Blocks</strong></Typography>
                    </Box>
                    <BlockList blocks={blocks} />
                    <Box sx={{ justifyContent: "center", display: "flex", marginTop: "1.2rem" }}>
                        <Button variant="contained" sx={{
                            maxHeight: '2rem',
                            minHeight: '2rem',
                            maxWidth: '24rem',
                            minWidth: '24rem',
                            ':hover': {
                                bgcolor: theme.palette.background.secondary,
                                color: theme.palette.text.primary,
                            },
                            bgcolor: theme.palette.background.tertiary,

                        }}>
                            <Link href='/txns' style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                                fontSize: 14,
                            }}>
                                View more blocks
                            </Link>
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={0.3} />
                <Grid item xs={4} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ justifyContent: "center", display: "flex" }} marginBottom="1rem">
                        <Typography variant="subtitle1"><strong>Last 100 Transactions</strong></Typography>
                    </Box>
                    <TxnList txns={txns} />
                    <Box sx={{ justifyContent: "center", display: "flex", marginTop: "0.9rem" }}>
                        <Button variant="contained" sx={{
                            maxHeight: '2rem',
                            minHeight: '2rem',
                            maxWidth: '24rem',
                            minWidth: '24rem',
                            ':hover': {
                                bgcolor: theme.palette.background.secondary,
                                color: theme.palette.text.primary,
                            },
                            bgcolor: theme.palette.background.tertiary,

                        }}>
                            <Link href='/txns' style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                                fontSize: 14,
                            }}>
                                View more transactions
                            </Link>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Home

export async function getStaticProps() {
    const blocks = await getRecentBlocks(100)
    const txns = await getRecentTxns(100)
    // const jsonDirectory = path.join(process.cwd(), 'json');
    // const blocks = JSON.parse(fs.readFileSync(jsonDirectory + '/blocks.json', 'utf-8'))
    // const txns = JSON.parse(fs.readFileSync(jsonDirectory + '/txns.json', 'utf-8'))
    // console.log(blocks.length)
    // console.log(txns.length)
    return {
        props: {
            blocks: blocks,
            txns: txns
        },
        revalidate: 10
    }
}