import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Contatore: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Incrementa</button>
      <button onClick={() => setCount(count - 1)}>Decrementa</button>
    </>
  )
}

export default App
