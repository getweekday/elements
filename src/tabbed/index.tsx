import * as React from "react";
import styled from "styled-components";

const PanelContainer = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  position: relative;
`;

const PanelTitles = styled.div<{
  size: string;
}>`
  border-right: 1px solid #eaeaea;
  box-sizing: border-box;
  width: ${props => props.size == "large" ? "250px" : "200px"};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  justify-content: flex-start;
  position: relative;
  height: 100%;
  min-height: 200px;
`;

const Panels = styled.div<{
  current: number;
}>`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
`;

const PanelsContainer = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  overflow: hidden;
`;

const Panel = styled.div<{
  index: number;
}>`
  position: absolute;
  background: transparent;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
`;

const PanelTabButton = styled.div<
{
  size: string;
  borderless: boolean;
    active: boolean;
}>`
  padding: ${props => {
    switch (props.size) {
      case "large":
        if (props.borderless) {
          return "15px 25px 0px 25px";
        } else {
          return "15px 25px 15px 25px";
        }
      default:
        if (props.borderless) {
          return "10px 20px 0px 20px";
        } else {
          return "10px 20px 10px 20px";
        }
    }
  }};
  border-bottom: ${props => props.borderless ? "none" : "1px solid #eaeaea" };
  width: 100%;
  cursor: pointer;
  background: ${props => props.active ? "#f6f7fa" : "none" };
`;

const Text = styled.div<{
  active: boolean;
  size: string;
}>`
  font-size: ${props => {
    switch (props.size) {
      case "large":
        return "20px";
      default:
        return "14px";
    }
  }};
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  color: ${props => props.active ? "#617691" : "#acb5bd"};
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.25s;

  &:hover {
    opacity: 0.8;
  }
`;

const Subtext = styled.div<{
  active: boolean;
  size: string;
}>`
  font-size: ${props => {
    switch (props.size) {
      case "large":
        return "12px";
      default:
        return "10px";
    }
  }};
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  color: ${props => props.active ? "#AEB5BC" : "#AEB5BC"};
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.25s;
  margin-top: 3px;

  &:hover {
    opacity: 0.8;
  }
`;

interface ITabbedProps {
  start: number;
  size?: string;
  borderless?: boolean;
  footer?: any;
  panels: any;
  onChange?: any;
}

export const Tabbed: React.FunctionComponent<ITabbedProps> = (props: ITabbedProps) => {
  const [current, setCurrent] = React.useState(props.start);

  return (
    <PanelContainer>
      <PanelTitles size={props.size || "default"}>
        {props.panels.map((panel: any, index: number) => {
          if (!panel.show) return null;

          return (
            <PanelTabButton
              borderless={props.borderless || false}
              active={current == index}
              size={props.size || "default"}
              key={index}
              className={current == index ? "active" : ""}
              onClick={() => {
                // Update the current index
                setCurrent(index)

                // Tell the user it's changed
                if (props.onChange) props.onChange(index)
              }}>
              <Text active={current == index} size={props.size || "default"}>
                {panel.title}
              </Text>
              {panel.subtitle &&
                <Subtext active={current == index} size={props.size || "default"}>
                  {panel.subtitle}
                </Subtext>
              }
            </PanelTabButton>
          );
        })}

        {props.footer &&
          <React.Fragment>
            {props.footer}
          </React.Fragment>
        }
      </PanelTitles>

      <PanelsContainer>
        <Panels current={current}>
          {props.panels.map((panel: any, index: number) => {
            if (!panel.show) return null;
            if (current != index) return null;

            return (
              <Panel key={index} index={index}>
                {panel.content}
              </Panel>
            );
          })}
        </Panels>
      </PanelsContainer>
    </PanelContainer>
  );
};
