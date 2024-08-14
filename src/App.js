// Import React components and styles
import './App.css'; // Import custom styles for the App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles for UI components

// Importing custom components
import { NavBar } from "./components/NavBar"; // Navigation bar component
import { Banner } from "./components/Banner"; // Banner component for displaying introductory content
import { Skills } from "./components/Skills"; // Skills component to showcase abilities or expertise
import { Projects } from "./components/Projects"; // Projects component to list or display projects
import { Contact } from "./components/Contact"; // Contact component for contact information or form
import { Footer } from "./components/Footer"; // Footer component for footer content

// Functional component definition
function App() {
  return (
    <div className="App">
      {/* Render navigation bar */}
      <NavBar />
      {/* Render banner section */}
      <Banner />
      {/* Render skills section */}
      <Skills />
      {/* Render projects section */}
      <Projects />
      {/* Render contact section */}
      <Contact />
      {/* Render footer section */}
      <Footer />
    </div>
  );
}

// Export the App component as the default export
export default App;
