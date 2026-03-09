"use client";

import { BIRTH_DATE, phases, events } from "@/data/lifeEvents";
import { useState, useEffect, useRef } from "react";
import type { Phase, Category } from "@/data/lifeEvents";

const CELL_SIZE = 22;
const CELL_GAP = 3;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const TOTAL_WEEKS = 86 * 52;
const CHAR_WIDTH = 7.2; // monospace text-xs char width in px
const LABEL_PADDING = 20; // total horizontal padding in label
const EMOJI_WIDTH = 18;

function getWeekIndex(date: Date): number {
  return Math.floor((date.getTime() - BIRTH_DATE.getTime()) / (7 * 24 * 60 * 60 * 1000));
}

function getWeekDate(weekIndex: number): Date {
  return new Date(BIRTH_DATE.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
}

function getPhaseForWeek(weekIndex: number): Phase | null {
  const weekDate = getWeekDate(weekIndex);
  return phases.find((p) => weekDate >= p.start && weekDate < p.end) ?? null;
}

function getEventForWeek(weekIndex: number, activeCategories: Set<Category>): { label: string; emoji: string } | null {
  const weekStart = getWeekDate(weekIndex);
  const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
  const allMatches = events.filter(
    (e) => e.date >= weekStart && e.date < weekEnd && activeCategories.has(e.category)
  );
  if (allMatches.length === 0) return null;
  const nonBirthday = allMatches.find((e) => e.emoji !== "🎂");
  return nonBirthday ?? allMatches[0];
}

function getLabelWidth(label: string): number {
  return LABEL_PADDING + EMOJI_WIDTH + label.length * CHAR_WIDTH;
}

type Block =
  | { type: "cell"; weekIndex: number; width: number }
  | { type: "event"; weekIndex: number; label: string; emoji: string; width: number };

function buildBlocks(activeCategories: Set<Category>): Block[] {
  const blocks: Block[] = [];
  for (let w = 0; w < TOTAL_WEEKS; w++) {
    const event = getEventForWeek(w, activeCategories);
    if (event) {
      blocks.push({ type: "event", weekIndex: w, ...event, width: getLabelWidth(event.label) });
    } else {
      blocks.push({ type: "cell", weekIndex: w, width: CELL_SIZE });
    }
  }
  return blocks;
}

function packIntoRows(blocks: Block[], rowWidth: number): Block[][] {
  const rows: Block[][] = [];
  let currentRow: Block[] = [];
  let currentWidth = 0;

  for (const block of blocks) {
    const needed = currentWidth === 0 ? block.width : block.width + CELL_GAP;
    if (currentWidth + needed > rowWidth && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [block];
      currentWidth = block.width;
    } else {
      currentRow.push(block);
      currentWidth += needed;
    }
  }
  if (currentRow.length > 0) rows.push(currentRow);
  return rows;
}

const currentWeek = getWeekIndex(new Date());
const ALL_CATEGORIES: Category[] = ["personal", "education", "work", "travel"];

const categoryColors: Record<Category, string> = {
  personal: "bg-violet-500",
  education: "bg-emerald-500",
  work: "bg-blue-500",
  travel: "bg-amber-500",
};

export default function LifeInWeeks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rowWidth, setRowWidth] = useState(800);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(new Set(ALL_CATEGORIES));

  const toggleCategory = (cat: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setRowWidth(containerRef.current.offsetWidth - 60); // subtract year label width
      }
    };
    update();
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const allBlocks = buildBlocks(activeCategories);
  const rows = packIntoRows(allBlocks, rowWidth);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto" ref={containerRef}>
      <p className="font-mono text-cyan-400 text-sm mb-2">Life in Weeks</p>
      <h1 className="text-3xl font-bold text-white mb-2">Every week of my life</h1>
      <p className="text-zinc-500 text-sm mb-10 font-mono">
        Each box is one week.{" "}
        <span className="text-cyan-400">{currentWeek}</span> weeks lived so far.
      </p>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono capitalize border transition-all ${
              activeCategories.has(cat)
                ? `${categoryColors[cat]} border-transparent text-white`
                : "bg-transparent border-zinc-700 text-zinc-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-12">
        {phases.map((p) => (
          <div key={p.label} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded-sm ${p.color}`} />
            <span className="text-zinc-400 text-xs font-mono">{p.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-sm bg-cyan-400" />
          <span className="text-zinc-400 text-xs font-mono">Current week</span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-px">
        {rows.map((row, rowIndex) => {
          const firstWeek = row.find((b) => b.type === "cell" || b.type === "event")!;
          const year = new Date(BIRTH_DATE.getTime() + firstWeek.weekIndex * 7 * 24 * 60 * 60 * 1000).getFullYear();
          const prevRowFirstWeek = rowIndex > 0 ? rows[rowIndex - 1][0] : null;
          const prevYear = prevRowFirstWeek
            ? new Date(BIRTH_DATE.getTime() + prevRowFirstWeek.weekIndex * 7 * 24 * 60 * 60 * 1000).getFullYear()
            : null;
          const showYear = year !== prevYear;

          return (
            <div key={rowIndex} className="flex items-center gap-2" style={{ minHeight: CELL_SIZE + 2 }}>
              <span className="font-mono text-xs w-10 shrink-0 text-right pr-1 leading-none" style={{ color: showYear ? "#71717a" : "transparent" }}>
                {year}
              </span>
              <div className="flex items-center gap-px">
                {row.map((block, i) => {
                  if (block.type === "event") {
                    return (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-sm bg-zinc-800 border border-zinc-600 text-zinc-200 whitespace-nowrap cursor-default"
                        style={{ height: CELL_SIZE, fontSize: "11px" }}
                      >
                        {block.emoji} {block.label}
                      </span>
                    );
                  }

                  const isPast = block.weekIndex < currentWeek;
                  const isCurrent = block.weekIndex === currentWeek;
                  const phase = getPhaseForWeek(block.weekIndex);

                  let cls = "rounded-sm cursor-default transition-transform hover:scale-150 hover:z-10 shrink-0 ";
                  if (isCurrent) cls += "bg-cyan-400";
                  else if (isPast && phase) cls += phase.color;
                  else if (isPast) cls += "bg-zinc-600";
                  else cls += "border border-zinc-700";

                  return (
                    <div
                      key={i}
                      className={cls}
                      style={{ width: CELL_SIZE, height: CELL_SIZE }}
                      onMouseEnter={(e) => {
                        const d = getWeekDate(block.weekIndex);
                        setTooltip({
                          text: d.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                          x: e.clientX,
                          y: e.clientY - 36,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {tooltip && (
        <div
          className="fixed z-50 bg-zinc-900 border border-zinc-600 text-white text-xs px-3 py-1.5 rounded pointer-events-none font-mono shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
