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
    <ul className="flex flex-col text-left w-full">
      {experiences.map((exp, i) => (
        <li
          key={`${exp.company}-${exp.startDate}`}
          className={`flex justify-between items-baseline pb-4 ${
            i < experiences.length - 1 ? "border-b border-border pt-4" : "pt-4"
          }`}
        >
          <div>
            <span className="block font-medium text-foreground">
              {exp.company}
            </span>
            <span className="block text-sm text-muted">{exp.role}</span>
          </div>
          <span className="text-sm text-muted tabular-nums shrink-0 ml-4">
            {formatDate(exp.startDate)} –{" "}
            {exp.endDate ? formatDate(exp.endDate) : "Present"}
          </span>
        </li>
      ))}
    </ul>
  );
}
