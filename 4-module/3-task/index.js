function highlight(table) {
  const tableBody = table.children[1];

  const cellsTableHead = table.tHead.children[0].cells;
  const rowsTableBody = tableBody.rows;

  let indexCellAge;
  let indexCellStatus;
  let indexCellGender;

  for (let cell of cellsTableHead) {
    if (cell.textContent === "Age") {
      indexCellAge = cell.cellIndex;
    } else if (cell.textContent === "Gender") {
      indexCellGender = cell.cellIndex;
    } else if (cell.textContent === "Status") {
      indexCellStatus = cell.cellIndex;
    }
  }

  for (let row of rowsTableBody) {
    const isAvailable = row.cells[indexCellStatus].dataset.available;
    const isMale = row.cells[indexCellGender].textContent === "m";
    const isAge = row.cells[indexCellAge].textContent <= 18;

    if (isAvailable === undefined) {
      row.hidden = true;
    } else if (isAvailable === "true") {
      row.classList.add("available");
    } else {
      row.classList.add("unavailable");
    }

    if (isMale) {
      row.classList.add("male");
    } else {
      row.classList.add("female");
    }

    if (isAge) {
      row.style.textDecoration = "line-through";
    }
  }
}
