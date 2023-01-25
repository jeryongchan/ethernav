import getRecentBlocks from "../../utils/getRecentBlocks";
import { useEffect, useState } from "react";
import { paginate } from "../../utils/paginate";
import PaginatedBlockList from "../../components/PaginatedBlockList"
// import * as fs from 'fs'
// const path = require('path');
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';


function BlockList({ blocks }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const onPageChange = (e, page) => {
        console.log(page)
        setCurrentPage(page);
    };
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(0);
    };
    const paginatedPosts = paginate(blocks, currentPage, rowsPerPage);
    useEffect(() => {
    }, [paginatedPosts])

    return (
        <Grid container sx={{ width: "100%", justifyContent: "center", paddingTop: "1rem" }}>
            <Grid item xs={10} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h6" margin="0 0 2rem 2rem"><strong>List of blocks</strong></Typography>
                <PaginatedBlockList blocks={paginatedPosts} />
                <Box justifyContent="right" display='flex' margin="1rem 1rem 2rem 0">
                    <TablePagination
                        component="div"
                        count={blocks.length}
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

export default BlockList

export async function getStaticProps() {
    const blocks = await getRecentBlocks(1000)
    // const jsonDirectory = path.join(process.cwd(), 'json');
    // const blocks = JSON.parse(fs.readFileSync(jsonDirectory + '/blocks.json', 'utf-8'))
    console.log(blocks.length)

    return {
        props: {
            blocks: blocks
        },
        revalidate: 60
    }
}