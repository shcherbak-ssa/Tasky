import { EMPTY_STRING, ZERO } from 'shared/constants';
import { ProjectDraft, ProjectSchema, Validator } from 'shared/types';

class ProjectDefault implements ProjectSchema {
  public id: number = ZERO;
  public name: string = EMPTY_STRING;
  public description: string = EMPTY_STRING;
}

export class Project {
  private schema: ProjectSchema;
  private draft: Partial<ProjectDraft>;
  private static validator: Validator<ProjectDraft>;

  private constructor(schema: ProjectSchema) {
    this.schema = schema;
    this.draft = {};
  }

  public static create(schema: ProjectSchema = new ProjectDefault()): Project {
    return new Project(schema);
  }

  public static getSchema(project: Project): ProjectSchema {
    return project.schema;
  }

  public static getDraft(project: Project): Partial<ProjectDraft> {
    return project.draft;
  }

  public static setValidator(validator: Validator<ProjectDraft>): void {
    Project.validator = validator;
  }

  public get id(): number {
    return this.schema.id;
  }

  public get name(): string {
    return this.draft.name || this.schema.name;
  }

  public get description(): string {
    return this.draft.description || this.schema.description;
  }

  public set name(name: string) {
    this.updateDraft('name', name);
  }

  public set description(description: string) {
    this.updateDraft('description', description);
  }

  private updateDraft<K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]): void {
    if (this.schema[key] === value) return;

    Project.validator.validate(key, value);
    this.draft[key] = value;
  }
}
