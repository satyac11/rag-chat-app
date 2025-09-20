# RAG Chat App

A modern chat interface built with React that implements Retrieval-Augmented Generation (RAG) for enhanced conversational AI responses. The app features a clean, responsive design with dark/light theme support.

## Features

- Real-time chat interface
- Dark/Light theme toggle
- Automatic message scrolling
- Loading states for better UX
- Responsive design
- Message history preservation
- Markdown formatting support
- Error handling

## Tech Stack

- React
- Vite
- CSS3 (with CSS Variables for theming)
- RESTful API integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/satyac11/rag-chat-app.git
cd rag-chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## API Integration

The app communicates with a backend server running on `http://localhost:8080`. Ensure the server is running and accessible.

API Endpoints:
- POST `/api/msg` - Sends user messages and receives AI responses

## Development

### Project Structure

```
rag-chat-app/
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
└── package.json
```

### Theme Configuration

The app uses CSS variables for theming. Theme colors can be configured in `App.css`:

```css
:root[data-theme="light"] {
  --bg-color: #f5f5f5;
  --text-color: #333;
  // ...other variables
}

:root[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #fff;
  // ...other variables
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
