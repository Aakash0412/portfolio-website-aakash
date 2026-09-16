import re

with open("app/(public)/page.tsx", "r") as f:
    html = f.read()

body_match = re.search(r'<body>(.*?)</body>', html, re.DOTALL)
if body_match:
    body = body_match.group(1)
else:
    body = html

body = body.replace('class=', 'className=')
body = body.replace('for=', 'htmlFor=')

body = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', body, flags=re.DOTALL)

body = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1 />', body)
body = re.sub(r'<hr([^>]*?)(?<!/)>', r'<hr\1 />', body)
body = re.sub(r'<br([^>]*?)(?<!/)>', r'<br\1 />', body)
body = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1 />', body)

body = re.sub(r'style="([^"]+)"', lambda m: 'style={{' + ', '.join([f'"{k.strip()}": "{v.strip()}"' for k, v in [pair.split(':', 1) for pair in m.group(1).split(';') if ':' in pair]]) + '}}', body)

body = body.replace('style={{"--delay": "60ms"}}', 'style={{ "--delay": "60ms" } as React.CSSProperties}')
body = body.replace('style={{"--delay": "80ms"}}', 'style={{ "--delay": "80ms" } as React.CSSProperties}')
body = body.replace('style={{"--delay": "100ms"}}', 'style={{ "--delay": "100ms" } as React.CSSProperties}')
body = body.replace('style={{"--delay": "120ms"}}', 'style={{ "--delay": "120ms" } as React.CSSProperties}')
body = body.replace('style={{"--delay": "140ms"}}', 'style={{ "--delay": "140ms" } as React.CSSProperties}')
body = body.replace('style={{"--mouse-x": "0px", "--mouse-y": "0px"}}', 'style={{ "--mouse-x": "0px", "--mouse-y": "0px" } as React.CSSProperties}')

jsx = f"""export default function PortfolioPage() {{
  return (
    <>
{body}
    </>
  );
}}
"""

with open("app/(public)/page.tsx", "w") as f:
    f.write(jsx)

print("Converted HTML to JSX")
