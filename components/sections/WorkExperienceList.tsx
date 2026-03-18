import type { IExperience } from "@/lib/schemas";

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

interface WorkExperienceListProps {
  experiences: IExperience[];
}

export function WorkExperienceList({ experiences }: WorkExperienceListProps) {
  return (
    <ul className="flex flex-col">
      {experiences.map((exp, i) => (
        <li
          key={`${exp.company}-${exp.startDate}`}
          className={`flex justify-between items-baseline py-4 ${
            i < experiences.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div>
            <span className="text-foreground font-medium">{exp.company}</span>
            <span className="font-mono text-xs text-muted ml-2 uppercase tracking-wider">
              {exp.role}
            </span>
          </div>
          <span className="font-mono text-xs text-muted">
            {formatDate(exp.startDate)} –{" "}
            {exp.endDate ? formatDate(exp.endDate) : "Present"}
          </span>
        </li>
      ))}
    </ul>
  );
}
