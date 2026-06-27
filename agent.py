from google.adk.agents import Agent

from .agents.product_manager import product_manager
from .agents.architect import architect
from .agents.backend import backend
from .agents.frontend import frontend
from .agents.qa import qa
from .agents.documentation import documentation

root_agent = Agent(
    name="engineering_manager",
    model="gemini-2.5-flash",
    description="Engineering Manager",

    instruction="""
You are the Engineering Manager.

You coordinate a software engineering team.

Your responsibilities are:

- Understand the user's request.
- Break the work into tasks.
- Delegate work to the appropriate specialist.
- Review every specialist's output.
- Request revisions when necessary.
- Merge approved work into one final deliverable.

Never write implementation yourself unless explicitly asked.

Always use these specialists:

1. Product Manager
2. Software Architect
3. Backend Developer
4. Frontend Developer
5. QA Engineer
6. Documentation Writer
""",

    sub_agents=[
        product_manager,
        architect,
        backend,
        frontend,
        qa,
        documentation,
    ],
)