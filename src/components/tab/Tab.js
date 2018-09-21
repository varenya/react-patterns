import React, { Fragment } from "react";
import styled from "react-emotion";

const TabHeadingContainerStyles = styled("ul")`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const TabHeading = styled("li")`
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

export const TabContent = styled("div")`
  margin: 0;
  padding: 0;
  border-radius: 5px;
  padding: 20px;
  background: #fff;
`;

export function TabHeadingContainer(props) {
  const { children, selectedTab, handleClick } = props;

  return (
    <TabHeadingContainerStyles>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          onClick: () => handleClick(index),
          active: index === selectedTab,
          className: index === selectedTab ? "active" : ""
        });
      })}
    </TabHeadingContainerStyles>
  );
}

export function TabContentWrapper(props) {
  const { children, selectedTab } = props;
  return children[selectedTab];
}

class TabsAlternative extends React.Component {
  state = { selectedTab: 0 };
  handleClick = index => {
    this.setState({ selectedTab: index });
  };
  render() {
    const { children } = this.props;
    const { selectedTab } = this.state;
    return (
      <Fragment>
        {React.Children.map(children, (child, index) => {
          if (child.type === TabHeadingContainer) {
            return React.cloneElement(child, {
              selectedTab,
              handleClick: this.handleClick
            });
          } else if (child.type === TabContentWrapper) {
            return React.cloneElement(child, { selectedTab });
          } else {
            return null;
          }
        })}
      </Fragment>
    );
  }
}

class Tabs extends React.Component {
  render() {
    const { tabData } = this.props;
    return (
      <TabsAlternative>
        <TabHeadingContainer>
          {tabData.map(({ label }, index) => <TabHeading>{label}</TabHeading>)}
        </TabHeadingContainer>
        <TabContentWrapper>
          {tabData.map(({ description }, index) => (
            <TabContent>{description} </TabContent>
          ))}
        </TabContentWrapper>
      </TabsAlternative>
    );
  }
}

export default Tabs;
