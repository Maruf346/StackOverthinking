function FeatureCard({ title, description }) {
  return (
    <div style={{ border: "1px solid #334155", padding: "16px", borderRadius: "10px" }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default FeatureCard
