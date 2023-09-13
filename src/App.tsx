import './App.css';
import { Assignment } from './components/Assignment/Assignment';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';

function App() {
  return (
    <div className="container mx-auto">
      <Header />
      <main className="content">
        <Assignment />
      </main>
      <Footer />
    </div>
  );
}

export default App;
