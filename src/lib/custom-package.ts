export const CUSTOM_BASE_PRICE = 4495;

type Service = { id: string; p: boolean[] };

export function normalizeCustomServices(services: Service[], saved: Record<string, boolean> = {}) {
  return Object.fromEntries(services.map((service) => [service.id, service.p[2] || Boolean(saved[service.id])]));
}

export function toggleCustomService(services: Service[], current: Record<string, boolean>, id: string) {
  const normalized = normalizeCustomServices(services, current);
  if (!services.some((service) => service.id === id && !service.p[2])) return normalized;
  return { ...normalized, [id]: !normalized[id] };
}

function splitUpgrade(total: number, serviceIds: string[]) {
  const dollars = Math.round(Math.max(0, total));
  const each = Math.floor(dollars / (serviceIds.length + 1));
  return {
    services: Object.fromEntries(serviceIds.map((id) => [id, each])),
    year: dollars - each * serviceIds.length,
  };
}

export function customQuote(services: Service[], elite: number, standard: number, essential: number, on: Record<string, boolean>, years: 1 | 2 | 4) {
  const mid = services.filter((service) => service.p[1] && !service.p[2]).map((service) => service.id);
  const top = services.filter((service) => service.p[0] && !service.p[1]).map((service) => service.id);
  const standardParts = splitUpgrade(standard - essential, mid);
  const eliteParts = splitUpgrade(elite - standard, top);
  const prices = { ...standardParts.services, ...eliteParts.services };
  const yearPrice = (years >= 2 ? standardParts.year : 0) + (years === 4 ? eliteParts.year : 0);
  const upgrades = services.reduce((sum, service) => (!service.p[2] && on[service.id] ? sum + (prices[service.id] || 0) : sum), 0);
  return CUSTOM_BASE_PRICE + upgrades + yearPrice;
}