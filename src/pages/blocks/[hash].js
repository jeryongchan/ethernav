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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Link from 'next/link';
import Spinner from '../../utils/spinner';
import { useTheme } from '@emotion/react';

const Block = () => {
    const router = useRouter()
    const [block, setBlock] = useState({});
    const [loaded, setLoaded] = useState(false);
    const theme = useTheme();

    const { sharedState, setSharedState } = useContext(AppContext);
    const { hash } = router.query
    useEffect(() => {
        if (sharedState.fetched && sharedState.block) {
            setBlock(sharedState.block);
            setLoaded(true);
            return;
        }
        const fetchHash = async (hash) => {
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
                    setBlock(data)
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
                <Box sx={{ width: "65%", height: "100%", display:"flex", justifyContent: "center", alignItems: "center"}}>
                    <Spinner />
                </Box>
                :
                <Grid container sx={{ width: "100%", justifyContent: "center", paddingTop: "1rem" }}>
                    <Grid item xs={8} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h5" margin="2rem 0 2rem 2rem">Block #{block.number}</Typography>
                        <Box sx={{ width: '100%', bgcolor: theme.palette.background.tertiary, marginBottom: '5rem' }}>
                            <List>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Block Height</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.number}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Timestamp</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.timestamp}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Accordion style={{
                                        boxShadow: "none",
                                        width: "100%",
                                    }} sx={{bgcolor: theme.palette.background.tertiary}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon style={{ fill: theme.palette.text.primary }}/>}
                                        >
                                            <Typography fontSize="16px" sx={{ width: "30%", flexShrink: 0 }}>
                                                <strong>Transactions</strong>
                                            </Typography>
                                            <Typography fontSize="16px">
                                                View all transactions:
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {block.transactions?.map(txn =>
                                                <Link href={`/txns/${txn}`} style={{ color: theme.palette.text.secondary }}>
                                                    <Typography marginLeft="29.5%" marginTop="0.2rem" align="left">{txn}</Typography>
                                                </Link>
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                    {/* </Grid>
                            </Grid> */}
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Fee Recipient</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.miner}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Total Difficulty</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.totalDifficulty}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Size</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.size} bytes</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Gas Used</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.gasUsed}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Gas Limit</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.gasLimit}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Base Fee Per Gas</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.gasLimit}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Gas Limit</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.baseFeePerGas}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Block Hash</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.hash}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Parent Hash</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.parentHash}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>StateRoot</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.stateRoot}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem >
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={gridSize[0]} container direction="column" alignItems="left" justify="center">
                                            <Typography marginLeft="1rem" fontSize="16px"><strong>Nonce</strong></Typography>
                                        </Grid>
                                        <Grid item xs={gridSize[1]} container direction="column" alignItems="left" justify="center">
                                            <Typography fontSize="16px">{block.nonce}</Typography>
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

export default Block;