import React, { useState, useEffect } from 'react';
import M from 'materialize-css'
import { exportTableToCSV } from '../CSV'
import { RDB } from '../../../../Firebase/database'
// import { useSelector } from 'react-redux';
import { useTable, useFilters, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import matchSorter from 'match-sorter'


// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      style={{marginBottom: 6}}
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder="Search..."
    />
  )
}

function DateFilter({column: { filterValue, preFilteredRows, setFilter }}) {
  // const count = preFilteredRows.length
  var elems = document.querySelectorAll('.trandatepicker'); 
  M.Datepicker.init(elems, {
    onSelect: date => {
        console.log(date);
        setFilter(date.toLocaleDateString() || undefined );
        document.getElementsByTagName('body')[0].style.overflow = 'scroll';
       return 
      },
    onClose: () => {
      setFilter(undefined);
      document.getElementsByTagName('body')[0].style.overflow = 'scroll';
    },
    maxDate: new Date(),
  });

  return (
    <input
      style={{marginBottom: 6}}
      className='trandatepicker'
      type='text'
      onChange = {e => {
        setFilter(e.target.value || undefined)
        console.log("Date Changed: ", e);
      }}
      defaultValue={ filterValue || ''}
      placeholder='Search...'
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
        style={{border: 'none', marginBottom: 6, borderBottom: '1px solid #9e9e9e'}}
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

function filterExact(rows, id, filterValue) {
  return rows.filter(row => row.values[id] == filterValue)
}
DateFilter.autoRemove = val => !val
filterExact.autoRemove = val => typeof val !== 'number'

function NumberColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <div style={{ display: 'flex' }}>
      <input
        value={filterValue || undefined}
        type="number"
        onChange={e => {setFilter(e.target.value ? parseInt(e.target.value, 10): undefined)}}
        placeholder="Search..."
        style={{ width: '70px', marginRight: '0.5rem' }}
      />
    </div>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
fuzzyTextFilterFn.autoRemove = val => !val



const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <form action="#">
          {/* <p> */}
            <label>
              <input className="filled-in" type="checkbox" ref={resolvedRef} {...rest} />
              <span></span>
            </label>
          {/* </p> */}
        </form>
    )
  }
)

