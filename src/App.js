import Navbar from './components/Navbar';
import AdminDashboard from './admin_page/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AdminDashboard />
    </div>
  );
}

export default App;