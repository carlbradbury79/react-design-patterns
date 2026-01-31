import { useState } from 'react';
import PatternLayout from '../../components/PatternLayout';

// Example 1: withLogger HOC (for demonstration - logs component renders)
// eslint-disable-next-line no-unused-vars
function withLogger(WrappedComponent) {
  return function WithLogger(props) {
    console.log(`Rendering ${WrappedComponent.name} with props:`, props);
    return <WrappedComponent {...props} />;
  };
}

// Example 2: withToggle HOC
// eslint-disable-next-line no-unused-vars
function withToggle(WrappedComponent) {
  return function WithToggle(props) {
    const [isOn, setIsOn] = useState(false);
    const toggle = () => setIsOn(!isOn);

    return <WrappedComponent {...props} isOn={isOn} toggle={toggle} />;
  };
}

// Example 3: withAuth HOC (simulated)
// eslint-disable-next-line no-unused-vars
function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const [isAuthenticated] = useState(true); // Simulated auth state

    if (!isAuthenticated) {
      return <div style={{ color: '#f44336', padding: '1rem' }}>Please log in to view this content.</div>;
    }

    return <WrappedComponent {...props} isAuthenticated={isAuthenticated} />;
  };
}

// Sample components to wrap
function SimpleButton({ isOn, toggle }) {
  return (
    <button
      onClick={toggle}
      style={{
        padding: '0.75rem 1.5rem',
        background: isOn ? '#4caf50' : '#e0e0e0',
        color: isOn ? 'white' : '#333',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
      }}
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

function UserProfile({ isAuthenticated }) {
  return (
    <div style={{ 
      padding: '1rem', 
      background: 'white', 
      borderRadius: '8px',
      border: '1px solid #e0e0e0'
    }}>
      <h3>Welcome to your profile!</h3>
      <p>Authentication Status: <strong style={{ color: '#4caf50' }}>
        {isAuthenticated ? '✓ Authenticated' : '✗ Not Authenticated'}
      </strong></p>
      <p>You have access to all features.</p>
    </div>
  );
}

// Apply HOCs
const EnhancedButton = withToggle(SimpleButton);
const ProtectedProfile = withAuth(UserProfile);

function HigherOrderComponentsPage() {
  return (
    <PatternLayout
      title="Higher-Order Components (HOC)"
      description="A pattern for reusing component logic by wrapping components with additional functionality, similar to decorators in other languages."
    >
      <div className="section">
        <h2>What are Higher-Order Components?</h2>
        <p>
          A Higher-Order Component (HOC) is a function that takes a component and returns a new 
          component with additional props or behavior. It's a pattern derived from React's 
          compositional nature and is not part of the React API itself.
        </p>
        <p>
          Think of HOCs as <span className="highlight">component wrappers</span> that add extra 
          functionality without modifying the original component. They're like middleware for your 
          components.
        </p>
        
        <div className="code-block">
          <pre>{`// Basic HOC structure
function withFeature(Component) {
  return function Enhanced(props) {
    // Add logic here
    const extraProps = { /* ... */ };
    
    return <Component {...props} {...extraProps} />;
  };
}

// Usage
const EnhancedComponent = withFeature(MyComponent);`}</pre>
        </div>
      </div>

      <div className="section">
        <h2>Key Benefits</h2>
        <ul>
          <li><strong>Code Reuse:</strong> Share logic across multiple components</li>
          <li><strong>Props Manipulation:</strong> Add, modify, or filter props</li>
          <li><strong>State Abstraction:</strong> Abstract state management from components</li>
          <li><strong>Render Hijacking:</strong> Control component rendering</li>
        </ul>
      </div>

      <div className="section">
        <h2>Example 1: withToggle HOC</h2>
        <p>
          Add toggle functionality to any component:
        </p>
        
        <div className="code-block">
          <pre>{`// HOC that provides toggle state
function withToggle(Component) {
  return function WithToggle(props) {
    const [isOn, setIsOn] = useState(false);
    const toggle = () => setIsOn(!isOn);

    return <Component {...props} isOn={isOn} toggle={toggle} />;
  };
}

// Simple component
function Button({ isOn, toggle }) {
  return (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

// Wrap it with HOC
const EnhancedButton = withToggle(Button);

// Use the enhanced component
function App() {
  return <EnhancedButton />;
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <EnhancedButton />
        </div>
      </div>

      <div className="section">
        <h2>Example 2: withAuth HOC</h2>
        <p>
          Protect components by checking authentication:
        </p>
        
        <div className="code-block">
          <pre>{`// HOC that checks authentication
function withAuth(Component) {
  return function WithAuth(props) {
    const isAuthenticated = checkAuth(); // Your auth logic

    if (!isAuthenticated) {
      return <div>Please log in</div>;
    }

    return <Component {...props} isAuthenticated={isAuthenticated} />;
  };
}

// Protected component
function UserProfile({ isAuthenticated }) {
  return (
    <div>
      <h3>Welcome to your profile!</h3>
      <p>Status: {isAuthenticated ? 'Logged in' : 'Guest'}</p>
    </div>
  );
}

// Wrap it
const ProtectedProfile = withAuth(UserProfile);

// Use it - will show login prompt if not authenticated
function App() {
  return <ProtectedProfile />;
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo (authenticated user):</div>
          <ProtectedProfile />
        </div>
      </div>

      <div className="section">
        <h2>Example 3: withLogger HOC</h2>
        <p>
          Add logging to any component for debugging:
        </p>
        
        <div className="code-block">
          <pre>{`// HOC that logs props
function withLogger(Component) {
  return function WithLogger(props) {
    console.log(\`Rendering \${Component.name} with:\`, props);
    return <Component {...props} />;
  };
}

// Any component
function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}

// Wrap it for logging
const LoggedGreeting = withLogger(Greeting);

// Every render will log props to console
function App() {
  return <LoggedGreeting name="Alice" />;
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Example Output:</div>
          <div style={{ 
            background: '#1e1e1e', 
            color: '#d4d4d4', 
            padding: '1rem', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ color: '#9cdcfe' }}>console.log:</div>
            <div style={{ marginLeft: '1rem' }}>
              Rendering Greeting with: {'{name: "Alice"}'}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Composing Multiple HOCs</h2>
        <p>
          You can compose multiple HOCs together:
        </p>
        
        <div className="code-block">
          <pre>{`// Compose multiple HOCs
const EnhancedComponent = withAuth(
  withLogger(
    withToggle(MyComponent)
  )
);

// Or use a compose utility (from lodash or similar)
import { compose } from 'lodash/fp';

const enhance = compose(
  withAuth,
  withLogger,
  withToggle
);

const EnhancedComponent = enhance(MyComponent);`}</pre>
        </div>
      </div>

      <div className="section">
        <h2>Best Practices</h2>
        <ol>
          <li>
            <strong>Don't Mutate the Original Component:</strong> Create and return a new component
          </li>
          <li>
            <strong>Pass Through Props:</strong> Use spread operator to pass all props: <code>{'<Component {...props} />'}</code>
          </li>
          <li>
            <strong>Use Display Names:</strong> Set displayName for better debugging
            <div className="code-block" style={{ marginTop: '0.5rem' }}>
              <pre>{`WithToggle.displayName = \`withToggle(\${Component.name})\`;`}</pre>
            </div>
          </li>
          <li>
            <strong>Don't Use HOCs Inside render:</strong> Create enhanced components outside
          </li>
          <li>
            <strong>Copy Static Methods:</strong> If needed, use hoist-non-react-statics library
          </li>
        </ol>
      </div>

      <div className="section">
        <h2>Caveats and Modern Alternatives</h2>
        <p>
          While HOCs are powerful, they have some drawbacks:
        </p>
        <ul>
          <li><strong>Wrapper Hell:</strong> Multiple HOCs create deep component trees</li>
          <li><strong>Prop Naming Collisions:</strong> HOCs might override props</li>
          <li><strong>Static Composition:</strong> Must be applied before component use</li>
        </ul>
        <p>
          <strong>Modern Alternative:</strong> In most cases, <span className="highlight">Custom Hooks</span> provide 
          a cleaner solution. Hooks allow you to share stateful logic without adding components to the tree.
        </p>
        
        <div className="code-block">
          <pre>{`// Instead of HOC...
const EnhancedButton = withToggle(Button);

// Use a custom hook
function Button() {
  const { isOn, toggle } = useToggle();
  return <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>;
}`}</pre>
        </div>
      </div>

      <div className="section">
        <h2>When to Use HOCs</h2>
        <p>
          Consider HOCs when:
        </p>
        <ul>
          <li>You need to reuse logic across class components (pre-hooks)</li>
          <li>You want to conditionally render different components</li>
          <li>You're working with legacy code that uses HOCs</li>
          <li>You need to wrap third-party components you can't modify</li>
        </ul>
        <p>
          For new code, prefer Custom Hooks for sharing stateful logic, and use HOCs primarily 
          for cross-cutting concerns like authentication, logging, or theming.
        </p>
      </div>
    </PatternLayout>
  );
}

export default HigherOrderComponentsPage;
