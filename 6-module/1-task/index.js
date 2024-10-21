/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
  }

  delete = (e) => {
    const isButton = e.target.closest("button");

    if (isButton) {
      const tableRow = e.target.closest("tbody tr");

      //1 вариант решения
      tableRow.parentElement.removeChild(tableRow);

      //2 вариант решения
      // const id = tableRow.id;
      // const newRows = this.getFilterElements(this.rows, id);
      // this.rows = newRows;
      // this.clearTable();
      // this.createTableRows();
    }
  };

  render = () => {
    this.elem = document.createElement("table");
    const tablebody = document.createElement("tbody");
    this.elem.append(tablebody);

    this.createHeader();
    this.createTableRows();

    this.elem.addEventListener("click", this.delete);
  };

  createHeader = () => {
    const tablehead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for (let title of Object.keys(this.rows[0])) {
      const th = document.createElement("th");
      th.textContent = title;
      headerRow.append(th);
    }

    tablehead.append(headerRow);
    this.elem.append(tablehead);
  };

  createTableRows = () => {
    for (let key in this.rows) {
      this.createRow(this.rows[key], key);
    }
  };

  createRow = (data, key) => {
    const tablebody = this.elem.querySelector("tbody");
    const tableRow = document.createElement("tr");
    tableRow.id = key;

    for (let prop in data) {
      this.createData(data[prop], tableRow);
    }

    this.createButton(tableRow, key);
    tablebody.append(tableRow);
  };

  createData = (data, row) => {
    const tableData = document.createElement("td");
    tableData.textContent = data;
    row.append(tableData);
  };

  createButton = (row) => {
    const button = document.createElement("button");
    button.textContent = "X";
    row.append(button);
  };

  // 2 вариант решения
  // clearTable = () => {
  //   const table = this.elem.querySelector("tbody");

  //   while (table.rows.length) {
  //     table.deleteRow(0);
  //   }
  // };

  // getFilterElements = (obj, value) => {
  //   return obj.filter((item, index) => index != value);
  // };
}
