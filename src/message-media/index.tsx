import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import * as chroma from "chroma-js";

const Container = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;
`;

const Inner = styled.div<{
  width: number,
  height: number,
  borderRadius: number,
  image: string,
  background: string,
  outlineInnerColor: string,
  outlineOuterColor: string,
}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: ${props => props.borderRadius}px;
  display: inline-block;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-size: cover;
  background-position: center center;
  background-image: ${props => props.image};
  background-color: ${props => props.background};

  &.overlap-right {
    margin-right: -7px;
  }

  &.outline {
    border: 1.5px solid ${props => props.outlineInnerColor};
    box-shadow: 0px 0px 0px 1.5px ${props => props.outlineOuterColor};
  }
`;

const Text = styled.div<{
  color: string,
  size?: string,
}>`
  font-weight: 500;
  color: ${props => props.color || "white"};
  position: relative;
  top: 0px;
  margin: 0px;
  padding: 0px;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif;
  text-decoration: none;
  font-size: ${props => {
    if (props.size === "very-small") return "6";
    if (props.size === "small") return "8";
    if (props.size === "small-medium") return "10";
    if (props.size === "medium") return "12";
    if (props.size === "medium-large") return "14";
    if (props.size === "large") return "16";
    if (props.size === "x-large") return "24";
    if (props.size === "xx-large") return "32";
    if (props.size === "xxx-large") return "40";

    return "12";
  }}px;
`;

const Delete = styled.div`
  top: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  background-color: #e23f62;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 1px solid white;
  z-index: 1;
  transition: background-color 0.25s;

  &:hover {
    background-color: #ce3354;
    transition: background-color 0.25s;
  }
`;

const Edit = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  cursor: pointer;
`;

const Badge = styled.span<{ dark: boolean }>`
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 11px;
  height: 11px;
  border-radius: 10px;
  background-color: #007af5;
  box-sizing: border-box;
  border: 2px solid ${props => (props.dark ? "#08111d" : "#ffffff")};
`;

interface IMessageMediaProps {
  /** Additional CSS class to add to the element */
  className?: string;

  /** URI string */
  image?: string;

  /** True or false */
  dark?: boolean;

  /** Hex color value for the background & text */
  color?: string;

  /**
   * Possible values:
   * - "very-small"
   * - "small"
   * - "small-medium"
   * - "medium"
   * - "medium-large"
   * - "large"
   * - "x-large"
   * - "xx-large"
   * - "xxx-large"
   */
  size?: string;

  /** True or false */
  circle?: boolean;

  /** React component */
  editIcon?: any;

  /** Function event callback for editing */
  onEditClick?: any;

  /** Function event callback for deleting */
  onDeleteClick?: any;

  /** React component */
  deleteIcon?: any;

  /** Hex color value */
  textColor?: string;

  /** Hex color value */
  outlineInnerColor?: string;

  /** Hex color value */
  outlineOuterColor?: string;

  /** Style object, { color: 'black' } */
  style?: object;

  /** React children */
  children?: any;

  /** True or false */
  badge?: boolean;

  /**
   * Value to display, either empty (" ") or title text
   *
   * @default " "
   */
  title: string;

  /** Called when the component is clicked. */
  onClick?: any;
}

/**
 * Avatar component. Displays a circle or square container for users,
 * channels, or anything else
 */
export const MessageMedia: React.FunctionComponent<IMessageMediaProps> = (props: IMessageMediaProps) => {
  const [over, setOver] = useState(false);
  const image = props.image ? "url(" + props.image + ")" : "";
  const background = props.dark
    ? "#0c1828"
    : props.color
    ? chroma(props.color)
        .desaturate(2)
        .brighten(2.25)
        .toString()
    : "#f1f3f5";
  const color = props.color || "#007af5";
  let width = 35;
  let height = 35;
  let borderRadius = 35;

  const generateInitials = (str: string) => {
    return str.split(" ")
      .map((part, _) => {
        return part[0] ? part[0].toUpperCase() : "";
      })
      .splice(0, 2)
      .toString()
      .replace(",", "")
      .trim();
  };

  switch (props.size) {
    case "very-small":
      width = 15;
      height = 15;
      borderRadius = props.circle ? 100 : 2;
      break;
    case "small":
      width = 20;
      height = 20;
      borderRadius = props.circle ? 100 : 3;
      break;
    case "small-medium":
      width = 25;
      height = 25;
      borderRadius = props.circle ? 100 : 4;
      break;
    case "medium":
      width = 30;
      height = 30;
      borderRadius = props.circle ? 100 : 5;
      break;
    case "medium-large":
      width = 35;
      height = 35;
      borderRadius = props.circle ? 100 : 6;
      break;
    case "large":
      width = 40;
      height = 40;
      borderRadius = props.circle ? 100 : 7;
      break;
    case "x-large":
      width = 80;
      height = 80;
      borderRadius = props.circle ? 100 : 10;
      break;
    case "xx-large":
      width = 120;
      height = 120;
      borderRadius = props.circle ? 100 : 12;
      break;
    case "xxx-large":
      width = 180;
      height = 180;
      borderRadius = props.circle ? 100 : 16;
      break;
  }

  return (
    <Container
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}>
      {over && props.onEditClick && props.editIcon &&
        <Edit onClick={props.onEditClick}>
          {props.editIcon}
        </Edit>
      }

      {over && props.onDeleteClick && props.deleteIcon &&
        <Delete onClick={props.onDeleteClick}>
          {props.deleteIcon}
        </Delete>
      }

      <Inner
        onClick={props.onClick}
        width={width}
        height={height}
        borderRadius={borderRadius}
        className={props.className}
        image={image}
        background={background}
        outlineInnerColor={props.outlineInnerColor ? props.outlineInnerColor : "transparent"}
        outlineOuterColor={props.outlineOuterColor ? props.outlineOuterColor : "transparent"}
        style={props.style}>

        {props.children}
        {props.badge && <Badge dark={props.dark || false}/>}

        {(
          (!props.children && !props.image && props.title && !props.onEditClick) ||
          (!props.children && !props.image && props.title && props.onEditClick && !over) ) &&
          <Text
            color={color}
            size={props.size}
            className="text">
            {generateInitials(props.title)}
          </Text>
        }
      </Inner>
    </Container>
  );
};