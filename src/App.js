import logo from './logo.svg';
import './App.scss';
import Clock from './components/clock';
import { TimerProvider } from './context';

function App() {
  return (
    <TimerProvider>
      <div className="App">
        <Clock />
      </div>
    </TimerProvider>
  );
}

export default App;
