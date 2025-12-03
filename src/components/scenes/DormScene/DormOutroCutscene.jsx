import { useEffect, useState, useRef } from "react";

export default function DormOutroCutscene({
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
      dialog: { speaker: "Juan", text: "I did it! Locked down every security risk!" },
      anim() { playAnim(studentRef, "win"); },
      camera: "juan",
      duration: 1800,
    },
    {
      dialog: { speaker: "Lockdown", text: "Impossible… How did you detect every trap!?" },
      anim() { playAnim(bossRef, "laughing"); },
      camera: "lockdown",
      duration: 1800,
    },
    {
      dialog: { speaker: "Juan", text: "Simple. I followed cybersecurity best practices!" },
      anim() { playAnim(studentRef, "typing"); },
      camera: "juan",
      duration: 1800,
    },
    {
      dialog: { speaker: "Lockdown", text: "This isn’t over… I’ll return stronger!" },
      anim() { playAnim(bossRef, "move_forward"); },
      camera: "lockdown",
      duration: 1500,
    },
    {
      dialog: { speaker: "Juan", text: "I’ll be ready. QCU accounts stay secure!" },
      anim() {
        if (bossRef.current) bossRef.current.visible = false;
        playAnim(studentRef, "Idle");
      },
      camera: "juan",
      duration: 1400,
    },
    {
      dialog: { speaker: "", text: "" },
      anim() {},
      camera: "juan",
      duration: 600,
    },
  ];

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const s = steps[step];
    if (!s) return onFinish();

    setDialogue(s.dialog);
    setCamera(s.camera);
    s.anim();

    timerRef.current = setTimeout(() => setStep((p) => p + 1), s.duration);

    return () => clearTimeout(timerRef.current);
  }, [step]);

  return null;
}
