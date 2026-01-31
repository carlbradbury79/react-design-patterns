import { useState, createContext, useContext } from 'react';
import PatternLayout from '../../components/PatternLayout';

// Example 1: Tab Component using Compound Pattern
const TabContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {children}
      </div>
    </TabContext.Provider>
  );
}

function TabList({ children }) {
  return (
    <div style={{ 
      display: 'flex', 
      borderBottom: '2px solid #e0e0e0',
      background: '#f9f9f9'
    }}>
      {children}
    </div>
  );
}

function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const isActive = activeTab === index;

  return (
    <button
      onClick={() => setActiveTab(index)}
      style={{
        padding: '1rem 2rem',
        border: 'none',
        background: isActive ? 'white' : 'transparent',
        borderBottom: isActive ? '3px solid #667eea' : '3px solid transparent',
        cursor: 'pointer',
        fontWeight: isActive ? '600' : '400',
        color: isActive ? '#667eea' : '#666',
        transition: 'all 0.3s',
      }}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  const { activeTab } = useContext(TabContext);
  return <div>{children[activeTab]}</div>;
}

function TabPanel({ children }) {
  return <div style={{ padding: '2rem' }}>{children}</div>;
}

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Example 2: Accordion Component
const AccordionContext = createContext();

function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      <div style={{ 
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ children, index }) {
  const { openIndex, toggle } = useContext(AccordionContext);
  const isOpen = openIndex === index;

  return (
    <div style={{ borderBottom: '1px solid #e0e0e0' }}>
      <button
        onClick={() => toggle(index)}
        style={{
          width: '100%',
          padding: '1rem 1.5rem',
          border: 'none',
          background: isOpen ? '#f0f0f0' : 'white',
          textAlign: 'left',
          cursor: 'pointer',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{children[0]}</span>
        <span style={{ fontSize: '1.2rem' }}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div style={{ padding: '1rem 1.5rem', background: '#fafafa' }}>
          {children[1]}
        </div>
      )}
    </div>
  );
}

Accordion.Item = AccordionItem;

// Example 3: Toggle with Label
const ToggleContext = createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);

  return (
    <ToggleContext.Provider value={{ on, setOn }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        padding: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: 'white'
      }}>
        {children}
      </div>
    </ToggleContext.Provider>
  );
}

function ToggleButton() {
  const { on, setOn } = useContext(ToggleContext);

  return (
    <button
      onClick={() => setOn(!on)}
      style={{
        width: '60px',
        height: '30px',
        borderRadius: '15px',
        border: 'none',
        background: on ? '#4caf50' : '#ccc',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.3s',
      }}
    >
      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: 'white',
          position: 'absolute',
          top: '2px',
          left: on ? '32px' : '2px',
          transition: 'left 0.3s',
        }}
      />
    </button>
  );
}

function ToggleLabel() {
  const { on } = useContext(ToggleContext);
  return <span style={{ fontWeight: '600' }}>Status: {on ? 'ON' : 'OFF'}</span>;
}

Toggle.Button = ToggleButton;
Toggle.Label = ToggleLabel;

