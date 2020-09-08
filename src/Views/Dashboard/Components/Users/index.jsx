import React, { useState, useEffect } from 'react';
import $ from 'jquery'
import M from 'materialize-css'
import { RDB } from '../../../../Firebase/database'
// import { useSelector } from 'react-redux';
import { useTable, useFilters, useSortBy, useGlobalFilter } from 'react-table'
import matchSorter from 'match-sorter'

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        document.getElementById('myPager').innerHTML = ''
        $('#myUserTable').pageMe({
          pagerSelector:'#myPager',
          activeColor: 'green',
          prevText:'Anterior',
          nextText:'Siguiente',
          showPrevNext:true,
          hidePageNumbers:false,
          perPage:50
        });
      }}
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
    onClose: () => {
      setFilter(undefined)
      // document.getElementById('myPager').innerHTML = ''
      // $('#myUserTable').pageMe({
      //   pagerSelector:'#myPager',
      //   activeColor: 'green',
      //   prevText:'Anterior',
      //   nextText:'Siguiente',
      //   showPrevNext:true,
      //   hidePageNumbers:false,
      //   perPage:50
      // });

    return null
  },
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

DateFilter.autoRemove = val => !val


// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
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
    <select
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
  )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id } }) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (

    <div
      style={{ display: 'flex' }}>
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val



const Users = () => {
  const [status, setStatus] = useState(false);

  const [data, setdata] = useState([{user_id: '-', phoneNumber: '-', registrationDate: '-', state: '-', }]);
  $.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            activeColor: 'blue',
            perPage: 10,
            showPrevNext: false,
            nextText: '',
            prevText: '',
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);

    //$this.addClass('initialized');

    var listElement = $this.find("tbody");
    var perPage = settings.perPage;
    var children = listElement.children();
    var pager = $('.pager');

    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }

    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }

    var numItems = children.length;
    var numPages = Math.ceil(numItems/perPage);

    $("#total_reg").html(numItems+" Entradas en total");

    pager.data("curr",0);

    if (settings.showPrevNext){
        $('<li><a href="#" class="prev_link" title="'+settings.prevText+'"><i class="material-icons">chevron_left</i></a></li>').appendTo(pager);
    }

    var curr = 0;
    while(numPages > curr && (settings.hidePageNumbers===false)){
        $('<li class="waves-effect"><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
        curr++;
    }

    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link"  title="'+settings.nextText+'"><i class="material-icons">chevron_right</i></a></li>').appendTo(pager);
    }

    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link').hide();
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }
  	pager.children().eq(1).addClass("active "+settings.activeColor);

    children.hide();
    children.slice(0, perPage).show();

    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;
        goTo(clickedPage,perPage);
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        return false;
    });

    function previous(){
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }

    function next(){
        var goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }

    function goTo(page){
      var startAt = page * perPage,
          endOn = startAt + perPage;
      children.css('display','none').slice(startAt, endOn).show();
      if (page>=1) pager.find('.prev_link').show()
      else pager.find('.prev_link').hide()

      if (page<(numPages-1)) pager.find('.next_link').show()
			else pager.find('.next_link').hide()
			
      pager.data("curr",page);
      pager.children().removeClass("active "+settings.activeColor);
      pager.children().eq(page+1).addClass("active "+settings.activeColor);
    }
	};
	useEffect(() => {
    let records = []; 
    RDB.ref('Users').once('value')
    .then( res => {
      let entries = res.val();
      Object.keys(entries).forEach(key =>{
        records.push({ 
          user_id: entries[key].user_id,
          phoneNumber: entries[key].phoneNumber,
          registrationDate: new Date(entries[key].registrationDate).toLocaleDateString(),
          state: entries[key].state
        })
      }
        )
        setStatus(true);
        setdata(records)
        document.getElementById('myPager').innerHTML = ''
        $('#myUserTable').pageMe({
          pagerSelector:'#myPager',
          activeColor: 'green',
          prevText:'Anterior',
          nextText:'Siguiente',
          showPrevNext:true,
          hidePageNumbers:false,
          perPage:50
        });
        return null
      })
      .catch(err => console.log("Manual Error", err))
    }, [status])
    // data = [{user_id: '-', phoneNumber: '-', registrationDate: '-'}];

    
	const downloadCSV = (csv, filename) => {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
	}
	const exportTableToCSV = filename => {
    var csv = [];
    var rows = document.querySelectorAll("#myUserTable tr");
    
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");  
      for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);        
      csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
  }
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
      { Header: 'User Id', accessor: 'user_id' }, // accessor is the "key" in the data
      { Header: 'Phone Number', accessor: 'phoneNumber' },
      { Header: 'Date', accessor: 'registrationDate', Filter: DateFilter },
      { Header: 'State', accessor: 'state'}
    ],[])  
  const { 
    getTableProps,
    getTableBodyProps, 
    prepareRow, 
    rows, 
    state, 
    headerGroups, 
    visibleColumns, 
    setGlobalFilter,
    preGlobalFilteredRows } = useTable({ data, columns, defaultColumn, filterTypes }, useFilters, useGlobalFilter, useSortBy )
    return (
      <div className="card" style={{padding: 10, borderRadius: 10}}>
        <div className='card-content'>
        	<div style={{display: 'flex'}}>
			  		<h5 style={{flex:'1', textAlign: 'left', marginTop: 5}} >
			  			Results
			  		</h5>
			  		<div>
			  			<button disabled={data.length < 1 || !status} className='btn' onClick={() => exportTableToCSV('QueryRecords.csv')}>
			  				<i className='material-icons right' style={{marginLeft: 0}}>file_download</i>
			  				<span className='hide-on-med-and-down' style={{marginRight: 10}}>Download CSV</span>
			  			</button>
			  		</div>
			  	</div>
          <table className='responsive-table highlight' {...getTableProps()} id="myUserTable" style={{overflow: 'scroll'}} >
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
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} >
                    {console.log(row)}
                    <td {...row.cells[0].getCellProps()}>{row.cells[0].render('Cell')}</td>
                    <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
                    <td {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>
                    <td {...row.cells[3].getCellProps()}>{row.cells[3].render('Cell')}</td>      
                  </tr>
                )}
              )}
            </tbody>
          </table>
          <div className="col m12 center">
            <ul className="pagination pager" id="myPager"></ul>
          </div>
        </div>
      </div>
    )
  }

  export default Users