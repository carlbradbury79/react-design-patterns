import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const patterns = [
  {
    id: 'component-composition',
    name: 'Component Composition',
    description: 'Learn how to build complex UIs by composing smaller, reusable components together.',
    path: '/component-composition',
  },
  {
    id: 'render-props',
    name: 'Render Props',
    description: 'Share code between components using a prop whose value is a function.',
    path: '/render-props',
  },
  {
    id: 'higher-order-components',
    name: 'Higher-Order Components (HOC)',
    description: 'A pattern for reusing component logic by wrapping components with additional functionality.',
    path: '/higher-order-components',
  },
  {
    id: 'custom-hooks',
    name: 'Custom Hooks',
    description: 'Extract component logic into reusable functions using React Hooks.',
    path: '/custom-hooks',
  },
  {
    id: 'compound-components',
    name: 'Compound Components',
    description: 'Create components that work together to form a cohesive UI with shared state.',
    path: '/compound-components',
  },
];

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatterns = patterns.filter(
    (pattern) =>
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>React Design Patterns</h1>
        <p className="subtitle">
          Learn essential React patterns to write better, more maintainable code
        </p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search patterns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="patterns-grid">
        {filteredPatterns.length > 0 ? (
          filteredPatterns.map((pattern) => (
            <Link
              key={pattern.id}
              to={pattern.path}
              className="pattern-card"
            >
              <h2>{pattern.name}</h2>
              <p>{pattern.description}</p>
              <span className="learn-more">Learn more →</span>
            </Link>
          ))
        ) : (
          <p className="no-results">No patterns found matching "{searchTerm}"</p>
        )}
      </div>

      <footer className="home-footer">
        <p>
          Built to help developers learn and master React design patterns.
          Each pattern includes explained code examples.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
