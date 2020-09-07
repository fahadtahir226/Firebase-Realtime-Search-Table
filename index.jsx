import React, { useState, useEffect } from 'react';
import $ from 'jquery'
import { useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table'
import { useDispatch } from 'react-redux';
import { newCurrentUserInfo } from '../../../../../Actions/index'

const QueryResults = async () => {
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
		document.getElementById('myPager').innerHTML = ''
		$('#myUserTable').pageMe({
		  pagerSelector:'#myPager',
		  activeColor: 'green',
		  prevText:'Anterior',
		  nextText:'Siguiente',
		  showPrevNext:true,
		  hidePageNumbers:false,
		  perPage:10
		});

		})
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
  const data = await db.ref('Users').on('value').then(res => res.val())
  const columns = React.useMemo(() => [
      { Header: 'User Name', accessor: 'user_id' }, // accessor is the "key" in the data
      { Header: 'Phone Number', accessor: 'phoneNumber' },
      { Header: 'Date', accessor: 'registrationDate' },
    ],
    []
  )  
  const { 
    getTableProps,
    getTableBodyProps, 
    prepareRow, 
    rows, 
    state, 
    headerGroups, 
    visibleColumns, 
    setGlobalFilter,
    preGlobalFilteredRows } = useTable({ data, columns, defaultColumn, filterTypes }, useSortBy, useFilters, useGlobalFilter )
  
    return (
      <>
      	<div style={{display: 'flex'}}>
					<h5 style={{flex:'1', textAlign: 'left', marginTop: 5}} >
						Results
					</h5>
					<div>
						<button disabled={data.length < 1} className='btn' onClick={() => exportTableToCSV('QueryRecords.csv')}>
							<i className='material-icons right' style={{marginLeft: 0}}>file_download</i>
							<span className='hide-on-med-and-down' style={{marginRight: 10}}>Download CSV</span>
						</button>
					</div>
				</div>
        <table {...getTableProps()} id="myUserTable" style={{overflow: 'scroll'}} >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map(column => (
               <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                   <span>
                     {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                   </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
              (row, i) => {
                // console.log(row)
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}  onClick={() => dispatch(newCurrentUserInfo(row.original))}>
                    {/* {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })} */}
                    <td {...row.cells[0].getCellProps()}>{row.cells[0].render('Cell')}</td>
                    <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
                    <td {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>
                    <td {...row.cells[3].getCellProps()}>{row.cells[3].render('Cell')}</td>
                    <td {...row.cells[4].getCellProps()}>{row.cells[4].render('Cell')}</td>
                    <td {...row.cells[5].getCellProps()}>{row.cells[5].render('Cell')}</td>
                    <td colSpan={4} {...row.cells[6].getCellProps()}>{row.cells[6].render('Cell')}</td>

                  </tr>
                )}
            )}
          </tbody>
        </table>
        <div className="col m12 center">
          <ul className="pagination pager" id="myPager"></ul>
        </div>
      </>
      
    )
  }

  export default QueryResults