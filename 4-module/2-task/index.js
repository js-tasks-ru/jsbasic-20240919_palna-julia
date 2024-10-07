function makeDiagonalRed(table) {
  const listRows = table.rows;

  for (let row of listRows) {
    const rowIndex = row.rowIndex;
    const cells = row.cells;

    for (let cell of cells) {
      const cellIndex = cell.cellIndex;

      if (rowIndex === cellIndex) {
        cell.style.backgroundColor = "red";
      }
    }
  }
}
