# React Design Patterns

A comprehensive React application demonstrating essential React design patterns. Each pattern is explained with interactive code examples to help developers learn and master React best practices.

## 🎯 Features

- **5 Essential React Patterns** - Learn the most important patterns used in modern React development
- **Interactive Examples** - Live demos for each pattern with working code
- **Explained Code** - Every example includes detailed explanations and use cases
- **Search Functionality** - Quickly find patterns by name or description
- **Modular Structure** - Each pattern is contained in its own directory for easy navigation

## 📚 Patterns Included

1. **Component Composition** - Build complex UIs by composing smaller, reusable components
2. **Render Props** - Share code between components using a prop whose value is a function
3. **Higher-Order Components (HOC)** - Reuse component logic by wrapping components
4. **Custom Hooks** - Extract component logic into reusable functions (Modern approach)
5. **Compound Components** - Create components that work together with shared state

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/carlbradbury79/react-design-patterns.git

# Navigate to the project directory
cd react-design-patterns

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── patterns/
│   ├── component-composition/
│   │   └── ComponentCompositionPage.jsx
│   ├── render-props/
│   │   └── RenderPropsPage.jsx
│   ├── higher-order-components/
│   │   └── HigherOrderComponentsPage.jsx
│   ├── custom-hooks/
│   │   └── CustomHooksPage.jsx
│   └── compound-components/
│       └── CompoundComponentsPage.jsx
├── components/
│   ├── PatternLayout.jsx
│   └── PatternLayout.css
├── pages/
│   ├── HomePage.jsx
│   └── HomePage.css
├── App.jsx
└── main.jsx
```

## 📖 Usage

1. **Browse Patterns** - The home page displays all available patterns
2. **Search** - Use the search bar to filter patterns by name or description
3. **Learn** - Click on any pattern to see detailed explanations and live examples
4. **Experiment** - Interact with the demos to see how each pattern works

## 🔧 Adding New Patterns

The app is designed to be easily extensible. To add a new pattern:

1. Create a new directory in `src/patterns/[pattern-name]`
2. Create a page component: `[PatternName]Page.jsx`
3. Add the route in `src/App.jsx`
4. Add the pattern metadata to the array in `src/pages/HomePage.jsx`

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Library
- [React Router](https://reactrouter.com/) - Routing
- [Vite](https://vitejs.dev/) - Build Tool

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new patterns
- Improve existing examples
- Fix bugs
- Enhance documentation

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- React documentation and community
- Various React pattern resources and articles
- Open source contributors
