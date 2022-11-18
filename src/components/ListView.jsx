import React, { useEffect } from 'react';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  IconButton,
  LinearProgress,
  Grid,
} from '@mui/material';
import { Edit as EditIcon, Visibility as EyeIcon } from '@mui/icons-material';

export default function ListView(props) {
  const { sort, sortBy, loading, actionsTable } = props;
  const [filter, setFilter] = React.useState(props.filter);
  const [perPage, setPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  let records = (() => {
    if (sort !== undefined && sort !== null && sortBy !== null) {
      return props.records.sort((row1, row2) => {
        if (sort === true) {
          return row1[sortBy] < row2[sortBy] ? 1 : -1;
        } else if (sort === false) {
          return row1[sortBy] > row2[sortBy] ? 1 : -1;
        } else {
          return sort(row1, row2, sortBy) ? 1 : -1;
        }
      });
    }
    return props.records;
  })();

  useEffect(() => {
    setFilter(props.filter);
  });
  const updateCheck = (index, selected) => {
    if (props.update) {
      props.update(index, !selected);
    }
  };

  const inPage = (index) => {
    let total = records.length;
    let _perPage = perPage === 'All' ? total : perPage;
    let max = page * _perPage;
    let min = max - _perPage;
    if (min <= index && index < max) return true;
    else return false;
  };

  const handleChangePage = (event, newPage) => {
    newPage++;
    if (newPage === 0) newPage = 1;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(1);
    setPerPage(event.target.value);
  };

  const filterRecord = (record) => {
    if( filter === undefined ) return true
    if (filter !== '') {
        let out = true;
        props.headers.forEach((header) => {
            if (header.filter) {
                out = out || header.filter(filter, record[header.key]);
            } else {
                out = out || String(record[header.key]).includes(filter);
            }
        });
      return out;
    }
    return true;
  };

  return (
    <React.Fragment>
      <TableContainer style={{ width: '100%' }}>
        <Table variant='zoho-table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                {!props.disableSelection && <Checkbox
                  checked={props.allSelected}
                  className={props.allSelected ? 'selected' : ''}
                  onClick={() => updateCheck(null, props.allSelected)}
                />}
              </TableCell>
              {props.headers.map((header, index_header) => (
                <TableCell key={index_header} align='center'>
                  <span className='tablecell-th-zoho'>{header.name}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length === 0 && (
              <TableRow hover={false}>
                <TableCell
                  colSpan={7}
                  align='center'
                  sx={{ color: '#616e88', fontSize: '0.9rem', lineHeight: '5' }}
                >
                  No records found
                </TableCell>
              </TableRow>
            )}

            {records.map((record, index_record) => {
              if (!inPage(index_record)) return;
              if (!filterRecord(record)) return;

              return (
                <TableRow key={index_record} hover>
                  <TableCell align='center'>
                    { props.onEdit && <IconButton
                      size='small'
                      key={'action_edit_record'}
                      aria-label='edit record'
                      onClick={() => props.onEdit(record[props.id])}
                      sx={{ marginRight: '15px' }}
                    >
                      <EditIcon fontSize='small' style={{ color: 'black' }} />
                    </IconButton>}
                    
                    {props.onView && <IconButton
                      size='small'
                      key={'action_view_record'}
                      aria-label='view record'
                      onClick={() => props.onView(record[props.id])}
                      sx={{ marginRight: '15px' }}
                    >
                      <EyeIcon fontSize='small' style={{ color: 'black' }} />
                    </IconButton>}

                    {!props.disableSelection && <Checkbox
                      checked={record.selected}
                      className={record.selected ? 'selected' : ''}
                      onClick={() => updateCheck(record[props.id], record.selected)}
                    />}
                  </TableCell>
                  {props.headers.map((header, index_header) => (
                    <TableCell key={index_header + '_content'} align='center' style={header.style}>
                        {
                            header.format
                            ? header.format(record[props.id], record[header.key], header.default)
                            : (
                                record[header.key]
                                ? record[header.key]
                                : header.default
                            )
                        }
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        { loading && <LinearProgress/> }
        <Grid container>
          <Grid item xs={4} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            {actionsTable}
          </Grid>
          <Grid item xs={8}>
            <TablePagination
              rowsPerPageOptions={[
                { label: '5', value: 5 },
                { label: '10', value: 10 },
                { label: '20', value: 20 },
                { label: 'All', value: records.length },
              ]}
              component='div'
              labelDisplayedRows={({ from, to, count }) => {
                from = (page - 1) * perPage + 1;
                to = from + perPage > count ? count : from + perPage - 1;
                return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
              }}
              count={records.filter(filterRecord).length}
              rowsPerPage={perPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </TableContainer>
    </React.Fragment>
  );
}
