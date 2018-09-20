import React from "react";
import Tabs from "./Tab";
import { render, fireEvent } from "react-testing-library";

describe("Tabs", () => {
  let mockData = [];
  beforeEach(() => {
    mockData = [
      {
        label: "Test 1",
        description: [<p key={1}>first 1</p>, <p key={2}>first 2</p>]
      },
      {
        label: "Test 2",
        description: [<p key={1}>second 1</p>, <p key={2}>second 2</p>]
      }
    ];
  });
  it("should show all the tabs", () => {
    const { getByText, queryByText, queryAllByText } = render(
      <Tabs tabData={mockData} />
    );
    expect(queryAllByText(/Test/)).toHaveLength(2);
  });
  it("should show the first tab content by default", () => {
    const { getByText, queryByText, queryAllByText } = render(
      <Tabs tabData={mockData} />
    );
    expect(queryAllByText(/Test/)).toHaveLength(2);
    expect(queryAllByText(/first/)).toHaveLength(2);
    expect(queryAllByText(/second/)).toHaveLength(0);
  });

  it("should show the content of the second tab when selected on it", () => {
    const { getByText, queryByText, queryAllByText } = render(
      <Tabs tabData={mockData} />
    );
    expect(queryAllByText(/Test/)).toHaveLength(2);
    const secondTab = getByText("Test 2");
    expect(queryAllByText(/Test/)).toHaveLength(2);
    expect(queryAllByText(/first/)).toHaveLength(2);
    expect(queryAllByText(/second/)).toHaveLength(0);
    fireEvent.click(secondTab);
    expect(queryAllByText(/Test/)).toHaveLength(2);
    expect(queryAllByText(/first/)).toHaveLength(0);
    expect(queryAllByText(/second/)).toHaveLength(2);
  });

  it("tab heading should become active when clicked on it", () => {
    const { getByText, queryByText, queryAllByText } = render(
      <Tabs tabData={mockData} />
    );

    const firstTab = getByText("Test 1");
    const secondTab = getByText("Test 2");

    expect(firstTab).toHaveClass("active");
    expect(secondTab).not.toHaveClass("active");

    fireEvent.click(secondTab);

    expect(firstTab).not.toHaveClass("active");
    expect(secondTab).toHaveClass("active");
  });
});
