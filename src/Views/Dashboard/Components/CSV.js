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
  export const exportTableToCSV = (filename, rows, header) => {
    console.log(rows)
    
    var csv = rows.map(row => Object.values(row.original).join(","));
    csv.unshift(header)

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
  }