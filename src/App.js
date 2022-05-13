import './App.css';
import Model from './model/model';
import ShowPresenter from './presenters/showPresenter';


function App() {
  const model = new Model();
  //model.getLatest();
  //model.getLatests();
  
  return (
    <div className="App">
      <ShowPresenter model = {model}/>
    </div>
  );
}

export default App;
