import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Link from 'next/link';

export default function BlockList({ blocks }) {
    const theme = useTheme();
    const gridSize = [1.5, 2, 1, 1, 2, 1.5, 1.5, 1]
    return (
        <Box sx={{ width: '100%', bgcolor: theme.palette.background.tertiary }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction="row" alignItems="flex-end" justify="center" padding="0 1rem 0 1rem">
                <Grid item xs={gridSize[0]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Block</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[1]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Block Hash</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[2]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Age</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[3]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Txns</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[4]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Fee Recipient</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[5]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Gas Used</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[6]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Gas Limit</strong></Typography>
                </Grid>
                <Grid item xs={gridSize[7]} container direction="column" alignItems="center" justify="center">
                    <Typography fontSize="14px"><strong>Base Fee</strong></Typography>
                </Grid>
            </Grid>

            <List>
                <Divider />
                {blocks.map((block, index) =>
                    <Link style={{ color: theme.palette.text.primary }} href={`/blocks/${block.hash}`}>
                        <ListItemButton width="100%" key={index} divider={index < blocks.length}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={gridSize[0]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="14px">{block.number}</Typography>
                                </Grid>
                                <Grid item xs={gridSize[1]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="14px">{block.hash.slice(0, 15)}...</Typography>
                                </Grid>
                                <Grid item xs={gridSize[2]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="13px">{((new Date().getTime())/1000 - block.timestamp).toFixed(0)} sec ago</Typography>
                                </Grid>
                                <Grid item xs={gridSize[3]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="14px">{block.transactions.length}</Typography>
                                </Grid>
                                <Grid item xs={gridSize[4]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="14px">{block.miner.slice(0, 12)}...</Typography>
                                </Grid>
                                <Grid item xs={gridSize[5]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="13px">{block.gasUsed}</Typography>
                                </Grid>
                                <Grid item xs={gridSize[6]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="13px">{block.gasLimit}</Typography>
                                </Grid>
                                <Grid item xs={gridSize[7]} container direction="column" alignItems="center" justify="center">
                                    <Typography fontSize="13px">{block.baseFeePerGas}</Typography>
                                </Grid>
                            </Grid>

                            {/* <ListItemText primary={block.number} /> */}

                        </ListItemButton>
                    </Link>
                )}
            </List>

        </Box>
    );
}