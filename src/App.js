import './App.css';
import TodoList from './TodoList';
import { TodoProvider } from './TodoContext';

function App() {
  return (
    <div className="App">
      <TodoProvider>
        <div className="App">
          <TodoList />
        </div>
      </TodoProvider>
    </div>
  );
}

export default App;
