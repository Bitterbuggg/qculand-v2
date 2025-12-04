
import re
import sys

file_path = 'public/models/qcu_student_1.glb'

try:
    with open(file_path, 'rb') as f:
        # Read a large chunk to hopefully cover the JSON header where animation names are usually stored
        # GLB header is 12 bytes, followed by JSON chunk. 
        # 5MB should be enough to capture the JSON structure for most models unless it has huge embedded buffers before the json (unlikely for GLB standard)
        data = f.read(5000000) 
        
        # Find all "name":"value" pairs which might indicate animation names or node names
        # Animation names are usually top-level properties or inside 'animations' array
        matches = re.findall(b'"name":"(.*?)"', data)
        
        print(f"--- Strings found in {file_path} (potential animation names) ---")
        for m in matches:
            try:
                decoded = m.decode('utf-8')
                # Filter out some common noise if possible, but listing all is safer
                print(decoded)
            except:
                pass
except Exception as e:
    print(f"Error: {e}")
