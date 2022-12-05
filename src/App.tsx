import Header from "./components/header";
import NewToDoForm from "./components/NewToDo";
import ToDoList from "./components/ToDoList";
const App = () => {
  return (
    <div className="@container bg-indigo-800 h-max">
      <Header />
      <main className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">To-Do List</h2>
        <NewToDoForm />
        <ToDoList />
      </main>
    </div>
  );
};

export default App;
