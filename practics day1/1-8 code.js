// Taking input marks
var marks = prompt("Enter your marks:");

// Convert the input to a number type
marks = Number(marks);

// Determine the grade
var grade;

if (marks >= 90) {
  grade = "A+";
} else if (marks >= 80) {
  grade = "A";
} else if (marks >= 70) {
  grade = "B";
} else if (marks >= 60) {
  grade = "C";
} else if (marks >= 50) {
  grade = "D";
} else {
  grade = "F";
}

console.log("Your grade is: " + grade);
