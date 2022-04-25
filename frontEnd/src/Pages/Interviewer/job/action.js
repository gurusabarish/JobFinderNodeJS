import React from 'react';
import { Menu, IconButton, MenuItem, Typography } from '@mui/material';
import { Box, DotsVertical } from "tabler-icons-react";

import axios from 'axios';
import config from '../../../config';

import DialogComponent from "../../../Components/Dialog";


export default function Action(props) {
    React.useEffect(() => {
        getApplicants();
    }, [props.data]);

    const [ applicants, setApplicants ] = React.useState([]);

    const getApplicants = async () => {
        try {
            const response = await axios.get(`${config.apiURL}/api/job/applicant/${props.data._id}`);
            console.log(response);

            if (response.data.status === 200) {
                setApplicants(response.data.data.applicants);
            }
        } catch (err) {
            console.log("error fetching data", err);
        }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <DotsVertical />
            </IconButton>

            <Menu sx={{ m:0, p:0}} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <DialogComponent title="Applicant" name="Applicants">
                    {applicants.map((applicant) => {
                        console.log(applicant.email);
                        return (
                            <Typography sx={{ p: 1 }}>Applicant's Email Address: {applicant.email}</Typography>
                        );
                    })}
                </DialogComponent>
            </Menu>
        </div>
    );
}
