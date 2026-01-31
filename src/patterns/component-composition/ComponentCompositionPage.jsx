import { useState } from 'react';
import PatternLayout from '../../components/PatternLayout';

// Example 1: Basic Composition
function Card({ children }) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '1.5rem',
      background: 'white'
    }}>
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{children}</div>;
}

function CardBody({ children }) {
  return <div style={{ marginBottom: '1rem', color: '#555' }}>{children}</div>;
}

function CardFooter({ children }) {
  return <div style={{ fontSize: '0.9rem', color: '#888' }}>{children}</div>;
}

// Example 2: Composition with Layout
function Button({ children, variant = 'primary', onClick }) {
  const styles = {
    primary: { background: '#667eea', color: 'white' },
    secondary: { background: '#e0e0e0', color: '#333' },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
      }}
    >
      {children}
    </button>
  );
}

function ComponentCompositionPage() {
  const [count, setCount] = useState(0);

  return (
    <PatternLayout
      title="Component Composition Pattern"
      description="Build complex UIs by composing smaller, reusable components together. This is one of React's most powerful patterns."
    >
      <div className="section">
        <h2>What is Component Composition?</h2>
        <p>
          Component Composition is a fundamental React pattern where you build complex components 
          by combining simpler ones. Instead of creating monolithic components with lots of props, 
          you create small, focused components that can be mixed and matched.
        </p>
        <p>
          This pattern leverages React's <span className="highlight">children</span> prop and 
          JSX's ability to nest components, making your code more flexible and maintainable.
        </p>
      </div>

      <div className="section">
        <h2>Key Benefits</h2>
        <ul>
          <li><strong>Flexibility:</strong> Components can be combined in different ways</li>
          <li><strong>Reusability:</strong> Each component does one thing well</li>
          <li><strong>Maintainability:</strong> Easier to understand and modify</li>
          <li><strong>Testability:</strong> Smaller components are easier to test</li>
        </ul>
      </div>

      <div className="section">
        <h2>Example 1: Basic Card Composition</h2>
        <p>
          Here's a simple example showing how to compose a Card component from smaller pieces:
        </p>
        
        <div className="code-block">
          <pre>{`// Define small, focused components
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
}

function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>;
}

// Compose them together
function UserProfile() {
  return (
    <Card>
      <CardHeader>John Doe</CardHeader>
      <CardBody>
        Software Engineer at TechCorp
        <br />
        Passionate about React and Web Development
      </CardBody>
      <CardFooter>Joined January 2024</CardFooter>
    </Card>
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <Card>
            <CardHeader>John Doe</CardHeader>
            <CardBody>
              Software Engineer at TechCorp
              <br />
              Passionate about React and Web Development
            </CardBody>
            <CardFooter>Joined January 2024</CardFooter>
          </Card>
        </div>
      </div>

      <div className="section">
        <h2>Example 2: Button Composition</h2>
        <p>
          Components can accept different children to create variations:
        </p>
        
        <div className="code-block">
          <pre>{`function Button({ children, variant = 'primary', onClick }) {
  return (
    <button className={\`btn btn-\${variant}\`} onClick={onClick}>
      {children}
    </button>
  );
}

// Use it with different children
function ActionButtons() {
  return (
    <div>
      <Button variant="primary" onClick={() => alert('Saved!')}>
        Save Changes
      </Button>
      <Button variant="secondary" onClick={() => alert('Cancelled')}>
        Cancel
      </Button>
    </div>
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => setCount(count + 1)}>
              Increment Count: {count}
            </Button>
            <Button variant="secondary" onClick={() => setCount(0)}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Best Practices</h2>
        <ol>
          <li>
            <strong>Keep Components Small:</strong> Each component should have a single responsibility
          </li>
          <li>
            <strong>Use Children Props:</strong> Make components flexible by accepting children
          </li>
          <li>
            <strong>Avoid Over-composition:</strong> Don't break things down too much - find the right balance
          </li>
          <li>
            <strong>Think in Terms of Containers and Presenters:</strong> Separate layout from content
          </li>
        </ol>
      </div>

      <div className="section">
        <h2>When to Use This Pattern</h2>
        <p>
          Component Composition is ideal when:
        </p>
        <ul>
          <li>You need flexible, reusable UI components</li>
          <li>Different parts of a component might change independently</li>
          <li>You want to avoid "prop drilling" with deep hierarchies</li>
          <li>You're building a component library or design system</li>
        </ul>
      </div>
    </PatternLayout>
  );
}

export default ComponentCompositionPage;
