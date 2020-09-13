import React, { useState, useEffect } from 'react';
import M from 'materialize-css'
import { exportTableToCSV } from '../CSV'
import { RDB } from '../../../../Firebase/database'
// import { useSelector } from 'react-redux';
import { useTable, useFilters, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import matchSorter from 'match-sorter'

// Define a default UI for filtering
function DefaultColumnFilter({column: { filterValue, preFilteredRows, setFilter }}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder={`Search ${count} records...`}
    />
  )
}

function DateFilter({
  column: { filterValue = undefined, preFilteredRows, setFilter },
}) {
  // const count = preFilteredRows.length
  var elems = document.querySelectorAll('.userdatepicker'); 
  M.Datepicker.init(elems, {
    maxDate: new Date(),
    onSelect: date => setFilter(date.toLocaleDateString() || undefined ),
    onClose: () => setFilter(undefined)
  });

  return (
    <input
      className='userdatepicker'
      type='text'
      defaultValue={ filterValue || '' }
      placeholder='Date'
    />
  )
}

function SelectColumnFilter({column: { filterValue, setFilter, preFilteredRows, id }}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <>
      <select
        className='browser-default'
        style={{border: 'none', borderBottom: '1px solid #9e9e9e'}}
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
DateFilter.autoRemove = val => !val
fuzzyTextFilterFn.autoRemove = val => !val



const Users = () => {
  const [status, setStatus] = useState(false);

  const [data, setdata] = useState([]);

	useEffect(() => {
    if (status) {
      return;
    }
    let records = []; 
    RDB.ref('Users').once('value')
    .then( res => {
      let entries = res.val();
      Object.keys(entries).forEach(key =>{
        records.unshift({ 
          user_id: entries[key].user_id,
          phoneNumber: entries[key].phoneNumber,
          registrationDate: new Date(entries[key].registrationDate).toLocaleDateString(),
          state: entries[key].state
        })
      })
      console.log("calling use Effect");
        setStatus(true);
        setdata(records)
      })
      .catch(err => {
        console.log("Manual Error", err)
        setStatus(true);
      })
    }, [status])

    
  const filterTypes = React.useMemo(() => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),[])
  const defaultColumn = React.useMemo(() => ({Filter: DefaultColumnFilter}),[])
  // const dispatch = useDispatch();
  
  const columns = React.useMemo(() => [
      { Header: 'USER ID', accessor: 'user_id' }, // accessor is the "key" in the data
      { Header: 'PHONE', accessor: 'phoneNumber' },
      { Header: 'DATE', accessor: 'registrationDate', Filter: DateFilter },
      { Header: 'STATE', accessor: 'state', Filter: SelectColumnFilter, filter: 'includes'}
    ],[])

    
    const { 
      getTableProps,
      getTableBodyProps, 
      prepareRow, 
      rows, 
      headerGroups, 
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
  
      // visibleColumns, 
      // setGlobalFilter,
      // preGlobalFilteredRows,
     } = useTable(
       { data, columns, initialState: { pageIndex: 0, pageSize: 25 }, defaultColumn, filterTypes},
       useFilters, useGlobalFilter, useSortBy, usePagination )
    
    return (
      <div className="card" style={{padding: 10, borderRadius: 10}}>
        <div className='card-content'  style={{overflow: 'scroll'}}>
        	<div style={{display: 'flex'}}>
			  		<h5 style={{flex:'1', textAlign: 'left', marginTop: 5}} >RESULTS</h5>
			  		<div>
			  			<button disabled={data.length < 1 || !status} className='btn' onClick={() => exportTableToCSV('Users.csv', rows, ['User Id', 'Phone Number', 'Date', 'state'])}>
			  				<i className='material-icons right' style={{marginLeft: 0}}>file_download</i>
			  				<span className='hide-on-med-and-down' style={{marginRight: 10}}>Download CSV</span>
			  			</button>
			  		</div>
			  	</div>
          <table className='highlight' {...getTableProps()} id="myUserTable" style={{overflow: 'scroll', display: status ? null: 'none'}} >
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} >
                  {headerGroup.headers.map(column => (
                 <th {...column.getHeaderProps(
                  //  column.getSortByToggleProps()
                   )}>
                      {column.render('Header')}
                     <span>
                       {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                     </span>
                     <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} >
                    {/* {console.log(i, row)} */}
                    <td {...row.cells[0].getCellProps()}>{row.cells[0].render('Cell')}</td>
                    <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
                    <td {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>
                    <td {...row.cells[3].getCellProps()}>{row.cells[3].render('Cell')}</td>      
                  </tr>
                )}
              )}
            </tbody>

          </table>
          <div className="pagination container" style={{display: status ? null: 'none'}}>
            <div className='row' >
              <div className='col' style={{marginTop: 25}}>
                <button className="btn circle" onClick={() => gotoPage(0)}    
                  disabled={!canPreviousPage}> <i className="material-icons circle" >first_page</i></button>{' '}
                <button className="btn" onClick={() => previousPage()} 
                  disabled={!canPreviousPage}> <i className="material-icons" >keyboard_arrow_left</i></button>{' '}
                <button className="btn" onClick={() => nextPage()}     
                  disabled={!canNextPage}> <i className="material-icons" >keyboard_arrow_right</i></button>{' '}
                <button className="btn" onClick={() => gotoPage(pageCount - 1)} 
                  disabled={!canNextPage}> <i className="material-icons" >last_page</i></button>{' '}

                <span>Page{' '}<strong>  {pageIndex + 1} of {pageOptions.length}</strong>{' '}</span>
              </div>
              <div className='col s12 m2 right' >
                <label htmlFor='userPageNumber' >Go to page</label>
                <input id='userPageNumber' type="number" defaultValue={pageIndex + 1}
                  onChange={e => gotoPage(e.target.value ? Number(e.target.value) - 1 : 0)}/>
              </div>
              <div className='col s12 m2 right'>
                <label htmlFor='userpagefilter' >Rows Per Page</label>
                <select id='userpagefilter' value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {/* <option value={5}>Show 5</option> */}
                  {[25, 50, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>{pageSize} </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {!status ?
            <div className="preloader-wrapper big active center" style={{ textAlign: 'center' ,margin: 100, }}>
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div> : null}
        </div>
      </div>
    )
  }

  export default Users