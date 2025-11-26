# Building Coordinate Mapping

## Original Map Buildings (from new_qcu_map.glb)

### ✅ ALL 6 BUILDINGS DETECTED:

1. **TechVoc** (qcu_bldg6.glb)
   - Position: `[-0.56, 0.02, 0]`
   - Rotation: none
   - Scale: none

2. **Yellow_Bldg** (qcu_bldg5.glb)
   - Position: `[1, 0.02, -2]`
   - Rotation: none
   - Scale: none

3. **Admin_bldg** (qcu_bldg4.glb)
   - Position: `[-1.259, 0.02, -4.72]`
   - Rotation: none
   - Scale: none

4. **Bautista** (qcu_bldg2.glb)
   - Position: `[-1.2, 0.02, -7.5]`
   - Rotation: none
   - Scale: `[0.9, 1, 1]`

5. **Cube009 group** - qcu_bldg1.glb
   - Position: `[3, 0.02, -4.6]`
   - Rotation: `[0, -1.571, 0]` (90° counterclockwise)
   - Scale: `0.518`

6. **Cube010 group** - qcu_bldg3.glb
   - Position: `[3, 0.02, -7.3]`
   - Rotation: `[0, -1.571, 0]` (90° counterclockwise)
   - Scale: `0.602`

### Non-Interactive Elements:
- **wall** - Position: `[-0.7, 0.02, 0]`
- **Bleachers** - Position: `[-0.6, 0.02, 0]`
- **Triangle** - Position: `[0, 0.02, 5.8]`, Scale: `0.2`
- **Cube004 group** (floor/ground) - Scale: `[8, 1, 9.9]`
- **Trees** (palm and oak) - Various positions

---

## Exported Building Files

---

## 🎯 CONFIRMED MAPPING:

Based on the node names, here's the mapping:

- `qcu_bldg2.glb` (Bautista) → Position: `[-1.2, 0.02, -7.5]`, Scale: `[0.9, 1, 1]`
- `qcu_bldg4.glb` (Admin_bldg) → Position: `[-1.259, 0.02, -4.72]`
- `qcu_bldg5.glb` (Yellow_Bldg) → Position: `[1, 0.02, -2]`
- `qcu_bldg6.glb` (TechVoc) → Position: `[-0.56, 0.02, 0]`
- `qcu_bldg_comp_lab.glb` (Cube009) → Position: `[3, 0.02, -4.6]`, Rotation: `[0, -1.571, 0]`, Scale: `0.518` ✅ ALREADY CORRECT

**QUESTION:** What is `qcu_bldg1.glb`? 
- It contains "Cube_1" and "Cube_2" with built-in scale 0.864
- Likely corresponds to **Cube010 group** at Position: `[3, 0.02, -7.3]`, Rotation: `[0, -1.571, 0]`, Scale: `0.602`

---

## Notes
- The node names in the exports match the original map perfectly!
- Most buildings just need their world positions applied
- Built-in transforms in the GLB files may need to be compensated for
