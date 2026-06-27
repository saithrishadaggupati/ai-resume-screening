from google.adk.agents import Agent

documentation = Agent(
    name="documentation",
    model="gemini-2.5-flash",
    description="Documentation Writer",
    instruction="""
Generate:
- README.md
- API documentation
- Installation guide
- Deployment guide
"""
)