import type { Section } from 'models/section';

export type SectionSchema = {
  id: number;
  name: string;
}

export type SectionUpdates = Partial<Omit<SectionSchema, 'id'>>;

export interface SectionController {
  createSection(updates: SectionUpdates): Promise<Section>;
}

export interface SectionApi {
  createSection(updates: SectionUpdates): Promise<SectionSchema>;
}

export interface SectionStorage {
  updateProjectSections(section: Section): void;
}
