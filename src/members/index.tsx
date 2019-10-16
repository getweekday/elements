import React, { useState, useEffect, useCallback } from 'react'
import { User } from '../user'

interface IMemberProps {
  handleAccept: any;
  members: any[];
}

interface IMemberState {
  index: number;
  members: any[];
}

export class Members extends React.Component<IMemberProps, IMemberState> {
  constructor(props: IMemberProps) {
    super(props)

    this.state = { index: 0, members: [] }
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(e: any) {
    // Move up
    if (e.keyCode == 38) this.setState({ index: this.state.index - 1 < 0 ? this.state.members.length - 1 : this.state.index - 1 })

    // Move down
    if (e.keyCode == 40) this.setState({ index: this.state.index + 1 == this.state.members.length ? 0 : this.state.index + 1 })

    // Press enter
    if (e.keyCode == 13) {
      if (this.state.members.length > 0) this.props.handleAccept(this.state.members[this.state.index])
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress)
  }

  static getDerivedStateFromProps(props: IMemberProps, state: IMemberState) {
    return {
      members: props.members.filter((member, index) => (index <= 5 ? true : false)),
    }
  }

  // prettier-ignore
  render() {
    return (
      <React.Fragment>
        {this.state.members.map((member, index) => {
          return (
            <User
              key={index}
              active={index == this.state.index}
              image={member.user.image}
              color={member.user.color}
              name={member.user.name}
              label={"@"+member.user.username}
              className="button"
              onClick={() => this.props.handleAccept(member)}
            />
          )
        })}
      </React.Fragment>
    )
  }
}