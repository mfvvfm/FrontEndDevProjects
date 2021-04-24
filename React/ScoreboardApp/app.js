// createElement accepts three arguments that define element you want to create
// 1. first element is type you want to create,
// 2. object, containing any attributes and values you want to give to the element
// 3. Contents or children of the element you're creating

const players = [
  {
    name: "Moises",
    score: 50,
    id: 1
  },
  {
    name: "Veiga",
    score: 85,
    id: 2
  },
  {
    name: "Figueiredo",
    score: 95,
    id: 3
  },
  {
    name: "James",
    score: 80,
    id: 4
  }
];

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

  render() {
    return (
      <div className="counter">
        <button className="counter-action decrement"> - </button>
        <span className="counter-score">{ this.state.score }</span>
        <button className="counter-action increment"> + </button>
      </div>
    );
  }
}

const App = (props) => {
  return (
    <div className="scoreboard">
      <Header
        title="Scoreboard"
        totalPlayers={ props.initialPlayers.length }
      />

      {/* Players list */}
      {/* this maps players into player parameter to represent current item being processed in a new array */}
      {/* This are the names and score from each player item we're getting from map */}
      { props.initialPlayers.map( player =>
        <Player
          name={player.name}
          score={player.score}
          key={player.id.toString()}
        />
      )}
    </div>
  );
}

{/* prop initialPlayers={players} passes array into App */}
ReactDOM.render(
  <App initialPlayers={ players }/>,
  document.getElementById('root')
);
// Main takeaway is that React never touches actual DOM directly, it just manages what gets rendered to the DOM and what gets updated via reactDOM.render
