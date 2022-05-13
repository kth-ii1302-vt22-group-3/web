import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Model from './model/model';
import HomePagePresenter from './presenters/homePagePresenter';
import TemperatureView from "./views/temperatureView";
import TemperatureGraphView from "./views/temperatureGraphView";
import SidebarView from "./views/sidebarView";


function App() {
  const model = new Model();
  model.getLatest();
  model.getLatests();
  return (
    <div className="App">
      <BrowserRouter>
      <SidebarView />
        <Routes>
          <Route path="/" element={<Outlet/>}>
            <Route index path="today" element={<TemperatureView temperature={0} timestamp={"dofhgjl"} />}/>
            <Route path="graph" element={<TemperatureGraphView chartData={model.chartData} />}/>
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <HomePagePresenter model = {model}/> */}
    </div>
  );
}

export default App;