const Transactions = () => {
  const [status, setStatus] = useState(false);

  const [data, setdata] = useState([]);

	useEffect(() => {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);   
    
    let records = []; 
    RDB.ref('Transactions').once('value')
    .then( res => {
      let entries = res.val();
      Object.keys(entries).forEach(key =>{
        records.unshift({ 
          name: entries[key].name,
          amount: entries[key].amount,
          discountedAmount: entries[key].discountedAmount,
          orderDate: entries[key].orderDate ? new Date(entries[key].orderDate).toLocaleDateString(): '',
          orderTime: entries[key].orderDate ? new Date(entries[key].orderDate).toLocaleTimeString(): '',
          paymentMethod: entries[key].paymentMethod,
          phoneNumber: entries[key].phoneNumber,
          status: entries[key].status ? 'VERIFIED' : 'PENDING',
          key: key || '-',
        })
      })
      setStatus(true);
      setdata(records)
      selectedFlatRows.map(d => console.log(d.original))
      
    })
    .catch(err => console.log("Manual Error", err))
    }, [status])


  const filterTypes = React.useMemo(() => ({
    // Add a new fuzzyTextFilterFn filter type.
    fuzzyText: fuzzyTextFilterFn,
    // Or, override the default text filter to use
    // "startWith"
    text: (rows, id, filterValue) => rows.filter(row => row.values[id] !== undefined ? 
      String(row.values[id]).toLowerCase().startsWith(String(filterValue).toLowerCase())
      : true )
  }),[])
  const defaultColumn = React.useMemo(() => ({Filter: DefaultColumnFilter}),[])
  // const dispatch = useDispatch();
  
  const columns = React.useMemo(() => [
    { Header: 'NAME', accessor: 'name' },
    { Header: 'AMOUNT', accessor: 'amount', Filter: NumberColumnFilter, filter: filterExact },
    { Header: 'DISCOUNT', accessor: 'discountedAmount', Filter: NumberColumnFilter, filter: filterExact},
    { Header: 'Date', accessor: 'orderDate', Filter: DateFilter },
    { Header: 'PAYMENT', accessor: 'paymentMethod' },
    { Header: 'PHONE', accessor: 'phoneNumber' },
    { Header: 'STATUS', accessor: 'status', Filter: SelectColumnFilter, filter: 'includes'},
    { Header: '', accessor: 'key'},
    { accessor: 'orderTime' },
    ],[]) 

  const deleteItem = key => {
    console.log(key);
    RDB.ref(`Transactions/${key}`).remove()
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

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
    selectedFlatRows,
    state: { selectedRowIds, pageIndex, pageSize },
    } = useTable(
      { data, columns, initialState: { pageIndex: 0, pageSize: 25  }, defaultColumn, filterTypes},
      useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect,
        hooks => {
          hooks.visibleColumns.push(columns => [
            // Let's make a column for selection
            {
              id: 'selection',
              // The header can use the table's getToggleAllRowsSelectedProps method
              // to render a checkbox
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
          ])
        }
      )
      // } )
    return (
      <div className="card" style={{padding: 10, borderRadius: 10}}>
        <div className='card-content' style={{overflowX: 'scroll'}}>
        	<div style={{display: 'flex'}}>
			  		<h5 style={{flex:'1', textAlign: 'left', marginTop: 5}} >
			  			RESULTS
			  		</h5>
			  		<div>
              <button disabled={data.length < 1 || !status} className='btn' onClick={() => exportTableToCSV('Transactions.csv', rows, ['Status', 'Name', 'Amount', 'Discounted Amount', 'Order Date', 'Payment', 'Phone Number', 'Transaction Id'])}>
			  				<i className='material-icons right' style={{marginLeft: 0}}>file_download</i>
			  				<span className='hide-on-med-and-down' style={{marginRight: 10}}>Download CSV</span>
			  			</button>
			  		</div>
			  	</div>
          <table {...getTableProps()} id="myTranTable" className='highlight' style={{overflow: 'scroll', display: status ? null: 'none'}} >
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} >
                  {headerGroup.headers.length ?
                  <>

                    <th {...headerGroup.headers[0].getHeaderProps(
                    headerGroup.headers[0].getSortByToggleProps()
                     )}> 
                     {headerGroup.headers[0].render('Header')}
                      <span> {headerGroup.headers[0].isSorted ? (headerGroup.headers[0].isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      <div>{headerGroup.headers[0].canFilter ? headerGroup.headers[0].render('Filter') : null}</div>
                    </th>
                    <th {...headerGroup.headers[1].getHeaderProps(
                    // headerGroup.headers[1].getSortByToggleProps()
                     )}> {headerGroup.headers[1].render('Header')}
                      <span> {headerGroup.headers[1].isSorted ? (headerGroup.headers[1].isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      <div>{headerGroup.headers[1].canFilter ? headerGroup.headers[1].render('Filter') : null}</div>
                    </th>
                    <th {...headerGroup.headers[2].getHeaderProps(
                    // headerGroup.headers[2].getSortByToggleProps()
                     )}> {headerGroup.headers[2].render('Header')}
                      <span> {headerGroup.headers[2].isSorted ? (headerGroup.headers[2].isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      <div>{headerGroup.headers[2].canFilter ? headerGroup.headers[2].render('Filter') : null}</div>
                    </th>
                    <th {...headerGroup.headers[3].getHeaderProps(
                    // headerGroup.headers[3].getSortByToggleProps()
                     )}> {headerGroup.headers[3].render('Header')}
                      <span> {headerGroup.headers[3].isSorted ? (headerGroup.headers[3].isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      <div>{headerGroup.headers[3].canFilter ? headerGroup.headers[3].render('Filter') : null}</div>
                    </th>
                    <th colSpan='2' {...headerGroup.headers[4].getHeaderProps(
                    // headerGroup.headers[4].getSortByToggleProps()
                     )}> {headerGroup.headers[4].render('Header')}
                      <span> {headerGroup.headers[4].isSorted ? (headerGroup.headers[4].isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      <div>{headerGroup.headers[4].canFilter ? headerGroup.headers[4].render('Filter') : null}</div>
                    </th>
                    <th {...headerGroup.headers[5].getHeaderProps(
                    // headerGroup.headers[5].getSortByToggleProps()
                     )}> {headerGroup.headers[5].render('Header')}
                      <span> {headerGroup.headers[5].isSorted ? (headerGroup.headers[5].isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      <div>{headerGroup.headers[5].canFilter ? headerGroup.headers[5].render('Filter') : null}</div>
                    </th>
                    <th></th>
                    <th style={{width: 120}} {...headerGroup.headers[6].getHeaderProps(
                    // headerGroup.headers[6].getSortByToggleProps()
                     )}> {headerGroup.headers[6].render('Header')}
                      <span> {headerGroup.headers[6].isSorted ? (headerGroup.headers[6].isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      <div>{headerGroup.headers[6].canFilter ? headerGroup.headers[6].render('Filter') : null}</div>
                    </th>

                    <th style={{width: 120}} {...headerGroup.headers[7].getHeaderProps(
                    // headerGroup.headers[7].getSortByToggleProps()
                     )}> {headerGroup.headers[7].render('Header')}
                      <span> {headerGroup.headers[7].isSorted ? (headerGroup.headers[7].isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      <div>{headerGroup.headers[7].canFilter ? headerGroup.headers[7].render('Filter') : null}</div>
                    </th>

                    <th></th>
                  </>
                  : null}
                </tr>
              ))}
            </thead>
                
            <tbody {...getTableBodyProps()}>
              {page.map(
                (row, i) => {
                  prepareRow(row);
                  // console.log(row.);
                  return (
                    <tr {...row.getRowProps()}   
                      // onClick={() => dispatch(replaceQuery(row.original))}
                    >
                      {/* <td {...row.cells[0].getCellProps()}>
                        {row.cells[0].value ? 
                          <i className='material-icons'>check_circle</i> : <i className='material-icons'>close</i>
                        }
                      </td> */}
                      <td {...row.cells[0].getCellProps()}>{row.cells[0].render('Cell')}</td>
                      <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
                      <td {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>      
                      <td {...row.cells[3].getCellProps()}>{row.cells[3].render('Cell')}</td>   
                      <td {...row.cells[4].getCellProps()}>
                        {row.cells[4].render('Cell')}  {' '}                      
                        {row.cells[9].render('Cell')}
                      </td>
                      <td colSpan='2' {...row.cells[5].getCellProps()}>{row.cells[5].render('Cell')}</td>
                      <td {...row.cells[6].getCellProps()}>{row.cells[6].render('Cell')}</td>
                      <td {...row.cells[7].getCellProps()}>
                      {row.cells[7].value === 'VERIFIED' ?
                        <span className="new badge green" data-badge-caption={row.cells[7].value}></span> :
                        <span className="new badge red" data-badge-caption={row.cells[7].value}></span>
                      }  
                      </td>

                      <td {...row.cells[8].getCellProps()}>
                        {row.cells[8].value !== '-' ? <i className='material-icons' onClick={()=> deleteItem(row.values.key) } >delete</i> : ""}
                      </td>
                  </tr>
                )}
              )} 
            </tbody>
          </table>
          <div className="pagination container-fluid" style={{display: status ? null: 'none'}}>
            <div className='row' >
              <div className='col' style={{marginTop: 25, paddingLeft: 0}}>
                <button className="btn" onClick={() => gotoPage(0)} style={{paddingLeft: 8, paddingRight: 8}}
                  disabled={!canPreviousPage}> <i className="material-icons " >first_page</i></button>{' '}
                <button className="btn" onClick={() => previousPage()} style={{paddingLeft: 8, paddingRight: 8}}
                  disabled={!canPreviousPage}> <i className="material-icons" >keyboard_arrow_left</i></button>{' '}
                <button className="btn" onClick={() => nextPage()} style={{paddingLeft: 8, paddingRight: 8}}
                  disabled={!canNextPage}> <i className="material-icons" >keyboard_arrow_right</i></button>{' '}
                <button className="btn" onClick={() => gotoPage(pageCount - 1)} style={{paddingLeft: 8, paddingRight: 8}}
                  disabled={!canNextPage}> <i className="material-icons" >last_page</i></button>{' '}

                <span>Page{' '}<strong>  {pageIndex + 1} of {pageOptions.length}</strong>{' '}</span>
              </div>
              <div className='col s6 m2 l2 right' >
                <label htmlFor='tranpageNumber' >Go to page</label>
                <input id='tranpageNumber' type="number" defaultValue={pageIndex + 1}
                  onChange={e => gotoPage(e.target.value ? Number(e.target.value) - 1 : 0)}/>
              </div>
              <div className='col s6 m3 l2 right' style={{paddingRight: 0}}>
                <label htmlFor='tranpagefilter' >Rows Per Page</label>
                <select id='tranpagefilter' value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {/* <option value={5}>Show 5</option> */}
                  {[25, 50, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>{pageSize} </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          {!status ?
          <div style={{textAlign: "center"}} >
            <div className="preloader-wrapper big active center" style={{ margin: 100, }}>
              <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div> : null}
        </div>
      </div>
    )
  }

  export default Transactions