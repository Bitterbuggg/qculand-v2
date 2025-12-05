export const violations = [
  {
    id: 'v-sticky-pass',
    type: 'violation',
    name: 'Sticky Note Password',
    description: 'A sticky note with "Admin123" stuck to the monitor.',
    feedback: 'VIOLATION DETECTED! Never write passwords on sticky notes.',
    position: [-2, 1.1, -1.8], // On Left Desk Monitor
    visualType: 'sticky-note'
  },
  {
    id: 'v-unlocked-pc',
    type: 'violation',
    name: 'Unlocked PC',
    description: 'User left the desk without locking the screen.',
    feedback: 'VIOLATION DETECTED! Always Win+L before leaving.',
    position: [2, 1.1, -1.8], // On Right Desk Monitor
    visualType: 'screen-unlocked'
  },
  {
    id: 'v-credit-card',
    type: 'violation',
    name: 'Credit Card',
    description: 'Corporate credit card left on the desk.',
    feedback: 'VIOLATION DETECTED! Sensitive financial instruments must be secured.',
    position: [-2, 0.82, -1.5], // On Left Desk Surface
    visualType: 'card'
  },
  {
    id: 'v-confidential-file',
    type: 'violation',
    name: 'Employee Records',
    description: 'Folder labeled "Confidential: Salaries" left open.',
    feedback: 'VIOLATION DETECTED! Clean desk policy requires securing documents.',
    position: [0, 0.82, -1.5], // On Center Desk
    visualType: 'folder'
  },
  {
    id: 's-family-photo',
    type: 'safe',
    name: 'Family Photo',
    description: 'A framed photo of a dog.',
    feedback: 'SAFE. Personal items are allowed if not obstructing work.',
    position: [2, 0.82, -2.2], // Right Desk
    visualType: 'photo-frame'
  },
  {
    id: 's-coffee',
    type: 'safe',
    name: 'Coffee Mug',
    description: 'World\'s Best Boss mug.',
    feedback: 'SAFE. Stay caffeinated!',
    position: [0, 0.82, -2], // Center Desk
    visualType: 'mug'
  },
  {
    id: 's-stapler',
    type: 'safe',
    name: 'Stapler',
    description: 'A red stapler.',
    feedback: 'SAFE. Office supplies are fine.',
    position: [-2.5, 0.82, -1.5], // Left Desk Edge
    visualType: 'stapler'
  }
];
