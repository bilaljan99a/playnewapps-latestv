import re

def expand_file(filename, extra_sections):
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Insert before the Final Verdict section
    verdict_target = "<h2>8. Editor's Final Verdict"
    if verdict_target in content:
        content = content.replace(verdict_target, extra_sections + "\n\n            " + verdict_target)
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Expanded {filename} successfully!")
    else:
        print(f"Target not found in {filename}")

