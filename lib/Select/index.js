"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const popup_1 = require("../popup");
const react_feather_1 = require("react-feather");
const ListContainer = styled_components_1.default.div `
  width: 100%;
  background: white;
  position: relative;
  height: ${props => props.size * 31}px;
  max-height: ${5 * 31}px;
  overflow: scroll;
`;
const Item = styled_components_1.default.div `
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  border-top: 1px solid #edf0f2;
  opacity: 1;
  transition: background 0.25s;
  background: ${props => (props.active ? "#f8f9fa" : "transparent")};

  &:hover {
    background: #f8f9fa;
  }
`;
const ItemText = styled_components_1.default.div `
  color: #858e96;
  font-size: 14px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif;
`;
const InnerContainer = styled_components_1.default.div `
  width: 100%;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
`;
const Button = styled_components_1.default.div `
  cursor: pointer;
  padding: 3px;
  opacity: 1;
  transition: opacity 0.25s;

  &:hover {
    opacity: 0.5;
  }
`;
const Container = styled_components_1.default.div `
  width: 100%;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  position: relative;
  border: 1px solid #edf0f2;
  border-radius: 5px;
  position: relative;
`;
const Text = styled_components_1.default.div `
  color: #495057;
  font-size: 14px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif;
  padding: 10px;
  flex: 1;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.25s;

  &:hover {
    opacity: 0.75;
  }
`;
class Select extends React.Component {
    static getDerivedStateFromProps(props, state) {
        return {
            list: props.list.filter((item, index) => (index <= 5 ? true : false)),
        };
    }
    constructor(props) {
        super(props);
        this.state = { index: 0, list: [], visible: false };
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleKeyPress(e) {
        // Move up
        if (e.keyCode == 38)
            this.setState({ index: this.state.index - 1 < 0 ? this.state.list.length - 1 : this.state.index - 1 });
        // Move down
        if (e.keyCode == 40)
            this.setState({ index: this.state.index + 1 == this.state.list.length ? 0 : this.state.index + 1 });
        // Press enter
        if (e.keyCode == 13) {
            if (this.state.list.length > 0)
                this.props.onSelect(this.state.list[this.state.index]);
        }
    }
    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyPress);
    }
    // prettier-ignore
    render() {
        return (React.createElement(Container, null,
            React.createElement(popup_1.Popup, { visible: this.state.visible, handleDismiss: () => this.setState({ visible: false }), direction: "left-bottom", width: "100%", content: React.createElement(ListContainer, { size: this.state.list.length }, this.state.list.map((item, index) => {
                    return (React.createElement(Item, { active: index == this.state.index, key: index, onClick: () => {
                            this.setState({ visible: false });
                            this.props.onSelect(item);
                        } },
                        React.createElement(ItemText, null, item.text)));
                })) },
                React.createElement(InnerContainer, null,
                    React.createElement(Text, { onClick: () => this.setState({ visible: true }) }, this.props.list[this.props.selected].text),
                    React.createElement(Button, { onClick: () => this.setState({ visible: true }) },
                        React.createElement(react_feather_1.ChevronDown, { color: "#495057", size: "20", thickness: "1.5" }))))));
    }
}
exports.Select = Select;
//# sourceMappingURL=index.js.map