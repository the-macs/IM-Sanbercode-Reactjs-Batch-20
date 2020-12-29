import React, { Component } from "react";

class TimeCountdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      clock: new Date().toLocaleTimeString(),
      show: true,
    };
  }

  componentDidMount() {
    if (this.props.start !== undefined) {
      this.setState({ time: this.props.start });
    }

    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      time: this.state.time - 1,
      clock: new Date().toLocaleTimeString(),
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate() {
    if (this.state.time === 0) {
      this.componentWillUnmount();
    }
  }

  render() {
    return (
      <>
        <h1
          style={{
            backgroundColor: "turquoise",
            padding: "5px 0",
            marginTop: "0px",
          }}
        >
          TUGAS-11
        </h1>
        {this.state.time !== 0 ? (
          <div className="grid-container">
            <h1 className="t11" style={{ textAlign: "center" }}>
              Sekarang Jam : {this.state.clock}
            </h1>
            <h1 className="t11" style={{ textAlign: "center" }}>
              Hitung Mundur : {this.state.time}
            </h1>
          </div>
        ) : null}
      </>
    );
  }
}

export default TimeCountdown;
