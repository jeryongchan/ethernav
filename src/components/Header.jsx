import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import InfoIcon from '@mui/icons-material/Info';
import { Manrope } from '@next/font/google'
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import { useTheme } from '@emotion/react';
const manrope = Manrope({
    subsets: ['latin'],
    weight: ['400']
});



const Header = () => {
    const theme = useTheme()

    return (
        <Box height="100px" >
            <Toolbar style={{
                height: '20px',
                paddingRight: '20px',
            }}>
                <Grid container direction="row" margin="3rem 0 2rem 0">
                    <Grid item xs={1} />
                    <Grid item xs={2} marginTop="1.5rem" style={{ textAlign: 'left' }} alignItems="center" justifyContent="center" display="flex">
                        <Link href="/" style={{ color: "black" }} >
                            <p className={manrope.className} style={{ fontSize: "30px", color: theme.palette.text.primary }} >
                                ether<span style={{ color: theme.palette.text.secondary }}>nav</span>
                            </p>
                        </Link>
                    </Grid>
                    <Grid item xs={7} marginTop="1.5rem" alignItems="center" justifyContent="right" display="flex">
                        <SearchBar />
                    </Grid>
                    <Grid item xs={1} marginTop="2rem" alignItems="center" justifyContent="center" display="flex">
                        <Link href={'/analytics'}>
                            <EqualizerIcon style={{ fill: theme.palette.text.primary, fontSize: 28, marginRight: "1rem" }} />
                        </Link>
                        <Link href={'/about'}>
                            <InfoIcon style={{ fill: theme.palette.text.primary, fontSize: 25 }} />
                        </Link>
                    </Grid>
                    <Grid item xs={2} />

                    {/* <Grid item xs={1.5} marginTop="2rem" alignItems="center" justifyContent="center" display="flex">
                </Grid> */}
                </Grid>
            </Toolbar>
        </Box >
    )
};

export default Header;
