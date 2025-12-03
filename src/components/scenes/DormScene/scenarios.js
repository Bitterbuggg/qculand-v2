export const dormScenarios = [
  {
    id: "account-setup-1",
    question: "Alright, I’m at the admin terminal. Time to make a password. Which one’s actually safe?",
    choices: [
      { text: "Mango123", correct: false },
      { text: "QcuBee!2025#Secure", correct: true },
      { text: "ernestopassword", correct: false },
    ],
    successAnimation: "win",
    successMessage: "Nice! A strong password keeps your account safe, even on a shared terminal.",
    failMessage: "Too simple! Make it longer and trickier next time."
  },

  {
    id: "account-setup-2",
    question: "The terminal asks if I want to turn on Multi-Factor Authentication (MFA). Should I do it?",
    choices: [
      { text: "Yeah, extra security is good", correct: true },
      { text: "Nah, skip it", correct: false },
      { text: "Turn everything off", correct: false },
    ],
    successAnimation: "win",
    successMessage: "Good move! MFA adds an extra layer of security on shared computers.",
    failMessage: "Skipping MFA leaves your account at risk. Always turn it on!"
  },

  {
    id: "email-setup-1",
    question: "The email system asks if I want to forward messages from outside sources. Do I turn it on?",
    choices: [
      { text: "Sure, might be handy", correct: false },
      { text: "Better keep it off for now", correct: true },
      { text: "Hmm, not sure, leave it on", correct: false },
    ],
    successAnimation: "win",
    successMessage: "Smart! Keeping forwarding off reduces risk on shared terminals.",
    failMessage: "Forwarding unknown emails could be risky. Keep it off!"
  },

  {
    id: "wifi-setup-1",
    question: "Okay, the terminal shows a bunch of Wi-Fi options. Which one do I pick?",
    choices: [
      { text: "QCU_Secure_WiFi", correct: true },
      { text: "QCU_FreePublicWiFi", correct: false },
      { text: "Open_QCU_Guest", correct: false },
    ],
    successAnimation: "win",
    successMessage: "Exactly! Secure network only, especially on shared computers.",
    failMessage: "Public Wi-Fi can be dangerous. Stick to the secure one!"
  },

  {
    id: "admin-access-1",
    question: "The system asks me to verify my identity. How do I do it safely?",
    choices: [
      { text: "Use my student ID + a security question", correct: true },
      { text: "Just the student ID", correct: false },
      { text: "Skip it, whatever", correct: false },
    ],
    successAnimation: "win",
    successMessage: "Perfect! Verification is key when using shared systems.",
    failMessage: "Skipping verification could let others access your account. Always verify!"
  },

  {
    id: "social-media-1",
    question: "I wanna post a pic of my registration slip online. What should I cover up?",
    choices: [
      { text: "My student ID number", correct: true },
      { text: "The registration date", correct: false },
      { text: "My major", correct: false },
    ],
    successAnimation: "win",
    successMessage: "Right! Don’t share personal info online, especially after using public terminals.",
    failMessage: "Sharing sensitive info online is risky. Keep your student ID private!"
  },

  {
    id: "phishing-1",
    question: "I get an email saying: 'URGENT! Confirm your registration now!' What do I do?",
    choices: [
      { text: "Check the sender and link first", correct: true },
      { text: "Click it right away", correct: false },
      { text: "Ignore it, it’s probably fine", correct: false },
    ],
    successAnimation: "win",
    successMessage: "Nice! Always double-check emails before clicking, especially on a shared terminal.",
    failMessage: "Phishing emails can look real. Always check links and senders first!"
  },

  {
    id: "final-boss",
    isBoss: true,
    question: "Whoa! A fake login screen just popped up on the terminal. What do I do?",
    choices: [
      { text: "Check the URL and app before typing anything", correct: true },
      { text: "Type my password fast", correct: false },
      { text: "Ignore it and hope for the best", correct: false },
    ],
    successAnimation: "bossExplode",
    successMessage: "Yes! You dodged a phishing attack and kept your account safe!",
    failMessage: "Never type credentials on a suspicious screen. Shared computers are risky!"
  }
];
