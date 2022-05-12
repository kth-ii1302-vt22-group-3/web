import './App.css';
import Model from './model/model';
import HomePagePresenter from './presenters/homePagePresenter';

function App() {
  const model = new Model();
/*
  //const model = new Model();
  //model.getLatest();
  //model.getLatests();
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Fetching...");
      model.getLatest(); 
      console.log("Fetching complete!");
    }, 5000);

    setModel(model);
    return () => clearInterval(interval);
  }, [model]);
  */
  return (
    <div className="App">
      <HomePagePresenter model = {model}/>
    </div>
  );
}

export default App;
