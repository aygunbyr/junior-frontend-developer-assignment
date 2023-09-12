import './App.css';
import { Homework } from './components/Homework/Homework';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';

function App() {
  return (
    <div className="container mx-auto">
      <Header />
      <main className="content">
        {/* <Assignment /> */}
        <Homework />
      </main>
      <Footer />
    </div>
  );
}

export default App;
