import Header from "./components/Header"
import FeatureCard from "./components/FeatureCard"

function App() {
  return (
    <div>
      <Header />

      <div style={{ display: "grid", gap: "20px", padding: "20px" }}>
        <FeatureCard
          title="😂 Motivation Generator"
          description="Gives useless motivation"
        />
        <FeatureCard
          title="🤓 Dev Excuse Generator"
          description="Perfect excuses for deadlines"
        />
        <FeatureCard
          title="⏰ Am I Late?"
          description="Always yes"
        />
      </div>
    </div>
  )
}

export default App
