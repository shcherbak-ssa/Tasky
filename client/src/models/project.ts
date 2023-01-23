import type { AssetsColor, ProjectUpdates, ProjectSchema, AssetsProjectIcon } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';
import { cloneObject, getProjectDueDate } from 'shared/utils';

class ProjectSchemaDefault implements ProjectSchema {
  public id: number;
  public name: string;
  public description: string;
  public color: AssetsColor;
  public icon: AssetsProjectIcon;
  public dueDate: Date | null;
  public createdAt: Date | null;
  public updatedAt: Date | null;

  private constructor(schema?: ProjectSchema) {
    this.id = schema?.id || ZERO;
    this.name = schema?.name || EMPTY_STRING;
    this.description = schema?.description || EMPTY_STRING;
    this.color = schema?.color || { id: ZERO, bgColor: EMPTY_STRING, textColor: EMPTY_STRING };
    this.icon = schema?.icon || { id: ZERO, family: EMPTY_STRING, name: EMPTY_STRING };
    this.dueDate = schema?.dueDate ? getProjectDueDate(new Date(schema.dueDate)) : null;
    this.createdAt = schema?.createdAt ? new Date(schema.createdAt) : null;
    this.updatedAt = schema?.updatedAt ? new Date(schema.updatedAt) : null;
  }

  public static create(schema?: ProjectSchema): ProjectSchemaDefault {
    return new ProjectSchemaDefault(schema);
  }

}

export class Project {
  private schema: ProjectSchema;
  private updates: ProjectUpdates;

  private constructor(schema: ProjectSchema) {
    this.schema = schema;
    this.updates = {};
  }

  public static create(originalSchema?: ProjectSchema): Project {
    const schema: ProjectSchema = ProjectSchemaDefault.create(originalSchema);

    return new Project(schema);
  }

  public static copy(project: Project): Project {
    return Project.create(project.schema);
  }

  public get id(): number {
    return this.schema.id;
  }

  public get name(): string {
    if (typeof(this.updates.name) === 'string') {
      return this.updates.name;
    }

    return this.schema.name;
  }

  public set name(name: string) {
    if (this.schema.name === name) {
      delete this.updates.name;
      return;
    }

    this.updates.name = name;
  }

  public get description(): string {
    if (typeof(this.updates.description) === 'string') {
      return this.updates.description;
    }

    return this.schema.description;
  }

  public set description(description: string) {
    if (this.schema.description === description) {
      delete this.updates.description;
      return;
    }

    this.updates.description = description;
  }

  public get color(): AssetsColor {
    const color: AssetsColor = this.updates.color || this.schema.color;

    return { ...color };
  }

  public set color(color: AssetsColor) {
    if (this.schema.color.id === color.id) {
      delete this.updates.color;
      return;
    }

    this.updates.color = { ...color };
  }

  public get icon(): AssetsProjectIcon {
    return this.updates.icon || this.schema.icon;
  }

  public set icon(icon: AssetsProjectIcon) {
    if (this.schema.icon.id === icon.id) {
      delete this.updates.icon;
      return;
    }

    this.updates.icon = { ...icon };
  }

  public get dueDate(): Date | null {
    if (this.updates.dueDate !== undefined) {
      return this.updates.dueDate;
    }

    return this.schema.dueDate;
  }

  public set dueDate(date: Date | null) {
    if (date === null) {
      if (this.schema.dueDate === null) {
        delete this.updates.dueDate;
        return;
      }
    } else {
      if (this.schema.dueDate?.toISOString() === date.toISOString()) {
        delete this.updates.dueDate;
        return;
      }
    }

    this.updates.dueDate = date;
  }

  public get createdAt(): Date | null {
    return this.schema.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.schema.updatedAt;
  }

  public isNewProject(): boolean {
    return this.schema.id === ZERO;
  }

  public hasUpdates(): boolean {
    return Object.keys(this.updates).length > ZERO;
  }

  public getUpdates(): ProjectUpdates {
    if (this.isNewProject()) {
      this.updates.createdAt = new Date();
    } else {
      this.updates.updatedAt = new Date();
    }
    
    return cloneObject(this.updates);
  }

  public resetUpdates(): void {
    this.updates = {};
  }

  public getUpdatedProject(): Project {
    return Project.create({
      ...this.schema,
      ...this.updates,
    });
  }

}
