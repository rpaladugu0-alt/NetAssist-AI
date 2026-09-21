export const DEMO_DISCLAIMER =
  "Prototype / Demo Data: Live telemetry simulated for testing. This is not a live ClearWave network feed.";

export const serviceAreas = [
  {
    id: "north-charlotte",
    name: "North Charlotte",
    aliases: ["north charlotte", "n charlotte", "university area"],
    status: "outage",
    statusLabel: "Service Outage",
    estimatedRestoration: "Today by 08:30 AM EDT",
    lastUpdated: "Today at 02:05 AM EDT",
    details:
      "Fiber backbone splice affecting distribution node NC-14. Field crews are on site restoring the primary ring.",
    impact:
      "Customers may experience a complete loss of internet and voice service until the splice is completed.",
  },
  {
    id: "south-charlotte",
    name: "South Charlotte",
    aliases: ["south charlotte", "ballantyne", "pineville"],
    status: "operational",
    statusLabel: "Operational",
    estimatedRestoration: "No restoration needed",
    lastUpdated: "Today at 02:18 AM EDT",
    details: "All distribution nodes report normal upstream and downstream lock.",
    impact: "No service-impacting events are currently simulated for this area.",
  },
  {
    id: "uptown-charlotte",
    name: "Uptown Charlotte",
    aliases: ["uptown", "uptown charlotte", "center city", "downtown charlotte"],
    status: "operational",
    statusLabel: "Operational",
    estimatedRestoration: "No restoration needed",
    lastUpdated: "Today at 02:16 AM EDT",
    details: "Core metro ring telemetry is within normal operating thresholds.",
    impact: "No service-impacting events are currently simulated for this area.",
  },
  {
    id: "matthews",
    name: "Matthews",
    aliases: ["matthews", "matthew"],
    status: "degraded",
    statusLabel: "Degraded Service",
    estimatedRestoration: "Today by 05:00 AM EDT",
    lastUpdated: "Today at 02:20 AM EDT",
    details: "Scheduled upstream distribution node firmware maintenance.",
    impact:
      "Customers may experience intermittent latency or brief packet drops during failover testing.",
  },
  {
    id: "concord",
    name: "Concord",
    aliases: ["concord", "kannapolis"],
    status: "operational",
    statusLabel: "Operational",
    estimatedRestoration: "No restoration needed",
    lastUpdated: "Today at 02:12 AM EDT",
    details: "Residential nodes are reporting stable SNR and normal utilization.",
    impact: "No service-impacting events are currently simulated for this area.",
  },
];

export function findServiceArea(text) {
  const normalized = text.toLowerCase();
  return serviceAreas.find((area) =>
    area.aliases.some((alias) => normalized.includes(alias)),
  );
}
