import { useState } from 'react';
import PatternLayout from '../../components/PatternLayout';

// Example 1: Mouse Tracker with Render Props
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      style={{ 
        border: '2px solid #667eea',
        borderRadius: '8px',
        padding: '2rem',
        minHeight: '200px',
        background: '#f9f9f9'
      }}
    >
      {render(position)}
    </div>
  );
}

// Example 2: Toggle Component with Render Props
function Toggle({ children }) {
  const [on, setOn] = useState(false);

  const toggle = () => setOn(!on);

  return children({
    on,
    toggle,
  });
}

// Example 3: Data Fetching with Render Props
function DataLoader({ data, render }) {
  const [loading] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return render(data);
}

function RenderPropsPage() {
  const sampleUsers = [
    { id: 1, name: 'Alice Johnson', role: 'Developer' },
    { id: 2, name: 'Bob Smith', role: 'Designer' },
    { id: 3, name: 'Carol White', role: 'Manager' },
  ];

  return (
    <PatternLayout
      title="Render Props Pattern"
      description="Share code between components using a prop whose value is a function, enabling flexible and reusable component logic."
    >
      <div className="section">
        <h2>What are Render Props?</h2>
        <p>
          The Render Props pattern is a technique for sharing code between React components using 
          a prop whose value is a function. A component with a render prop takes a function that 
          returns a React element and calls it instead of implementing its own render logic.
        </p>
        <p>
          This pattern is powerful because it allows you to share stateful logic without changing 
          your component hierarchy. The component that uses the render prop decides 
          <span className="highlight"> what to render</span>, while the component providing the 
          render prop handles <span className="highlight">how to manage state or behavior</span>.
        </p>
      </div>

      <div className="section">
        <h2>Key Benefits</h2>
        <ul>
          <li><strong>Flexibility:</strong> Consumers control what gets rendered</li>
          <li><strong>Reusability:</strong> Share logic across different UIs</li>
          <li><strong>Separation of Concerns:</strong> Separate behavior from presentation</li>
          <li><strong>No Wrapper Hell:</strong> Avoid deeply nested component trees</li>
        </ul>
      </div>

      <div className="section">
        <h2>Example 1: Mouse Position Tracker</h2>
        <p>
          A classic example - track mouse position and let the consumer decide how to display it:
        </p>
        
        <div className="code-block">
          <pre>{`function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage - consumer controls the rendering
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <h2>Mouse position: ({x}, {y})</h2>
      )}
    />
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo - Move your mouse in the box:</div>
          <MouseTracker
            render={({ x, y }) => (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#667eea' }}>
                  Mouse Position: ({x}, {y})
                </h3>
                <div 
                  style={{
                    width: '20px',
                    height: '20px',
                    background: '#667eea',
                    borderRadius: '50%',
                    margin: '1rem auto',
                  }}
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="section">
        <h2>Example 2: Toggle State Management</h2>
        <p>
          Manage toggle state while letting consumers render any UI:
        </p>
        
        <div className="code-block">
          <pre>{`function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return children({ on, toggle });
}

// Usage - different UIs with same logic
function App() {
  return (
    <Toggle>
      {({ on, toggle }) => (
        <div>
          <button onClick={toggle}>
            {on ? 'Turn Off' : 'Turn On'}
          </button>
          {on && <p>The light is ON!</p>}
        </div>
      )}
    </Toggle>
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <Toggle>
            {({ on, toggle }) => (
              <div>
                <button
                  onClick={toggle}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: on ? '#f44336' : '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  {on ? '💡 Turn Off' : '🔦 Turn On'}
                </button>
                <div style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                  Status: <strong>{on ? '✅ ON' : '⭕ OFF'}</strong>
                </div>
              </div>
            )}
          </Toggle>
        </div>
      </div>

      <div className="section">
        <h2>Example 3: Data Display</h2>
        <p>
          Handle data loading/display logic while consumers control presentation:
        </p>
        
        <div className="code-block">
          <pre>{`function DataLoader({ data, render }) {
  const [loading] = useState(false);

  if (loading) return <div>Loading...</div>;
  
  return render(data);
}

// Usage
function UserList() {
  const users = [/* user data */];
  
  return (
    <DataLoader
      data={users}
      render={(users) => (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    />
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <DataLoader
            data={sampleUsers}
            render={(users) => (
              <div>
                {users.map(user => (
                  <div
                    key={user.id}
                    style={{
                      padding: '1rem',
                      marginBottom: '0.5rem',
                      background: 'white',
                      borderRadius: '6px',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <strong>{user.name}</strong> - {user.role}
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      <div className="section">
        <h2>Alternative: Children as a Function</h2>
        <p>
          Instead of a <code>render</code> prop, you can use <code>children</code> as a function. 
          This is often preferred as it reads more naturally:
        </p>
        
        <div className="code-block">
          <pre>{`// Same component, using children instead of render prop
<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>
      {on ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>`}</pre>
        </div>
      </div>

      <div className="section">
        <h2>Best Practices</h2>
        <ol>
          <li>
            <strong>Use Descriptive Prop Names:</strong> 'render' is common, but be specific (e.g., 'renderHeader')
          </li>
          <li>
            <strong>Provide Default Renders:</strong> Offer a default implementation when possible
          </li>
          <li>
            <strong>Consider Custom Hooks:</strong> For simple cases, custom hooks might be cleaner
          </li>
          <li>
            <strong>Document Parameters:</strong> Make it clear what data is passed to render functions
          </li>
        </ol>
      </div>

      <div className="section">
        <h2>When to Use This Pattern</h2>
        <p>
          Render Props work best when:
        </p>
        <ul>
          <li>You need to share stateful logic across components</li>
          <li>The rendering logic varies significantly between use cases</li>
          <li>You want to avoid HOC wrapper components</li>
          <li>You're building a library that others will customize</li>
        </ul>
        <p>
          <strong>Note:</strong> In modern React, Custom Hooks often provide a cleaner solution 
          for sharing stateful logic. Consider hooks first, and use render props when you 
          specifically need render-time flexibility.
        </p>
      </div>
    </PatternLayout>
  );
}

export default RenderPropsPage;
