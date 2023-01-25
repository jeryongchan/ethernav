import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useContext } from 'react';
import { AppContext } from '../../utils/AppContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import Spinner from '../../utils/spinner';
import { useTheme } from '@emotion/react';

const Transactions = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [txn, setTxn] = useState({});
    const { sharedState, setSharedState } = useContext(AppContext);
    const { hash } = router.query
    const theme = useTheme();

    useEffect(() => {
        if (sharedState.fetched && sharedState.txn) {
            setTxn(sharedState.txn)
            console.log("received txn from context")
            setLoaded(true)
            return;
        }
        const fetchHash = async (hash) => {
            console.log("fetching txn")
            return await fetch("/api/hash/" + hash)
                .catch(err => {
                    return;
                })
                .then(res => {
                    if (!res || !res.ok || res.status >= 400) {
                        return;
                    }
                    return res.json();
                })
                .then(res => {
                    if (!res) return;
                    const { data, isBlock } = res;
                    setTxn(data)
                    setLoaded(true)
                    return data;
                });
        }
        if (router.isReady) {
            const { hash } = router.query
            fetchHash(hash);
        }
    }, [hash, sharedState]);
    const gridSize = [3.5, 8.5]
    return (
        <>
            {!loaded ?
                <Box sx={{ width: "65%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Spinner />
                </Box>
                :
                <Grid container sx={{ width: "100%", justifyContent: "center", paddingTop: "1rem" }}>
                    <Grid item xs={8} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h5" margin="2rem 0 2rem 2rem">Transaction Details</Typography>
                        <Box sx={{ width: '100%', bgcolor: theme.palette.background.tertiary, marginBottom: '5rem'  }}>
                            <List>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Transaction Hash</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{txn.hash}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Block</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Link href={`/blocks/${txn.blockNumber}`} style={{ color: theme.palette.text.secondary }}>{txn.blockNumber}</Link>
                                            {/* <Typography fontSize="16px">{txn.blockNumber}</Typography> */}
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>From</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{txn.from}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>To</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{txn.to}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Value</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{parseInt(txn.value) / 1000000000000000000} bytes</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Txn Fee</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{parseInt(txn.gasPrice) * parseInt(txn.gas) / 1000000000000000000}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Gas Price</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{txn.gasPrice}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default Transactions
