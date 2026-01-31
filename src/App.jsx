import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ComponentCompositionPage from './patterns/component-composition/ComponentCompositionPage';
import RenderPropsPage from './patterns/render-props/RenderPropsPage';
import HigherOrderComponentsPage from './patterns/higher-order-components/HigherOrderComponentsPage';
import CustomHooksPage from './patterns/custom-hooks/CustomHooksPage';
import CompoundComponentsPage from './patterns/compound-components/CompoundComponentsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/component-composition" element={<ComponentCompositionPage />} />
        <Route path="/render-props" element={<RenderPropsPage />} />
        <Route path="/higher-order-components" element={<HigherOrderComponentsPage />} />
        <Route path="/custom-hooks" element={<CustomHooksPage />} />
        <Route path="/compound-components" element={<CompoundComponentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
