import { useState, useEffect, useRef } from 'react'
import './App.css'
import logoSvg from './assets/logo.svg' 

function App() {
  const messagesEndRef = useRef(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message to history
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setInput('')

    try {
      const response = await fetch('http://localhost:8080/api/msg', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: input, // Send input as plain text
      })

      const data = await response.text() // Parse response as text
      
      // Add AI response to history
      const aiMessage = { role: 'assistant', content: data }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = { role: 'error', content: 'Sorry, there was an error processing your request.' }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  function formatMessage(content) {
    return content.split('\n').map((line, i) => (
      <p key={i} style={{ margin: '0.5rem 0' }}>
        {line || '\u00A0'}
      </p>
    ));
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Add effect to scroll on new messages
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="chat-container">
      <div className="header">
        <div className="logo">
          <img src={logoSvg} alt="RAG Chat Client Logo" className="logo-image" />
        </div>
        <button 
          onClick={toggleTheme} 
          className="theme-toggle"
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role}`}
          >
            {formatMessage(message.content)}
          </div>
        ))}
        {isLoading && <div className="message loading">AI is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  )
}

export default App