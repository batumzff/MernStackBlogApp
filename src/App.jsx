import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import Navbar from "./Components/NAVBAR/Navbar";
import Footer from "./Components/FOOTER/Footer";


function App() {
  return (
    <>
      <Router>
        <Navbar />
       
          <AppRouter />
        
        <Footer />
      </Router>
    </>
  );
}

export default App;
