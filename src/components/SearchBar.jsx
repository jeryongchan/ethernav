import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import TextFieldWrapper from "../utils/TextField";
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useContext } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
// import { useAppContext } from '../utils/AppContext';
import { AppContext } from '../utils/AppContext';
import { useTheme } from '@emotion/react';

const SearchBar = () => {
    const router = useRouter()
    const { sharedState, setSharedState } = useContext(AppContext);
    const theme = useTheme()

    return (
        <Formik
            initialValues={{ hash: "" }}
            // validationSchema={formSchema}
            onSubmit={(values, formActions) => {
                const vals = { ...values }
                formActions.resetForm();
                fetch("/api/hash/" + vals.hash)
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

                        if (isBlock === "true") {
                            setSharedState(state => ({
                                ...state,
                                fetched: "true",
                                block: data
                            }))
                            router.push("/blocks/" + vals.hash)
                        } else {
                            setSharedState(state => ({
                                ...state,
                                fetched: "true",
                                txn: data
                            }))
                            router.push("/txns/" + vals.hash)
                        }
                    });
            }}>
            {() => (
                <Form>
                    <Grid container direction="row" justifyContent="center" >
                        <Grid container margin={'1rem 0 1rem 0'} width="50%" minWidth="30vw">
                            <Grid item xs={9} >
                                <TextFieldWrapper
                                    name="hash"
                                    // placeholder="Enter hash"
                                    label="Search by Block Hash / Txn Hash..."
                                    autoComplete="off"
                                    margin="dense"
                                    sx={{
                                        input: { color: theme.palette.text.primary },
                                        '& .MuiInput-underline:before': { borderBottomColor: 'orange' },
                                        '& .MuiInput-underline:after': { borderBottomColor: 'orange' },

                                    }}
                                    InputLabelProps={{
                                        style: { color: theme.palette.background.secondary },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3} display="flex" alignItems="center" justifyContent="center" >
                                <Grid item xs={12} margin={'0.8rem 1rem 0.8rem 1rem'}>
                                    <IconButton type="submit" aria-label="search">
                                        <SearchIcon style={{ fill: theme.palette.text.primary }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
};

export default SearchBar;

