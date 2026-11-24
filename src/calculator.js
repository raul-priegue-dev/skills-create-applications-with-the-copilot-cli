/**
 * Basic calculator operations supported by this CLI:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * - Modulo (%)
 * - Exponentiation (**)
 * - Square root
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

function modulo(left, right) {
  if (right === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(number) {
  if (number < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(number);
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
  "%": modulo,
  modulo: modulo,
  "**": power,
  "^": power,
  power: power,
  sqrt: squareRoot,
  squareroot: squareRoot,
};

const binaryOperators = ["+", "-", "*", "/", "%", "**", "^"];
const unaryOperations = ["sqrt", "squareroot"];

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
      "Unsupported operation. Use add, subtract, multiply, divide, modulo, power, or squareRoot."
    );
  }

  const operator = operations[operation.toLowerCase()];

  if (!operator) {
    throw new Error(
      "Unsupported operation. Use add, subtract, multiply, divide, modulo, power, or squareRoot."
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
  console.log("       node src/calculator.js sqrt <number>");
  console.log(
    "Operations: + (add), - (subtract), * (multiply), / (divide), % (modulo), ** (power), sqrt"
  );
  console.log("Examples:");
  console.log("  node src/calculator.js add 7 3");
  console.log("  node src/calculator.js '*' 7 3");
  console.log("  node src/calculator.js 7 + 3");
  console.log("  node src/calculator.js modulo 7 3");
  console.log("  node src/calculator.js power 2 3");
  console.log("  node src/calculator.js sqrt 9");
}

function runCli(args) {
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printUsage();
    return;
  }

  if (args.length === 2) {
    const [first, second] = args;
    const operation = unaryOperations.includes(first.toLowerCase())
      ? first
      : unaryOperations.includes(second.toLowerCase())
        ? second
        : null;

    if (!operation) {
      printUsage();
      throw new Error("Expected an operation and exactly two numbers.");
    }

    const value = operation === first ? second : first;
    console.log(calculate(operation, parseNumber(value, "Operand")));
    return;
  }

  if (args.length !== 3) {
    printUsage();
    throw new Error("Expected an operation and exactly two numbers.");
  }

  const [first, second, third] = args;
  const imageStyle = second && binaryOperators.includes(second);
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
  modulo,
  power,
  squareRoot,
  calculate,
};
