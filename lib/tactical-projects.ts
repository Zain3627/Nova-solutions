// Client-only mock store for the tactical-analysis pipeline. The real video
// processing is being built separately; until it's wired in, projects live in
// localStorage and "processing" projects flip to "ready" after a short delay
// so the upload -> report flow can be demoed end to end.

export type ProjectStatus = "processing" | "ready" | "failed";

export type TacticalProject = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  status: ProjectStatus;
  createdAt: number;
  fileName?: string;
};

const STORAGE_KEY = "nova.tacticalProjects";
const PROCESSING_MS = 7000;

const SEED_PROJECTS: TacticalProject[] = [
  {
    id: "seed-ready-1",
    homeTeam: "Manchester United",
    awayTeam: "Arsenal",
    date: "2026-10-18",
    status: "ready",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "seed-processing-1",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    date: "2026-10-24",
    status: "processing",
    createdAt: Date.now() - 1000 * 15,
  },
];

function readRaw(): TacticalProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TacticalProject[];
  } catch {
    return [];
  }
}

function writeRaw(projects: TacticalProject[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

/** Reads all projects, seeding demo data on first run and advancing any
 * "processing" project past its simulated processing window to "ready". */
export function getProjects(): TacticalProject[] {
  let projects = readRaw();
  if (projects.length === 0) {
    projects = SEED_PROJECTS;
    writeRaw(projects);
  }

  const now = Date.now();
  let changed = false;
  const advanced = projects.map((project) => {
    if (project.status === "processing" && now - project.createdAt > PROCESSING_MS) {
      changed = true;
      return { ...project, status: "ready" as const };
    }
    return project;
  });

  if (changed) writeRaw(advanced);
  return advanced;
}

export function getProject(id: string): TacticalProject | undefined {
  return getProjects().find((project) => project.id === id);
}

export function addProject(input: {
  homeTeam: string;
  awayTeam: string;
  fileName?: string;
}): TacticalProject {
  const projects = readRaw();
  const project: TacticalProject = {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `project-${Date.now()}`,
    homeTeam: input.homeTeam,
    awayTeam: input.awayTeam,
    date: new Date().toISOString().slice(0, 10),
    status: "processing",
    createdAt: Date.now(),
    fileName: input.fileName,
  };
  writeRaw([project, ...projects]);
  return project;
}
