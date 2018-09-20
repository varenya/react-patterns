import React, { Fragment } from "react";
import styled from "react-emotion";

const TabHeadingContainerStyles = styled("ul")`
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

function TabContentWrapper(props) {
  const { selectedTab } = props;
  return props.children[selectedTab];
}

function TabHeadingContainer(props) {
  const { activeIndex, children, handleClick } = props;
  return (
    <TabHeadingContainerStyles>
      {React.Children.map(children, (child, index) => {
        if (child.type === TabHeading)
          return React.cloneElement(child, {
            active: activeIndex === index,
            className: activeIndex === index ? "active" : "",
            onClick: () => handleClick(index)
          });
        else return null;
      })}
    </TabHeadingContainerStyles>
  );
}

class Tabs extends React.Component {
  state = { selectedTab: 0 };
  handleClick = index => {
    this.setState({ selectedTab: index });
  };
  render() {
    const { selectedTab } = this.state;
    const { children } = this.props;
    return (
      <Fragment>
        {React.Children.map(children, (child, index) => {
          if (child.type === TabHeadingContainer) {
            return React.cloneElement(child, {
              handleClick: this.handleClick,
              activeIndex: selectedTab
            });
          } else if (child.type === TabContentWrapper) {
            return React.cloneElement(child, {
              selectedTab
            });
          }
        })}
      </Fragment>
    );
  }
}

class TabsDefault extends React.Component {
  render() {
    const { tabData } = this.props;

    return (
      <Tabs>
        <TabHeadingContainer>
          {tabData.map(({ label }, index) => (
            <TabHeading key={index}>{label}</TabHeading>
          ))}
        </TabHeadingContainer>
        <TabContentWrapper>
          {tabData.map(({ description }, index) => (
            <TabContent key={index}>{description}</TabContent>
          ))}
        </TabContentWrapper>
      </Tabs>
    );
  }
}

export default TabsDefault;
