import * as React from "react";
import { useEffect } from "react";
import axios from "axios";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Typography,
} from "@mui/material";

// Subcard
import SubCard from "../../../Components/SubCard";

import config from "../../../config";

const columns = [
  { id: "title", label: "Job Role", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "city", label: "City", minWidth: 100 },
  // {
  //   id: "company",
  //   label: "Company Name",
  //   minWidth: 130,
  // },
];

export default function RecentlyAppliedList(props) {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("from recently applied jobs");
      const response = await axios.get(
        `${config.apiURL}/api/applicant/${localStorage.getItem("token")}`
      );
      console.log("Recently applied", response);
  
      if (response.data.status === 200) {
        setRows(response.data.data.appliedJobs);
      }
    } catch(err) {
      console.log(err);
    }

    setLoading(false);
  };

  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {rows.length !== 0 && (
        <SubCard>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            if (column.id === "company") {
                              return (
                                <TableCell
                                  key={row.company.id}
                                  align={column.align}
                                >
                                  {row.company !== null
                                    ? row.company.name !== undefined
                                      ? row.company.name
                                      : ""
                                    : ""}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </SubCard>
      )}

      {rows.length === 0 && (
        <SubCard>
          {loading ? (
            <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
              Loading....
            </Typography>
          ) : (
            <Typography align="center" variant="h6" sx={{ mt: 5, mb: 1 }}>
              You don't have any data
            </Typography>
          )}
        </SubCard>
      )}
    </>
  );
}
