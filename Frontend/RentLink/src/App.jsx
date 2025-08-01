import { BrowserRouter, Routes, Route } from 'react-router-dom';


import DashboardRouter from './routes/dashboard.route';



function App() {
  return (
     <BrowserRouter>
     <DashboardRouter/>
     </BrowserRouter>
  );
}

export default App;

