# CSV Application Reviewer

A React application for reviewing CSV records one at a time with keyboard navigation and dark mode support.

## Features

- 📄 Parse and display CSV data with `papaparse`
- ⌨️ Keyboard navigation (←/→ arrow keys)
- 🌙 Dark mode toggle
- 📱 Mobile-responsive design with Tailwind CSS
- ♿ Accessibility features (ARIA, semantic HTML, focus management)
- 🎨 Beautiful UI with smooth animations and transitions

## Installation

1. Install dependencies:
```bash
npm install
```

## Usage

1. Start the development server:
```bash
npm start
```

2. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Navigation

- Use **←/→ arrow keys** to navigate between records
- Click **Previous/Next buttons** to navigate
- Toggle **dark mode** using the button in the header
- The app displays a **progress bar** showing current position
- Content **scrolls to top** automatically when changing records

## CSV Data

Place your CSV file as `public/responses.csv`. The app will automatically parse it and display each row as a reviewable record.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with progress bar and dark mode toggle
│   ├── RecordCard.jsx      # Card displaying current record data
│   └── FooterNav.jsx       # Navigation buttons and keyboard hint
├── hooks/
│   ├── useCSV.js          # CSV loading and parsing logic
│   └── useKeyboardNav.js   # Keyboard navigation handling
├── App.jsx                # Main application component
├── index.js               # React entry point
└── index.css              # Global styles and Tailwind imports
```

## Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Styling and responsive design
- **Papa Parse** - CSV parsing library
- **Create React App** - Build tooling

## Accessibility

- Semantic HTML elements
- ARIA labels and live regions
- Keyboard navigation support
- Focus management
- Screen reader compatibility 