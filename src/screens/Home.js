import logo from '../assets/logo.svg';
import '../App.css';

const subTextStyle = {
    fontSize: '12px',
    marginTop: '-10px'
}

const buttonStyle = {
    color: '#61dafb',
    marginTop: '14px',
    cursor: 'pointer',
    textDecoration: 'underline'
}

const HEIGHT = window.innerHeight

function Home(props) {
  const { onClick } = props
  return (
    <div className="App" style={{height: HEIGHT}}>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Bored in lectures. Talk to someone.
        </p>
        <p style={subTextStyle}>
            No download. No registration. No data saved.
        </p>
        <a
          style={buttonStyle}
          onClick={onClick}
        >
         Let's Go
        </a>
      </div>
    </div>
  );
}

export default Home;