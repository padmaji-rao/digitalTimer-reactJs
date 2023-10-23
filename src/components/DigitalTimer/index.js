import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isStart: false,
    startingSeconds: 25 * 60,
    timerLimit: 25,
  }

  onClickPlay = () => {
    const {isStart} = this.state
    this.setState(prevState => ({isStart: !prevState.isStart}))
    if (!isStart) {
      console.log(`Updating sconds`)

      this.timerId = setInterval(this.updateSeconds, 1000)
    } else {
      console.log(`Pausing timer`)

      clearInterval(this.timerId)
    }
  }

  updateSeconds = () => {
    this.setState(prevState => ({
      startingSeconds: prevState.startingSeconds - 1,
    }))
  }

  incrementMinutes = () => {
    const {isStart} = this.state
    if (!isStart) {
      this.setState(prevState => ({
        startingSeconds: prevState.startingSeconds + 60,
        timerLimit: prevState.timerLimit + 1,
      }))
    }
  }

  decrementMinutes = () => {
    const {isStart} = this.state
    if (!isStart) {
      this.setState(prevState => ({
        startingSeconds: prevState.startingSeconds - 60,
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  onClickReset = () => {
    clearInterval(this.timerId)
    this.setState({
      isStart: false,
      startingSeconds: 25 * 60,
    })
  }

  render() {
    const {startingSeconds, isStart, timerLimit} = this.state
    const state = isStart ? 'Running' : 'Paused'
    const spContent = isStart ? 'Pause' : 'Start'
    const spUrl = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const spAlt = isStart ? 'pause icon' : 'play icon'
    const actualMinutes = Math.floor(startingSeconds / 60)
    let actualSeconds = startingSeconds % 60
    actualSeconds = actualSeconds < 10 ? `0${actualSeconds}` : actualSeconds
    console.log(isStart, startingSeconds)
    return (
      <div className="bg-container">
        <h1 className="head">Digital Timer</h1>
        <div className="main-container">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="time-para">{`${actualMinutes}:${actualSeconds}`}</h1>
              <p className="state-para">{state}</p>
            </div>
          </div>
          <div className="sr-bg-container">
            <div className="sr-container">
              <div className="start-container">
                <button
                  onClick={this.onClickPlay}
                  className="sr-button"
                  type="button"
                >
                  <img className="sr-icon" src={spUrl} alt={spAlt} />
                  <p className="btn-content">{spContent}</p>
                </button>
              </div>
              <div className="restart-container">
                <button
                  onClick={this.onClickReset}
                  className="sr-button"
                  type="button"
                >
                  <img
                    className="sr-icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="btn-content">Reset</p>
                </button>
              </div>
            </div>
            <p>Set Timer Limit</p>
            <div className="set-limit-container">
              <button
                onClick={this.decrementMinutes}
                className="sl-button"
                type="button"
              >
                -
              </button>
              <p type="button" className="set-minutes">
                {timerLimit}
              </p>
              <button
                onClick={this.incrementMinutes}
                className="sl-button"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
