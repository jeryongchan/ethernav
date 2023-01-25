import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Link from 'next/link';

export default function TxnList({ txns }) {
    const theme = useTheme();
    const gridSize = [2.5, 1.5, 1.5, 2, 2, 1.5, 1]
    return (
        <Box sx={{ width: '100%', bgcolor: theme.palette.background.tertiary }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction="row" alignItems="flex-end" justify="center" paddingRight="1rem">
                <Grid item xs={gridSize[0]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Txn Hash</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[1]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Block</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[2]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Age</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[3]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>From</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[4]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"> <strong>To</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[5]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px">  <strong>Value</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[6]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"> <strong>Txn Fee</strong></Typography>
                </Grid>
            </Grid>
            <List>
                <Divider />
                {txns.map((txn, index) =>
                    <Link style={{ color: theme.palette.text.primary }} href={`/txns/${txn.hash}`}>
                        <ListItemButton width="100%" key={index} divider={index < txns.length}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={gridSize[0]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="14px">{txn.hash.slice(0, 20)}...</Typography>
                                </Grid>
                                <Grid item xs={gridSize[1]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="14px">{txn.blockNumber}</Typography>
                                </Grid>
                                <Grid item xs={gridSize[2]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="13px">13 secs ago</Typography>
                                </Grid>
                                <Grid item xs={gridSize[3]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="14px">{txn.from.slice(0, 12)}...</Typography>
                                </Grid>
                                <Grid item xs={gridSize[4]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="14px">{txn.to.slice(0, 12)}...</Typography>
                                </Grid>
                                <Grid item xs={gridSize[5]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="13px">{Number(parseInt(txn.value) / 1000000000000000000).toPrecision(3)} Ether</Typography>
                                </Grid>
                                <Grid item xs={gridSize[6]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="13px">{Number(parseInt(txn.gasPrice) * parseInt(txn.gas) / 1000000000000000000).toPrecision(3)}</Typography>
                                </Grid>
                            </Grid>
                        </ListItemButton>
                    </Link>
                )}
            </List>

        </Box>
    );
}