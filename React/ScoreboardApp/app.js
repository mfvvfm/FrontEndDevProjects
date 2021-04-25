// createElement accepts three arguments that define element you want to create
// 1. first element is type you want to create,
// 2. object, containing any attributes and values you want to give to the element
// 3. Contents or children of the element you're creating

const Header = (props) => {
  return (
    <header>
      <h1>{ props.title }</h1>
      <span className="stats">Players: { props.totalPlayers }</span>
    </header>
  );
}

const Player = (props) => {
  return (
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={ () => props.removePlayer(props.id) }>✖</button>
        { props.name }
      </span>

      <Counter />
    </div>
  );
}
// In JS classes, extends keyword is used to create a subclass or child of another class
// We are extending from React.Component part of React's API for component class definition
// this refers to component instance
class Counter extends React.Component {

  state = {
    score: 0
  };

  // In class components a common pattern is to create event handlers as a method on the class
  /* React needs to be told when state changes, so we 'this.setState',
  it'll let React know state has changed and to re-render and make changes to the component based on the change in state */
  // You pass setState an object that contains part of the state you want to update and value i want to update it to
  // preState is a callback func to avoid state inconsistency that 'this.state.score' provides
  // callback func is gunranteed to fire after the update is applied and rendered out to the DOM, now we are sure that state did update correctly
  incrementScore = () => {
    this.setState( prevState => ({
      score: prevState.score + 1
    }));
  }

  decrementScore = () => {
    this.setState( prevState => ({
      score: this.state.score - 1
    }));
  }

  render() {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={ this.decrementScore }> - </button>
        <span className="counter-score">{ this.state.score }</span>
        <button className="counter-action increment" onClick={ this.incrementScore }> + </button>
      </div>
    );
  }
}

class App extends React.Component {

  state = {
    players: [
      {
        name: "Moises",
        id: 1
      },
      {
        name: "Veiga",
        id: 2
      },
      {
        name: "Figueiredo",
        id: 3
      },
      {
        name: "James",
        id: 4
      }
    ]
  };

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
      players: prevState.players.filter ( p => p.id !== id )
      };
    });
  }

  render() {
    return (
      <div className="scoreboard">
        <Header
          title="Scoreboard"
          totalPlayers={ this.state.players.length }
        />

        {/* Players list */}
        {/* this maps players into player parameter to represent current item being processed in a new array */}
        {/* This are the names and score from each player item we're getting from map */}
        { this.state.players.map( player =>
          <Player
            name={ player.name }
            id={ player.id }
            key={ player.id.toString() }
            removePlayer={ this.handleRemovePlayer }
          />
        )}
      </div>
    );
  }
}

{/* prop initialPlayers={players} passes array into App */}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// Main takeaway is that React never touches actual DOM directly, it just manages what gets rendered to the DOM and what gets updated via reactDOM.render
