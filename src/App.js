import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './admin_page/AdminDashboard';
import UserPage from './user_page/userpage';
import BrowseEvents from './browse_events/BrowseEvents';
import EventDetails from './browse_events/EventDetails';
import LoginPage from './auth/LoginPage';
import OrganizerDashboard from './browse_events/OrganizerDashboard';
import CreateEventWizard from './browse_events/CreateEventWizard';


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/browse" element={<BrowseEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
          <Route path="/organizer/create-event" element={<CreateEventWizard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;