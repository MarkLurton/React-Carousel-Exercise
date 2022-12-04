import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test("it renders without crashing", () => {
  render(<Carousel />);
});

test("it matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();

  // move back in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
});

it("shouldn't show left arrow on first image", () => {
  const { queryByTestId } = render(<Carousel />);

  //expect right arrow to show, but not left
  expect(queryByTestId("right-arrow")).toBeInTheDocument();
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

it("should show both arrows on middle image", () => {
  const { queryByTestId } = render(<Carousel />);

  //Move carousel forward once
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  //expect right arrow to show, but not left
  expect(rightArrow).toBeInTheDocument();
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
});

it("shouldn't show right arrow on last image", () => {
  const { queryByTestId } = render(<Carousel />);

  //Move carousel forward twice
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  //expect right arrow to show, but not left
  expect(rightArrow).not.toBeInTheDocument();
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
});
