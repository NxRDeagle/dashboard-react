import ReactDOM from "react-dom/client";
import GreetingWidget from "./components/GreetingWidget";
import "./index.css";

const App = () => (
  <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="w-80">
      <GreetingWidget userName="Developer" />
      <p className="text-center text-xs text-gray-400 mt-4">
        Greeting Remote — running standalone on port 8081
      </p>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
