import { Link } from 'react-router-dom';
import './PatternLayout.css';

function PatternLayout({ title, description, children }) {
  return (
    <div className="pattern-layout">
      <nav className="pattern-nav">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
      
      <div className="pattern-content">
        <header className="pattern-header">
          <h1>{title}</h1>
          <p className="pattern-description">{description}</p>
        </header>
        
        <div className="pattern-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PatternLayout;