function CompoundComponentsPage() {
  return (
    <PatternLayout
      title="Compound Components Pattern"
      description="Create components that work together to form a cohesive UI with shared implicit state. This pattern creates expressive and flexible APIs."
    >
      <div className="section">
        <h2>What are Compound Components?</h2>
        <p>
          Compound Components is a pattern where components are designed to work together, 
          sharing an implicit state. The parent component manages the state, and child components 
          access it through React Context. This creates a more expressive and flexible API.
        </p>
        <p>
          Think of it like HTML elements - <code>&lt;select&gt;</code> and <code>&lt;option&gt;</code> 
          work together, where <code>&lt;select&gt;</code> manages which option is selected. 
          Compound components work the same way in React.
        </p>
      </div>

      <div className="section">
        <h2>Key Benefits</h2>
        <ul>
          <li><strong>Flexible API:</strong> Components can be arranged in any order</li>
          <li><strong>Separation of Concerns:</strong> Each component has a single responsibility</li>
          <li><strong>Implicit State:</strong> No need to manually pass state through props</li>
          <li><strong>Expressive JSX:</strong> The structure is self-documenting</li>
        </ul>
      </div>

      <div className="section">
        <h2>Example 1: Tab Component</h2>
        <p>
          A classic example - tabs that share state without explicit prop passing:
        </p>
        
        <div className="code-block">
          <pre>{`// Create context for shared state
const TabContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const isActive = activeTab === index;

  return (
    <button onClick={() => setActiveTab(index)}>
      {children}
    </button>
  );
}

function TabPanel({ children }) {
  return <div>{children}</div>;
}

// Attach as sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage - clean and expressive!
function App() {
  return (
    <Tabs defaultTab={0}>
      <Tabs.List>
        <Tabs.Tab index={0}>Profile</Tabs.Tab>
        <Tabs.Tab index={1}>Settings</Tabs.Tab>
        <Tabs.Tab index={2}>Messages</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>Profile content...</Tabs.Panel>
        <Tabs.Panel>Settings content...</Tabs.Panel>
        <Tabs.Panel>Messages content...</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <Tabs defaultTab={0}>
            <Tabs.List>
              <Tabs.Tab index={0}>👤 Profile</Tabs.Tab>
              <Tabs.Tab index={1}>⚙️ Settings</Tabs.Tab>
              <Tabs.Tab index={2}>💬 Messages</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panels>
              <Tabs.Panel>
                <h3>Profile</h3>
                <p>Your profile information goes here. Edit your bio, avatar, and more.</p>
              </Tabs.Panel>
              <Tabs.Panel>
                <h3>Settings</h3>
                <p>Configure your preferences, privacy settings, and notifications.</p>
              </Tabs.Panel>
              <Tabs.Panel>
                <h3>Messages</h3>
                <p>View and manage your messages, conversations, and chat history.</p>
              </Tabs.Panel>
            </Tabs.Panels>
          </Tabs>
        </div>
      </div>

      <div className="section">
        <h2>Example 2: Accordion Component</h2>
        <p>
          Build an expandable accordion with shared collapse state:
        </p>
        
        <div className="code-block">
          <pre>{`const AccordionContext = createContext();

function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      {children}
    </AccordionContext.Provider>
  );
}

function AccordionItem({ children, index }) {
  const { openIndex, toggle } = useContext(AccordionContext);
  const isOpen = openIndex === index;

  return (
    <div>
      <button onClick={() => toggle(index)}>
        {children[0]} {isOpen ? '−' : '+'}
      </button>
      {isOpen && <div>{children[1]}</div>}
    </div>
  );
}

Accordion.Item = AccordionItem;

// Usage
function FAQ() {
  return (
    <Accordion>
      <Accordion.Item index={0}>
        <h3>What is React?</h3>
        <p>React is a JavaScript library...</p>
      </Accordion.Item>
      <Accordion.Item index={1}>
        <h3>Why use React?</h3>
        <p>React makes building UIs easier...</p>
      </Accordion.Item>
    </Accordion>
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <Accordion>
            <Accordion.Item index={0}>
              What is React?
              <p style={{ margin: '0.5rem 0 0 0' }}>
                React is a JavaScript library for building user interfaces, particularly 
                single-page applications. It allows developers to create reusable UI components.
              </p>
            </Accordion.Item>
            <Accordion.Item index={1}>
              Why use compound components?
              <p style={{ margin: '0.5rem 0 0 0' }}>
                Compound components provide a flexible and expressive API, make state management 
                implicit, and result in cleaner, more maintainable code.
              </p>
            </Accordion.Item>
            <Accordion.Item index={2}>
              When should I use this pattern?
              <p style={{ margin: '0.5rem 0 0 0' }}>
                Use compound components when building UI components that have multiple related 
                parts that need to share state, like tabs, accordions, or dropdown menus.
              </p>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      <div className="section">
        <h2>Example 3: Toggle with Label</h2>
        <p>
          Simple toggle switch with separate button and label components:
        </p>
        
        <div className="code-block">
          <pre>{`const ToggleContext = createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);

  return (
    <ToggleContext.Provider value={{ on, setOn }}>
      <div>{children}</div>
    </ToggleContext.Provider>
  );
}

function ToggleButton() {
  const { on, setOn } = useContext(ToggleContext);
  return <button onClick={() => setOn(!on)}>Toggle</button>;
}

function ToggleLabel() {
  const { on } = useContext(ToggleContext);
  return <span>Status: {on ? 'ON' : 'OFF'}</span>;
}

Toggle.Button = ToggleButton;
Toggle.Label = ToggleLabel;

// Usage - components can be arranged flexibly
function App() {
  return (
    <Toggle>
      <Toggle.Label />
      <Toggle.Button />
    </Toggle>
  );
}`}</pre>
        </div>

        <div className="demo-container">
          <div className="demo-title">Live Demo:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Toggle>
              <Toggle.Label />
              <Toggle.Button />
            </Toggle>
            <Toggle>
              <Toggle.Button />
              <Toggle.Label />
            </Toggle>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            Notice how the same components can be arranged in different orders!
          </p>
        </div>
      </div>

      <div className="section">
        <h2>Implementation Steps</h2>
        <ol>
          <li>
            <strong>Create Context:</strong> Use React Context to share state
            <div className="code-block" style={{ marginTop: '0.5rem' }}>
              <pre>{`const MyComponentContext = createContext();`}</pre>
            </div>
          </li>
          <li>
            <strong>Parent Provides State:</strong> The main component manages and provides state
            <div className="code-block" style={{ marginTop: '0.5rem' }}>
              <pre>{`function Parent({ children }) {
  const [state, setState] = useState();
  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  );
}`}</pre>
            </div>
          </li>
          <li>
            <strong>Children Consume State:</strong> Child components use useContext
            <div className="code-block" style={{ marginTop: '0.5rem' }}>
              <pre>{`function Child() {
  const { state } = useContext(Context);
  return <div>{state}</div>;
}`}</pre>
            </div>
          </li>
          <li>
            <strong>Attach as Properties:</strong> Make sub-components available as properties
            <div className="code-block" style={{ marginTop: '0.5rem' }}>
              <pre>{`Parent.Child = Child;`}</pre>
            </div>
          </li>
        </ol>
      </div>

      <div className="section">
        <h2>Best Practices</h2>
        <ol>
          <li>
            <strong>Use Meaningful Names:</strong> Name contexts and components clearly
          </li>
          <li>
            <strong>Validate Context Usage:</strong> Check if context is used within provider
            <div className="code-block" style={{ marginTop: '0.5rem' }}>
              <pre>{`const context = useContext(MyContext);
if (!context) {
  throw new Error('Component must be used within Parent');
}`}</pre>
            </div>
          </li>
          <li>
            <strong>Keep State Local:</strong> Only share what's necessary via context
          </li>
          <li>
            <strong>Document Usage:</strong> Show examples of how components work together
          </li>
        </ol>
      </div>

      <div className="section">
        <h2>When to Use This Pattern</h2>
        <p>
          Compound Components are ideal when:
        </p>
        <ul>
          <li>Building UI components with multiple related parts (tabs, menus, etc.)</li>
          <li>You want a flexible component API that allows reordering</li>
          <li>Components need to share state implicitly</li>
          <li>You're creating a component library for others to use</li>
        </ul>
        <p>
          This pattern shines in design systems and UI libraries where you want to give 
          consumers maximum flexibility while maintaining state consistency.
        </p>
      </div>

      <div className="section">
        <h2>Comparison with Other Patterns</h2>
        <ul>
          <li>
            <strong>vs Props:</strong> More flexible, but requires more setup
          </li>
          <li>
            <strong>vs Render Props:</strong> More implicit, cleaner JSX
          </li>
          <li>
            <strong>vs Custom Hooks:</strong> Better for components that render together
          </li>
        </ul>
        <p>
          Choose compound components when the relationship between components is 
          structural and visual, not just logical.
        </p>
      </div>
    </PatternLayout>
  );
}

export default CompoundComponentsPage;
