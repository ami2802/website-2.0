"use client";

import { useState, useEffect, useCallback } from "react";

type Exercise = {
  name: string;
  abbreviation?: string;
  superset?: string;
  weight: string;
  reps: string;
  target: string;
};

export default function GymPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [dayLabel, setDayLabel] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [allExercises, setAllExercises] = useState<
    { day: string; group: string; exercises: Exercise[] }[]
  >([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (dayLabel && muscleGroup) {
      document.title = `${dayLabel}: ${muscleGroup} Day`;
    } else {
      document.title = "Gym Tracker";
    }
  }, [dayLabel, muscleGroup]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const dayToGroup = (day: string) => {
    switch (day) {
      case "Sunday":
      case "Wednesday":
        return "Push";
      case "Monday":
      case "Thursday":
        return "Pull";
      case "Tuesday":
      case "Friday":
        return "Leg";
      default:
        return "";
    }
  };

  const supersetColors: Record<string, string> = {
    "superset A": "#284B63",
    "superset B": "#153243",
    "superset C": "#1e429f",
  };
  const getColorsForSection = (group: string, exercises: Exercise[]) => {
    if (group === "Push" || exercises.some((ex) => !ex.superset)) {
      return {
        default: "#284B63",
        "superset A": "#153243",
        "superset B": "#1e429f",
      };
    }
    return supersetColors;
  };

  const colors = getColorsForSection(muscleGroup, exercises);

  const exerciseMap: Record<string, string> = {
    "Tricep extension": "Tricep ext.",
    "Leg extension": "Leg ext.",
    "Romanian deadlift": "Romanian DL",
    "Lateral pulldown": "Lat pulldown",
    "Wrist extension": "Wrist ext.",
  };

  const fetchMd = useCallback(async (): Promise<void> => {
    try {
      const res = await fetch("/api/get", {
        cache: "no-store",
        headers: { "x-password": password },
      });
      const data = await res.json();

      if (res.status === 401) {
        setLoggedIn(false);
        setError("Incorrect password");
        return;
      }

      if (!data.content) {
        setError(data.error || "Failed to load file");
        return;
      }

      const md = data.content;
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      const group = dayToGroup(today);
      setMuscleGroup(group);
      setDayLabel(today);

      const sections: string[] = md
        .split("\n## ")
        .map((s: string) => s.replace(/^## /, ""));
      const todaySection = sections.find((s) =>
        s.toLowerCase().includes(group.toLowerCase()),
      );
      if (!todaySection) {
        setExercises([]);
        setError(`No workout scheduled for today (${today})`);
        return;
      }

      const exerciseMatches = todaySection.matchAll(
        /### (.+?)(?:\s*<!--\s*(superset [A-Z])\s*-->)?\n(?:#### .+\n)?- (\d+)x(\d+) @ (\d+(?:\.\d+)?)kg\n- Target: ([\d–]+)/g,
      );
      const parsedExercises: Exercise[] = [];
      for (const match of exerciseMatches) {
        const [, name, superset, , reps, weightStr, target] = match;
        const cleanName = name.trim();
        parsedExercises.push({
          name: cleanName,
          abbreviation: exerciseMap[cleanName] ?? cleanName,
          superset: superset ? superset.trim() : "",
          reps: reps.trim(),
          weight: weightStr.trim(),
          target: target.trim(),
        });
      }

      setExercises(parsedExercises);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch or parse md");
    }
  }, []);

  useEffect(() => {
    if (loggedIn) fetchMd();
  }, [loggedIn, fetchMd]);

  const handleLogin = () => {
    if (!password) {
      setError("Enter password");
      return;
    }
    setError("");
    setLoggedIn(true);
  };

  const handleChangeWeight = (index: number, value: string) => {
    const copy = [...exercises];
    copy[index].weight = value;
    setExercises(copy);
  };

  const handleChangeReps = (index: number, value: string) => {
    const copy = [...exercises];
    copy[index].reps = value;
    setExercises(copy);
  };

  const headerStyle = {
    display: "flex",
    fontWeight: "bold",
    marginBottom: 8,
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#0070f3",
    color: "white",
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    const updates = exercises.map((ex) => ({
      name: ex.name,
      reps: ex.reps,
      weight: ex.weight,
    }));

    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, updates }),
      });
      const data = await res.json();
      if (data.success) setSuccess("Saved successfully!");
      else setError(data.error || "Failed to save");
    } catch {
      setError("Network error");
    }
    setSaving(false);
  };

  const handleShowOtherDays = async () => {
    try {
      const res = await fetch("/api/get", {
        headers: { "x-password": password },
      });
      const data = await res.json();
      if (!data.content) return;

      const md = data.content;
      const sections: string[] = md
        .split("\n## ")
        .map((s: string) => s.replace(/^## /, ""));

      const parsedAll: { day: string; group: string; exercises: Exercise[] }[] =
        [];

      sections.forEach((section) => {
        const groupMatch = section.match(/^(Push|Pull|Leg)/i);
        if (!groupMatch) return;
        const group = groupMatch[1];
        if (group === muscleGroup) return;

        const dayMatch = section.match(/\((.*?)\)/);
        const day = dayMatch ? dayMatch[1] : "Unknown";

        const exerciseMatches = section.matchAll(
          /### (.+?)(?:\s*<!--\s*(superset [A-Z])\s*-->)?\n(?:#### .+\n)?- (\d+)x(\d+) @ (\d+(?:\.\d+)?)kg\n- Target: ([\d–]+)/g,
        );

        const exercisesArr: Exercise[] = [];
        for (const match of exerciseMatches) {
          const [, name, superset, , reps, weightStr, target] = match;
          const cleanName = name.trim();
          exercisesArr.push({
            name: cleanName,
            abbreviation: exerciseMap[cleanName] ?? cleanName,
            superset: superset ? superset.trim() : "",
            reps: reps.trim(),
            weight: weightStr.trim(),
            target: target.trim(),
          });
        }

        parsedAll.push({ day, group, exercises: exercisesArr });
      });

      setAllExercises(parsedAll);
      setShowAll(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!loggedIn)
    return (
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: 12, fontSize: 24, fontWeight: "bold" }}>
          Enter password
        </h2>
        {error && <p style={{ color: "red", marginBottom: 8 }}>{error}</p>}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: 12,
            fontSize: 16,
            width: "80%",
            maxWidth: 300,
            marginBottom: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: 12,
            fontSize: 16,
            borderRadius: 8,
            width: "50%",
            maxWidth: 200,
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
          }}
        >
          Login
        </button>
      </div>
    );

  const cellStyle = {
    padding: 8,
    boxSizing: "border-box" as const,
  };

  const inputStyle = {
    width: "100%",
    padding: 6,
    borderRadius: 6,
    border: "1px solid #ccc",
    textAlign: "center" as const,
    boxSizing: "border-box" as const,
    fontSize: 14,
  };

  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {dayLabel && muscleGroup && (
        <h2 style={{ marginBottom: 12, fontSize: 24, fontWeight: "bold" }}>
          {`${dayLabel} - ${muscleGroup} Day`}
        </h2>
      )}
      {error && <p style={{ color: "red", marginBottom: 8 }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: 8 }}>{success}</p>}

      {exercises.length > 0 && (
        <div style={{ width: "100%", maxWidth: 700 }}>
          <div style={{ display: "flex", fontWeight: "bold", marginBottom: 8 }}>
            <div style={{ flex: 3, ...cellStyle }}>Exercise</div>
            <div style={{ width: 80, textAlign: "center", ...cellStyle }}>
              Weight
            </div>
            <div style={{ width: 80, textAlign: "center", ...cellStyle }}>
              Reps
            </div>
            <div style={{ width: 80, textAlign: "center", ...cellStyle }}>
              Target
            </div>
          </div>

          {exercises.map((ex, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
                padding: 4,
                borderRadius: 6,
                backgroundColor:
                  colors[ex.superset ?? ""] ??
                  colors["default"] ??
                  "transparent",
                color: ex.superset ? "white" : "inherit",
              }}
            >
              <div style={{ flex: 3, ...cellStyle, fontSize: 14 }}>
                {isMobile ? ex.abbreviation : ex.name}
              </div>
              <div style={{ width: 80, ...cellStyle }}>
                <input
                  type="text"
                  value={ex.weight}
                  onChange={(e) => handleChangeWeight(i, e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ width: 80, ...cellStyle }}>
                <input
                  type="text"
                  value={ex.reps}
                  onChange={(e) => handleChangeReps(i, e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div
                style={{
                  width: 80,
                  ...cellStyle,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {ex.target}
              </div>
            </div>
          ))}
        </div>
      )}

      {dayLabel && muscleGroup && exercises.length > 0 && (
        <>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: 12,
              fontSize: 16,
              borderRadius: 8,
              width: "60%",
              maxWidth: 250,
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              marginTop: 16,
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={handleShowOtherDays}
            style={{
              padding: 12,
              fontSize: 16,
              borderRadius: 8,
              width: "60%",
              maxWidth: 250,
              backgroundColor: "#666",
              color: "white",
              border: "none",
              marginTop: 16,
            }}
          >
            Show Other Days
          </button>
        </>
      )}

      {showAll &&
        allExercises.map((section, i) => {
          const colors = getColorsForSection(section.group, section.exercises);

          return (
            <div
              key={i}
              style={{ marginTop: 32, width: "100%", maxWidth: 700 }}
            >
              <h3
                style={{ marginBottom: 12, fontSize: 18, fontWeight: "bold" }}
              >
                {`${section.day} - ${section.group}`}
              </h3>

              <div
                style={{ display: "flex", fontWeight: "bold", marginBottom: 8 }}
              >
                <div style={{ flex: 3, ...cellStyle }}>Exercise</div>
                <div style={{ width: 80, textAlign: "center", ...cellStyle }}>
                  Weight
                </div>
                <div style={{ width: 80, textAlign: "center", ...cellStyle }}>
                  Reps
                </div>
                <div style={{ width: 80, textAlign: "center", ...cellStyle }}>
                  Target
                </div>
              </div>

              {section.exercises.map((ex, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 12,
                    padding: 4,
                    borderRadius: 6,
                    backgroundColor:
                      colors[ex.superset ?? ""] ??
                      colors["default"] ??
                      "transparent",
                    color: ex.superset ? "white" : "inherit",
                  }}
                >
                  <div style={{ flex: 3, ...cellStyle, fontSize: 14 }}>
                    {isMobile ? ex.abbreviation : ex.name}
                  </div>
                  <div style={{ width: 80, textAlign: "center", ...cellStyle }}>
                    {ex.weight}
                  </div>
                  <div style={{ width: 80, textAlign: "center", ...cellStyle }}>
                    {ex.reps}
                  </div>
                  <div style={{ width: 80, textAlign: "center", ...cellStyle }}>
                    {ex.target}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
}
