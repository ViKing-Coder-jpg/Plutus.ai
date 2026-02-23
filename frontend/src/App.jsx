import { Button } from "@/components/ui/button"
import './App.css'

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold text-blue-600">
        Chaliye shuru karte hai. 
      </h1>
      <Button size="lg" className="px-8 shadow-lg">
        Click Me! (Shadcn Button)
      </Button>
    </div>
  )
}

export default App
