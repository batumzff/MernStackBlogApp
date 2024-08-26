import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import Navbar from "./Components/NAVBAR/Navbar";
import Footer from "./Components/FOOTER/Footer";
import appStyle from "./App.module.scss";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <AppRouter />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
