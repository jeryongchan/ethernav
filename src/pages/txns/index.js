import getRecentTxns from "../../utils/getRecentTxns";
import { useEffect, useState } from "react";
import { paginate } from "../../utils/paginate";
import PaginatedTxnList from "../../components/PaginatedTxnList"
// import * as fs from 'fs'
// const path = require('path');
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';


function TxnList({ txns }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const onPageChange = (e, page) => {
        console.log(page)
        setCurrentPage(page);
    };
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(0);
    };
    const paginatedPosts = paginate(txns, currentPage, rowsPerPage);
    useEffect(() => {
    }, [paginatedPosts])

    return (
        <Grid container sx={{ width: "100%", justifyContent: "center", paddingTop: "1rem" }}>
            <Grid item xs={10} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h6" margin="0 0 2rem 2rem"><strong>List of transactions</strong></Typography>
                <PaginatedTxnList txns={paginatedPosts} />
                <Box justifyContent="right" display='flex' margin="1rem 1rem 2rem 0">
                    <TablePagination
                        component="div"
                        count={txns.length}
                        page={currentPage}
                        onPageChange={onPageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>

            </Grid>
        </Grid>
    )
}

export default TxnList


export async function getStaticProps() {
    const txns = await getRecentTxns(100)
    // const jsonDirectory = path.join(process.cwd(), 'json');
    // const txns = JSON.parse(fs.readFileSync(jsonDirectory + '/txns.json', 'utf-8'))
    console.log(txns.length)

    return {
        props: {
            txns: txns
        },
        revalidate: 10
    }
}