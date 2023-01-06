import type { SettingsSchema, SettingsUpdates } from 'shared/types';
import { ProjectsView, ZERO } from 'shared/constants';
import { cloneObject } from 'shared/utils';

class SettingsSchemaDefault implements SettingsSchema {
  public id: number;
  public projectsView: ProjectsView;

  private constructor(schema?: SettingsSchema) {
    this.id = schema?.id || ZERO;
    this.projectsView = schema?.projectsView || ProjectsView.TILES;
  }

  public static create(schema?: SettingsSchema): SettingsSchemaDefault {
    return new SettingsSchemaDefault(schema);
  }
}

export class Settings {
  private schema: SettingsSchema;
  private updates: SettingsUpdates;

  private constructor(schema: SettingsSchema) {
    this.schema = schema;
    this.updates = { id: schema.id };
  }

  public static create(originalSchema?: SettingsSchema): Settings {
    const schema: SettingsSchema = SettingsSchemaDefault.create(originalSchema);

    return new Settings(schema);
  }

  public get id(): number {
    return this.schema.id;
  }

  public get projectsView(): ProjectsView {
    return this.updates.projectsView || this.schema.projectsView;
  }

  public set projectsView(view: ProjectsView) {
    if (view === this.schema.projectsView) {
      delete this.updates.projectsView;
      return;
    }

    this.updates.projectsView = view;
  }

  public hasUpdates(): boolean {
    const { id, ...updates } = this.updates;

    return Object.keys(updates).length > ZERO;
  }

  public getUpdates(): SettingsUpdates {
    return cloneObject(this.updates);
  }

  public resetUpdates(): void {
    this.updates = { id: this.schema.id };
  }

  public getUpdatedSettings(): Settings {
    return Settings.create({
      ...this.schema,
      ...this.updates,
    });
  }

}
