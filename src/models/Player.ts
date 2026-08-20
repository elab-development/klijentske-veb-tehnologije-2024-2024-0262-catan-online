import type { ResourceType } from './BoardTypes';

export type ResourceCounts = Record<Exclude<ResourceType, 'pustinja'>, number>;

export class Player {
  id: string;
  name: string;
  color: string;
  resources: ResourceCounts;
  victoryPoints: number;

  constructor(name: string, color: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.color = color;
    this.resources = { drvo: 0, cigla: 0, ruda: 0, zito: 0, ovca: 0 };
    this.victoryPoints = 0;
  }

  addResource(resource: Exclude<ResourceType, 'pustinja'>, amount = 1) {
    this.resources[resource] += amount;
  }

  removeResource(resource: Exclude<ResourceType, 'pustinja'>, amount = 1) {
    this.resources[resource] = Math.max(0, this.resources[resource] - amount);
  }

  getTotalResources(): number {
    return Object.values(this.resources).reduce((sum, count) => sum + count, 0);
  }

  getMostCommonResource(): string {
    const entries = Object.entries(this.resources);
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    return sorted[0][1] > 0 ? sorted[0][0] : '-';
  }
}