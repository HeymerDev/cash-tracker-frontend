"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ExpensesGrafic = ({ porcentage }: { porcentage: number }) => {
  return (
    <div className="flex justify-center p-10">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: porcentage >= 100 ? "#DC2626" : "#F59E0B",
          trailColor: "#E1E1E1",
          textColor: "#F59E0B",
          textSize: 8,
        })}
        text={`${porcentage}% Gastado`}
        value={porcentage}
      />
    </div>
  );
};
