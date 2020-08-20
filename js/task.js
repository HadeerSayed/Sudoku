
/* put constant numbers inside the table*/
var cell = document.getElementsByName("cell");
var numbers = ["5,9,,,,,7,8,,1,52,,,3,84,,1,9,7,,,,24,,,5,39,8,21,,,,4,,,3,2,,5,4,,,,7,,1,7,9,,8,"]
for (i = 0; i < 81; i++) {
    if (numbers[0][i] != ',') {
        cell[i].value = numbers[0][i];
        cell[i].disabled = true;
    }
}


/*start sudoko function to check winner or loser*/
function result() {
    var tableRow = "";
    var allRows = [];
    var check = 1;
    /* loop on table cells and put ist value in cellValue*/
    for (i = 0; i < cell.length; i++) {
        cellValue = cell[i].value;

        /* check if there are empty cell*/

        if (!cellValue) {
            document.getElementById("finalResult").innerHTML = "Please Fill All Cells";
            return;
        }
        /* check if user enter number not equal 1 and 9 or between them*/
        else if (cellValue > 9 || cellValue < 1) {
            document.getElementById("finalResult").innerHTML = "Please Enter Number From 1 to 9";
            return;
        }

        /* concatenate all cells Value of one row in tableRow string*/
        tableRow += cellValue;

        /* push tableRow in allRows array that will contain all rows in the table*/
        if (tableRow.length == 9) {
            allRows.push(tableRow);
            tableRow = "";
        }
    }

    /* start loop on smaller tables*/
    for (row = 0; row < 9; row += 3) {
        for (col = 0; col < 9; col += 3) {
            /* create new set and start loop on rows and coloumns inside smaller tables and save its cell values in the set*/
            var innerTablesSet = new Set();
            for (inner_row = 0; inner_row < 3; inner_row++) {
                for (inner_col = 0; inner_col < 3; inner_col++) {
                    innerTablesSet.add(allRows[row + inner_row][col + inner_col]);
                }
            }
            /* check if set not equal 9 thats mean there are more then cell have the same value then made check value =0 */
            if (innerTablesSet.size != 9) {
                check = 0;
                break;
            }
        }
    }
    /* check if check value equal 1 start loop on all coloumns*/
    if (check == 1) {
        for (col = 0; col < 9; col++) {
            /* create new set and start loop on rows of this coloumn and save it in this set*/
            var insideColAndRowSet = new Set();
            for (row = 0; row < 9; row++) {
                insideColAndRowSet.add(allRows[row][col]);
            }
            /* check if set not equal 9 thats mean there are more then cell have the same value then made check value =0 */
            if (insideColAndRowSet.size != 9) {
                check = 0;
                break;
            }
        }
    }

    /* check if check value equal 1 start loop on all rows*/

    if (check == 1) {
        for (row = 0; row < 9; row++) {
            /* create new set and start loop on coloumn of this row and save it in this set*/
            var insideColAndRowSet = new Set();
            for (col = 0; col < 9; col++) {
                insideColAndRowSet.add(allRows[row][col]);
            }
            /* check if set not equal 9 thats mean there are more then cell have the same value then made check value =0 */
            if (insideColAndRowSet.size != 9) {
                check = 0;
                break;
            }
        }
    }
    /* if check value =1 then Winner*/
    if (check == 1) {
        document.getElementById("finalResult").innerHTML = "Winner";
    }
    /* else loser*/
    else {
        document.getElementById("finalResult").innerHTML = "Loser";
    }
}
