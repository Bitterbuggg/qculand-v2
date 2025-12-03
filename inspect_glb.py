
import re

try:
    with open('public/models/qcu_dorm.glb', 'rb') as f:
        data = f.read(100000) # Read enough to cover the JSON header
        # Find all "name":"value" pairs
        matches = re.findall(b'"name":"(.*?)"', data)
        for m in matches:
            print(m.decode('utf-8', errors='ignore'))
except Exception as e:
    print(f"Error: {e}")
