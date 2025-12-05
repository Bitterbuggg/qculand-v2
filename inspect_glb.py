import sys
import re
import json
import struct

def extract_glb_json(file_path):
    try:
        with open(file_path, 'rb') as f:
            # GLB Header: magic(4), version(4), length(4)
            magic = f.read(4)
            if magic != b'glTF':
                print("Not a valid GLB file.")
                return

            version = struct.unpack('<I', f.read(4))[0]
            length = struct.unpack('<I', f.read(4))[0]

            # Chunk 0: JSON
            chunk_length = struct.unpack('<I', f.read(4))[0]
            chunk_type = f.read(4)
            
            if chunk_type != b'JSON':
                print("First chunk is not JSON.")
                return

            json_data = f.read(chunk_length)
            return json.loads(json_data)

    except Exception as e:
        print(f"Error reading GLB: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python inspect_glb.py <path_to_glb>")
        sys.exit(1)

    file_path = sys.argv[1]
    gltf = extract_glb_json(file_path)
    
    if gltf:
        print(f"--- Inspecting {file_path} ---")
        
        if 'nodes' in gltf:
            print(f"\nFound {len(gltf['nodes'])} nodes:")
            for i, node in enumerate(gltf['nodes']):
                name = node.get('name', f"Node_{i}")
                print(f" - {name}")
        else:
            print("\nNo nodes found.")
            
        if 'meshes' in gltf:
             print(f"\nFound {len(gltf['meshes'])} meshes:")
             for i, mesh in enumerate(gltf['meshes']):
                name = mesh.get('name', f"Mesh_{i}")
                print(f" - {name}")