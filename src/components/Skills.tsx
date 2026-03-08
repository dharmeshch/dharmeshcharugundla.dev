"use client";

import { skills } from "@/data/skills";

const primary = new Set(["Apache Flink", "Apache Kafka", "Airflow", "Java", "Python", "Hive", "PostgreSQL", "Presto"]);
const mid = new Set(["AWS", "Terraform", "Docker", "Jenkins"]);

const getSize = (skill: string) =>
  primary.has(skill) ? "text-3xl opacity-100" :
  mid.has(skill)     ? "text-xl opacity-80" :
                       "text-sm opacity-55";

const allSkills = Object.values(skills).flat();

export default function Skills() {
  return (
    <section id="technologies" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-cyan-400 text-sm mb-2">03. Technologies</h2>
        <h3 className="text-3xl font-bold text-white mb-12">Technologies I work with</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
          {allSkills.map((skill, i) => (
            <span
              key={skill}
              className={`font-mono font-semibold text-cyan-400 ${getSize(skill)} hover:opacity-100 hover:text-white transition-all cursor-default`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
