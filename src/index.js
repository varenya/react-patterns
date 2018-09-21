import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Tab, {
  TabHeadingContainer,
  TabContentWrapper,
  TabHeading,
  TabContent
} from "./components/tab";
import styled from "react-emotion";

const mockData = [
  {
    label: "Test 1",
    description: [<p key={1}>Hello</p>, <p key={2}>World</p>]
  },
  {
    label: "Test 2",
    description: [<p key={1}>first</p>, <p key={2}>second</p>]
  }
];

const ContentWrapper = styled("div")`
  background: #46a1de;
  padding: 40px;
  font-family: "Open Sans", sans-serif;
`;

ReactDOM.render(
  <ContentWrapper>
    <Tab tabData={mockData} />
  </ContentWrapper>,
  document.getElementById("root")
);
registerServiceWorker();
