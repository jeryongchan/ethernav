import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { useTheme } from '@emotion/react';

export default function RecentBlockList({ blocks }) {
    const theme = useTheme();
    return (
        <Box sx={{ height: '65vh', width: '100%' }}>
            <List sx={{ maxHeight: '100%', overflow: 'auto', bgcolor: theme.palette.background.tertiary }}>
                {blocks.map((block, index) =>
                    <Link style={{ color: theme.palette.text.primary }} href={`/blocks/${block.hash}`}>
                        <ListItemButton key={index} divider={index < blocks.length - 1}>
                            <Avatar sx={{ bgcolor: theme.palette.text.secondary, borderRadius: '10%', marginRight: '1rem' }}>Bk</Avatar>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={4.5} width="100%" height="1vh" fontSize="16px">
                                    <div>{block.number}</div>
                                </Grid>
                                <Grid item xs={7.5} fontSize="13px">
                                    Fee Recipient: {block.miner.slice(0, 4)}...{block.miner.slice(-3)}
                                </Grid>
                                <Grid item xs={4.5} fontSize="10px">
                                    {((new Date().getTime())/1000 - block.timestamp).toFixed(0)} sec ago
                                </Grid>
                                <Grid item xs={7.5} fontSize="13px">
                                    {block.transactions.length} txns
                                </Grid>
                            </Grid>
                        </ListItemButton>
                    </Link>
                )}
            </List>

        </Box>
    );
}