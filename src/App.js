import './App.css';
import Model from './model/model';
import ShowPresenter from './presenters/showPresenter';


function App() {
  const model = new Model();
  //model.retrieveCurrentTemperature();
  //model.retrieveCollectionOfTemperatures();
  
  return (
    <div className="App">
      <ShowPresenter model = {model}/>
    </div>
  );
}

export default App;
