const test = require("node:test");
const assert = require("node:assert/strict");

const {
  add,
  subtract,
  multiply,
  divide,
  calculate,
} = require("../calculator");

test("addition examples from the basic operations image", () => {
  assert.equal(add(2, 3), 5);
});

test("addition supports negative numbers and decimals", () => {
  assert.equal(add(-5, 2), -3);
  assert.equal(add(1.25, 2.75), 4);
  assert.equal(add(0, 0), 0);
});

test("subtraction examples from the basic operations image", () => {
  assert.equal(subtract(10, 4), 6);
});

test("subtraction supports negative results and decimals", () => {
  assert.equal(subtract(3, 10), -7);
  assert.equal(subtract(5.5, 1.25), 4.25);
  assert.equal(subtract(0, 0), 0);
});

test("multiplication examples from the basic operations image", () => {
  assert.equal(multiply(45, 2), 90);
});

test("multiplication supports negative values, decimals, and zero", () => {
  assert.equal(multiply(-4, 3), -12);
  assert.equal(multiply(-2, -5), 10);
  assert.equal(multiply(2.5, 4), 10);
  assert.equal(multiply(99, 0), 0);
});

test("division examples from the basic operations image", () => {
  assert.equal(divide(20, 5), 4);
});

test("division supports negative values and decimals", () => {
  assert.equal(divide(-10, 2), -5);
  assert.equal(divide(7.5, 2.5), 3);
  assert.equal(divide(1, 4), 0.25);
});

test("division throws a clear error when dividing by zero", () => {
  assert.throws(
    () => divide(20, 0),
    /Division by zero is not allowed/
  );
  assert.throws(
    () => divide(-20, 0),
    /Division by zero is not allowed/
  );
});

test("calculate dispatches symbol operations", () => {
  assert.equal(calculate("+", 2, 3), 5);
  assert.equal(calculate("-", 10, 4), 6);
  assert.equal(calculate("*", 45, 2), 90);
  assert.equal(calculate("/", 20, 5), 4);
});

test("calculate dispatches named operations case-insensitively", () => {
  assert.equal(calculate("add", 2, 3), 5);
  assert.equal(calculate("SUBTRACT", 10, 4), 6);
  assert.equal(calculate("Multiply", 45, 2), 90);
  assert.equal(calculate("DIVIDE", 20, 5), 4);
});

test("calculate rejects unsupported operations", () => {
  assert.throws(
    () => calculate("%", 10, 2),
    /Unsupported operation/
  );
  assert.throws(
    () => calculate(undefined, 10, 2),
    /Unsupported operation/
  );
});
