import "./App.css";
import Widget from "./components/widget";

function App() {
  return (
    <div>
      <Widget
        id="widget1"
        size={{ width: 80, height: 80 }}
        speed={1200}
        fps={120}
      />
    </div>
  );
}

export default App;
