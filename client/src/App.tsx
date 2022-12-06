import Header from "./components/layout/Header";
import ToDoForm from "./components/todo/ToDoForm";
import ToDoList from "./components/todo/ToDoList";
const App = () => {
  return (
    <div className="h-screen bg-pink-800 text-pink-100">
      <Header />
      <main className="flex flex-col items-center space-y-4 p-4">
        <h2 className="text-3xl font-bold">To-Do List</h2>
        <ToDoForm />
        <ToDoList />
      </main>
    </div>
  );
};

export default App;
