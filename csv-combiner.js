/*
*   Hello! 
*   This program was written in JavaScript and tested using NodeJs
*   Enjoy!
*/

// Include the readline module for reading datastreams (used in accepting user input through console)
const readline = require('readline');
// Include the fs module for file operations (used in writing to and creating files)
const fs = require('fs');

// Holds the file type
var fileType = ".csv";
// Holds the folder path that contains the .csv files to be parsed
var folderName = "fixtures/";
// Holds the path for the new or previously created .csv file
var outputFile = "output-csv/output.csv";
// Array variable to store the read .csv file later in the code
var rows = [];

var check

// try to see if the file has been created yet, if it has continue your day
try {
    fs.readFileSync(outputFile, 'utf-8').length == 0;
} 
// catch to create the file if the file has not been created
catch {
    fs.writeFile(outputFile, "", {flags: 'a'}, function(){});
}

// Function to check if a value is empty, in this case checking the array values for empty elements 
function checkEmpty(value)
{
    // If the passed value has contents, then add it to the new array using .filter()
    if (value != "")
    {
        return value;
    }
}


// Creating an instance (userInput) of the class that can input and output data, from and to the user (using it to ask for user input files and accept those files)
const userInput = readline.createInterface
(
    {
        // Setting the parameters for the user interface 
        input: process.stdin,
        output: process.stdout,
    }
);


// Asks for and accepts user input, and stores the user input in the variable fileName
// Also, adds begins the parsing function with the passed variable fileName in order to output and parse the .csv files
userInput.question("\nPlease enter the file name(s) in the following format: \n\n \"clothing accessories ... \"\n\n", function (fileName)
{
    // Just adding some space to make the printed statements more legible
    console.log("\n");

    // Stores the total number of file(s) the user input 
    var numOfFiles = fileName.split(" ").length;
    
    // Stores the filenames of the user input 
    var header = fileName.split(" ");     

    // for loop to loop based on the total amount of user input file(s)
    for (var l = 0; l < numOfFiles; l++)
    {
        // Adding the folder and file names to the file type to create the path for each file
        var fullFileName = folderName + header[l] + fileType;
        
        // Takes the fullFileName and reads the text in it
        // Also, checks the array elements for empty elements and only stores the elements with contents in them
        // Also, splits the text into one line per index (each line is separated by a "\r\n")
        // Then stores the read text into the rows array
        rows = fs.readFileSync(fullFileName, 'utf-8').split("\r\n").filter(checkEmpty);
        
        // Stores the filename and filetype plus some punctuation to help with printing the additional column (filename)
        var halfFileName = ",\"" + header[l] + fileType + "\"";

        // Creates an instance of the class that can perform file operations (used for writing at the end of the .csv output file)
        var writer = fs.createWriteStream(outputFile, 
        {
            // Sets the .csv file to be written at the end of the file
            flags: 'a'
        });
        
        // Checks if the .csv output file has any content (to avoid writing the column titles again)
        if (fs.readFileSync(outputFile, 'utf8').length == 0)
        {
            // Writes the column titles to the .csv output file if they haven't been written already
            writer.write(rows[0] + "," + "\"filename\"\r\n");
        }
        
        // Checks if the column titles have already been printed to the console
        if (l == 0)
        {
            // Prints the column titles to the console if they haven't been printed already
            console.log(rows[0] + "," + "\"filename\"" + "\r\n");
        }

        // for loop to loop the length of rows
        for (var i = 1; i < rows.length; i++)
        {
            // Writes to the .csv output file the row read from the user input .csv file, the name of the file, and returns to the next line
            writer.write(rows[i] + halfFileName + "\r\n");
            // Prints to the console the row read from the user input .csv file, the name of the file, and returns to the next line
            console.log(rows[i] + halfFileName + "\r\n");
        }
    }
});

