import './App.css';
import Model from './model/model';
import HomePagePresenter from './presenters/homePagePresenter';

function App() {
  const model = new Model();
  model.getLatest();
  return (
    <div className="App">
      <HomePagePresenter model = {model}/>
    </div>
  );
}

export default App;
