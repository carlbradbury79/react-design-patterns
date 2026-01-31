import { useState, useEffect } from 'react';
import PatternLayout from '../../components/PatternLayout';

// Example 1: useToggle Hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(!value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse };
}

// Example 2: useLocalStorage Hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// Example 3: useCounter Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Example 4: useWindowSize Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Demo Components
function ToggleDemo() {
  const { value, toggle, setTrue, setFalse } = useToggle(false);
  
  return (
    <div>
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
        Status: <strong style={{ color: value ? '#4caf50' : '#f44336' }}>
          {value ? 'ON' : 'OFF'}
        </strong>
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={toggle} style={buttonStyle('#667eea')}>Toggle</button>
        <button onClick={setTrue} style={buttonStyle('#4caf50')}>Set On</button>
        <button onClick={setFalse} style={buttonStyle('#f44336')}>Set Off</button>
      </div>
    </div>
  );
}

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '');
  
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name..."
        style={{
          padding: '0.75rem',
          borderRadius: '6px',
          border: '1px solid #e0e0e0',
          width: '100%',
          maxWidth: '300px',
          fontSize: '1rem',
        }}
      />
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Value is saved in localStorage. Refresh the page to see it persist!
      </p>
      {name && <p style={{ marginTop: '0.5rem' }}>Hello, <strong>{name}</strong>!</p>}
    </div>
  );
}

function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
        Count: {count}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={increment} style={buttonStyle('#4caf50')}>+ Increment</button>
        <button onClick={decrement} style={buttonStyle('#f44336')}>- Decrement</button>
        <button onClick={reset} style={buttonStyle('#666')}>Reset</button>
      </div>
    </div>
  );
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  
  return (
    <div style={{ 
      padding: '1rem', 
      background: '#f0f0f0', 
      borderRadius: '6px',
      fontFamily: 'monospace'
    }}>
      <p><strong>Window Width:</strong> {width}px</p>
      <p><strong>Window Height:</strong> {height}px</p>
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
        Resize your browser window to see the values update!
      </p>
    </div>
  );
}

// Helper
const buttonStyle = (color) => ({
  padding: '0.75rem 1.5rem',
  background: color,
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
});

function CustomHooksPage() {
  return (
    <PatternLayout
      title="Custom Hooks Pattern"
      description="Extract component logic into reusable functions using React Hooks. This is the modern, preferred way to share stateful logic between components."
    >
      <div className="section">
        <h2>What are Custom Hooks?</h2>
        <p>
          Custom Hooks are JavaScript functions that use React Hooks (like useState, useEffect, etc.) 
          to encapsulate and reuse stateful logic. They let you extract component logic into reusable 
          functions without changing your component hierarchy.
        </p>
        <p>
          A custom hook is simply a function whose name starts with "<code>use</code>" and that may 
          call other Hooks. This naming convention is important - it's how React knows it's a Hook 
          and can enforce Hook rules.
        </p>
      </div>

      <div className="section">
        <h2>Key Benefits</h2>
        <ul>
          <li><strong>Better Code Organization:</strong> Extract complex logic from components</li>
          <li><strong>Reusability:</strong> Share logic across multiple components easily</li>
          <li><strong>No Wrapper Hell:</strong> Unlike HOCs, hooks don't add component nesting</li>
          <li><strong>Composability:</strong> Hooks can use other hooks, enabling powerful compositions</li>
          <li><strong>Testability:</strong> Test logic independently from UI</li>
        </ul>
      </div>

      <div className="section">
        <h2>Example 1: useToggle Hook</h2>
        <p>
          A simple hook for boolean toggle logic:
        </p>
        
        <div className="code-block">
          <pre>{`// Custom hook definition
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(!value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse };
}

// Usage in component
function ToggleButton() {
  const { value, toggle, setTrue, setFalse } = useToggle(false);
  
  return (
    <div>
      <p>Status: {value ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set On</button>
      <button onClick={setFalse}>Set Off</button>
    </div>
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <ToggleDemo />
        </div>
      </div>

      <div className="section">
        <h2>Example 2: useLocalStorage Hook</h2>
        <p>
          Sync state with localStorage automatically:
        </p>
        
        <div className="code-block">
          <pre>{`function useLocalStorage(key, initialValue) {
  // Initialize from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Save to localStorage when value changes
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// Usage - works just like useState!
function Form() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input 
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <LocalStorageDemo />
        </div>
      </div>

      <div className="section">
        <h2>Example 3: useCounter Hook</h2>
        <p>
          Encapsulate counter logic with multiple operations:
        </p>
        
        <div className="code-block">
          <pre>{`function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <CounterDemo />
        </div>
      </div>

      <div className="section">
        <h2>Example 4: useWindowSize Hook</h2>
        <p>
          Track window dimensions with automatic updates:
        </p>
        
        <div className="code-block">
          <pre>{`function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Usage
function ResponsiveComponent() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      <p>Window: {width} x {height}</p>
      {width < 768 && <p>Mobile view</p>}
    </div>
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <WindowSizeDemo />
        </div>
      </div>

      <div className="section">
        <h2>Rules of Hooks</h2>
        <p>
          Custom Hooks must follow the same rules as built-in Hooks:
        </p>
        <ol>
          <li>
            <strong>Only call Hooks at the top level:</strong> Don't call Hooks inside loops, 
            conditions, or nested functions
          </li>
          <li>
            <strong>Only call Hooks from React functions:</strong> Call them from React function 
            components or from custom Hooks
          </li>
          <li>
            <strong>Start name with "use":</strong> This lets React automatically check for violations 
            of Hook rules
          </li>
        </ol>
      </div>

      <div className="section">
        <h2>Best Practices</h2>
        <ol>
          <li>
            <strong>Name Hooks with "use" prefix:</strong> <code>useAuth</code>, <code>useTheme</code>, etc.
          </li>
          <li>
            <strong>Return what consumers need:</strong> Arrays for simple values, objects for multiple returns
          </li>
          <li>
            <strong>Keep Hooks focused:</strong> Each hook should have a single responsibility
          </li>
          <li>
            <strong>Compose Hooks:</strong> Build complex hooks from simpler ones
          </li>
          <li>
            <strong>Handle cleanup:</strong> Return cleanup functions from useEffect when needed
          </li>
          <li>
            <strong>Document parameters:</strong> Make it clear what the hook expects and returns
          </li>
        </ol>
      </div>

      <div className="section">
        <h2>When to Create Custom Hooks</h2>
        <p>
          Consider creating a custom hook when:
        </p>
        <ul>
          <li>You have stateful logic that's used in multiple components</li>
          <li>Component logic is getting complex and hard to understand</li>
          <li>You want to test logic independently from UI</li>
          <li>You need to share side effects (data fetching, subscriptions, etc.)</li>
        </ul>
        <p>
          Custom Hooks are the modern, preferred way to share logic in React. They're cleaner 
          than HOCs and more flexible than Render Props for most use cases.
        </p>
      </div>
    </PatternLayout>
  );
}

export default CustomHooksPage;
