import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/game'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { SUN_FLOWER, MIDNIGHT_BLUE, ORANGE, WISTERIA, NEPHRITIS  } from '../colors'
import Scoreboard from '../components/Scoreboard.jsx'
import Board from '../components/Board.jsx'
import Alert from '../components/Alert.jsx'

const StyledScoreboard = styled.div`
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  cursor: pointer;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

const StyledScoreboardX = styled(StyledScoreboard)`
  left: 0;
`

const StyledScoreboardO = styled(StyledScoreboard)`
  right: 0;
`

const StyledBoard = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`

class App extends Component {
  everyIsEmpty = () => {
    return this.props.game.board.every((value) => value === null)
  }
  play = (index) => {
    if (this.props.game.isFinished) return
    if (this.props.game.board[index]) return window.alert('Invalid!')

    // For the human.
    this.props.actions.play({
      index,
      player: this.props.game.players.human.name
    })

    // For the computer.
    setTimeout(() => {
      this.props.actions.play({
        player: this.props.game.players.human.name === 'x' ? 'o' : 'x'
      })
    }, 250)
  }
  togglePlayer = (name) => {
    if (this.props.game.players.human.name === name) return
    if (!this.everyIsEmpty()) return window.alert('Finish the game before.')

    this.props.actions.togglePlayer()
  }
  start = () => {
    this.props.actions.restart()
  }
  restart = () => {
    if (this.everyIsEmpty()) return window.alert('This is not necessary.')

    if (window.confirm('Are you sure?')) {
      this.props.actions.restart()
    }
  }
  render() {
    const { human, computer } = this.props.game.players

    return (
      <Fragment>
        <StyledScoreboardX onClick={() => this.togglePlayer('x')}>
          <Scoreboard
            width={50}
            playerName='x'
            playerBackground={WISTERIA}
            playerColor={human.name === 'x' ? SUN_FLOWER : 'white'}
            score={human.name === 'x' ? human.victories : computer.victories}
            scoreBackground={SUN_FLOWER}
          />
        </StyledScoreboardX>
        <StyledScoreboardO onClick={() => this.togglePlayer('o')}>
          <Scoreboard
            width={50}
            playerName='o'
            playerBackground={WISTERIA}
            playerColor={human.name === 'o' ? SUN_FLOWER : 'white'}
            score={human.name === 'o' ? human.victories : computer.victories}
            scoreBackground={SUN_FLOWER}
          />
        </StyledScoreboardO>
        <StyledBoard>
          <Board
            board={this.props.game.board}
            onClick={this.play}
            cellWidth={110}
            cellColor='white'
            borderWidth={8}
            borderColor={MIDNIGHT_BLUE}
            colorPlayerX={WISTERIA}
            colorPlayerO={NEPHRITIS}
          />
        </StyledBoard>
        <Alert
          isOpen={this.props.game.isFinished}
          onClickButtonOpened={this.start}
          onClickButtonClosed={this.restart}
          containerHeight={10}
          containerColor={MIDNIGHT_BLUE}
          buttonIconOpened='play_arrow'
          buttonIconClosed='refresh'
          buttonWidth={65}
          buttonColor={ORANGE}
          winner={this.props.game.winner}
        />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)