import React, { Fragment } from "react";
import styled from "react-emotion";

const TabHeadingContainer = styled("ul")`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TabHeading = styled("li")`
  text-align: center;
  flex-grow: 1;
  padding : 20px;
  border-radius: 5px 5px 0 0;
  /* border-bottom: ${props => (props.active ? "5px solid papayawhip" : "")}; */
  transition : 0.5s transform ease-in-out;
  color: ${props => (props.active ? "#50555a" : "#fff")};
  background: ${props => (props.active ? "#fff" : "#46a1de")};
  cursor: pointer;
  &:hover {
    /* border-bottom: 5px solid #fff; */
  }
`;

const TabContent = styled("div")`
  margin: 0;
  padding: 0;
  border-radius: 5px;
  padding: 20px;
  background: #fff;
`;

class Tabs extends React.Component {
  state = { selectedTab: 0 };
  handleClick = index => {
    this.setState({ selectedTab: index });
  };
  render() {
    const { tabData } = this.props;
    const { selectedTab } = this.state;
    return (
      <Fragment>
        <TabHeadingContainer>
          {tabData.map(({ label }, index) => (
            <TabHeading
              key={index}
              active={index === selectedTab}
              className={index === selectedTab ? "active" : ""}
              onClick={this.handleClick.bind(null, index)}
            >
              {label}
            </TabHeading>
          ))}
        </TabHeadingContainer>
        <TabContent>{tabData[selectedTab].description}</TabContent>
      </Fragment>
    );
  }
}

export default Tabs;
