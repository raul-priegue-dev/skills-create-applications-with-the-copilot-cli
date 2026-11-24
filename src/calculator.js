/**
 * Basic calculator operations supported by this CLI:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 */

function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

const operations = {
  "+": add,
  add: add,
  "-": subtract,
  subtract: subtract,
  "*": multiply,
  multiply: multiply,
  "/": divide,
  divide: divide,
};

function parseNumber(value, name) {
  const number = Number(value);

  if (value === undefined || value.trim() === "" || !Number.isFinite(number)) {
    throw new Error(`${name} must be a valid number.`);
  }

  return number;
}

function calculate(operation, left, right) {
  if (typeof operation !== "string") {
    throw new Error(
      'Unsupported operation. Use one of: addition (+), subtraction (-), multiplication (*), or division (/).'
    );
  }

  const operator = operations[operation.toLowerCase()];

  if (!operator) {
    throw new Error(
      'Unsupported operation. Use one of: addition (+), subtraction (-), multiplication (*), or division (/).'
    );
  }

  return operator(left, right);
}

function printUsage() {
  console.log(
    "Usage: node src/calculator.js <operation> <number> <number>"
  );
  console.log(
    "       node src/calculator.js <number> <operation> <number>"
  );
  console.log("Operations: + (add), - (subtract), * (multiply), / (divide)");
  console.log("Examples:");
  console.log("  node src/calculator.js add 7 3");
  console.log("  node src/calculator.js '*' 7 3");
  console.log("  node src/calculator.js 7 + 3");
}

function runCli(args) {
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printUsage();
    return;
  }

  if (args.length !== 3) {
    printUsage();
    throw new Error("Expected an operation and exactly two numbers.");
  }

  const [first, second, third] = args;
  const imageStyle = second && ["+", "-", "*", "/"].includes(second);
  const operation = imageStyle ? second : first;
  const leftValue = imageStyle ? first : second;
  const rightValue = imageStyle ? third : third;
  const left = parseNumber(leftValue, "Left operand");
  const right = parseNumber(rightValue, "Right operand");

  console.log(calculate(operation, left, right));
}

if (require.main === module) {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  calculate,
};
