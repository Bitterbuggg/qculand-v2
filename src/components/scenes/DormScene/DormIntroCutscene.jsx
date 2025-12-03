import { useState, useRef, useEffect } from "react";

export default function DormIntroCutscene({
  onFinish,
  studentRef,
  bossRef,
  setDialogue,
  setCamera,
}) {
  const [step, setStep] = useState(0);
  const timerRef = useRef(null);

  const playAnim = (ref, name) => {
    if (!ref.current?.actions) return;
    const actions = ref.current.actions;
    Object.values(actions).forEach((a) => a.stop());
    actions[name]?.reset().fadeIn(0.3).play();
  };

  const steps = [
    {
      dialog: { speaker: "Juan", text: "Alright, time to register at QCU and set up my account..." },
      anim() { playAnim(studentRef, "Idle"); },
      camera: "juan",
      duration: 1500,
    },
    {
      dialog: { speaker: "Lockdown", text: "Welcome to QCU, Juan. But do you really know how to secure your new account?" },
      anim() { playAnim(bossRef, "Idle.1"); },
      camera: "lockdown",
      duration: 2000,
    },
    {
      dialog: { speaker: "Lockdown", text: "Most students skip security steps. Let’s see how easy it is to compromise your account!" },
      anim() { playAnim(bossRef, "laughing"); },
      camera: "lockdown",
      duration: 2000,
    },
    {
      dialog: { speaker: "Juan", text: "I need to make sure everything is locked down before moving forward..." },
      anim() { playAnim(studentRef, "typing"); },
      camera: "juan",
      duration: 1800,
    },
    {
      dialog: { speaker: "Lockdown", text: "Too late. I’ve already got access to your registration." },
      anim() { playAnim(bossRef, "Idle.3"); },
      camera: "lockdown",
      duration: 2000,
    },
    {
      dialog: { speaker: "Juan", text: "No way! I’ve got to stop you before you take control!" },
      anim() { playAnim(studentRef, "win"); },
      camera: "juan",
      duration: 1800,
    },
    {
      dialog: { speaker: "Lockdown", text: "You can't escape me. Once I’ve got a hold of your account, it's game over!" },
      anim() { playAnim(bossRef, "move_forward"); },
      camera: "lockdown",
      duration: 2000,
    },
    {
      dialog: { speaker: "Juan", text: "Not if I set up a secure account right now!" },
      anim() { playAnim(studentRef, "win"); },
      camera: "juan",
      duration: 1800,
    },
    {
      dialog: { speaker: "", text: "" },
      anim() {},
      camera: "juan",
      duration: 1000,
    },
  ];

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const s = steps[step];
    if (!s) {
      onFinish();
      return;
    }

    setDialogue(s.dialog);
    setCamera(s.camera);
    s.anim();

    timerRef.current = setTimeout(() => setStep((p) => p + 1), s.duration);

    return () => clearTimeout(timerRef.current);
  }, [step]);

  return null;
}
