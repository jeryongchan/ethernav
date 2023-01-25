import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { useTheme } from '@emotion/react';

export default function RecentTxnList({ txns }) {
    const theme = useTheme();
    return (
        <Box sx={{ height: '65vh', width: '100%' }}>
            <List sx={{ maxHeight: '100%', overflow: 'auto', bgcolor: theme.palette.background.tertiary }}>
                {txns.map((txn, index) =>
                    <Link style={{ color: theme.palette.text.primary }} href={`/txns/${txn.hash}`}>
                        <ListItemButton  key={index} divider={index < txns.length - 1}>
                            <Avatar sx={{ bgcolor: 'black',color: theme.palette.text.primary, marginRight: '1rem' }}>Tx</Avatar>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={4.5} width="100%" height="1.5vh" fontSize="16px">
                                    <div>{txn.hash.slice(0, 10)}...</div>
                                </Grid>
                                <Grid item xs={7.5} fontSize="13px">
                                    From {txn.from.slice(0, 15)}...
                                </Grid>
                                <Grid item xs={4.5} fontSize="10px">
                                    13 sec ago
                                </Grid>
                                <Grid item xs={7.5} fontSize="13px">
                                    To {txn.to.slice(0, 15)}...
                                </Grid>
                            </Grid>
                        </ListItemButton>
                    </Link>
                )}
            </List>

        </Box>
    );
}