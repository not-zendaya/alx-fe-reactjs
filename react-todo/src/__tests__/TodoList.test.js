import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders TodoList with initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Practice Testing")).toBeInTheDocument();
});

test("adds a new todo item", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Add new todo");
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Write tests" } });
  fireEvent.click(addButton);

  expect(screen.getByText("Write tests")).toBeInTheDocument();
});

test("toggles a todo item completion", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  fireEvent.click(todo);
  expect(todo).toHaveClass("line-through");
});

test("deletes a todo item", () => {
  render(<TodoList />);
  const deleteButton = screen.getAllByText("Delete")[0];
  fireEvent.click(deleteButton);
  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
