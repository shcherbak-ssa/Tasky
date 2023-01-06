import type { AssetsColor, ProjectDraft, ProjectSchema, Validator } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';

class ProjectDefault implements ProjectSchema {
  public id: number = ZERO;
  public name: string = EMPTY_STRING;
  public description: string = EMPTY_STRING;
  public color: AssetsColor = { id: ZERO, color: EMPTY_STRING };
}

export class Project {
  private pSchema: ProjectSchema;
  private pDraft: Partial<ProjectDraft>;
  private static validator: Validator<ProjectDraft>;

  private constructor(schema: ProjectSchema) {
    this.pSchema = schema;
    this.pDraft = {};
  }

  public static create(schema: ProjectSchema = new ProjectDefault()): Project {
    return new Project(schema);
  }

  public static isNewProject(project: Project): boolean {
    return project.id === ZERO;
  }

  public static setValidator(validator: Validator<ProjectDraft>): void {
    Project.validator = validator;
  }

  public get id(): number {
    return this.pSchema.id;
  }

  public get name(): string {
    return this.pDraft.name || this.pSchema.name;
  }

  public set name(name: string) {
    this.updateDraft('name', name);
  }

  public get description(): string {
    return this.pDraft.description || this.pSchema.description;
  }

  public set description(description: string) {
    this.updateDraft('description', description);
  }

  public get color(): AssetsColor {
    return this.pDraft.color || this.pSchema.color;
  }

  public set color(color: AssetsColor) {
    this.updateDraft('color', color);
  }

  public get draft(): Partial<Readonly<ProjectDraft>> {
    return this.pDraft;
  }

  public get updatedProject(): Project {
    return Project.create({
      ...this.pSchema,
      ...this.pDraft,
    });
  }

  private updateDraft<K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]): void {
    if (this.pSchema[key] === value) return;

    Project.validator.validate(key, value);
    this.pDraft[key] = value;
  }
}
