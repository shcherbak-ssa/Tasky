import type { SectionSchema, SectionUpdates } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';
import { cloneObject } from 'shared/utils';

class SectionSchemaDefault implements SectionSchema {
  public id: number;
  public name: string;

  private constructor(section?: SectionSchema) {
    this.id = section?.id || ZERO;
    this.name = section?.name || EMPTY_STRING;
  }

  public static create(section?: SectionSchema): SectionSchemaDefault {
    return new SectionSchemaDefault(section);
  }

}

export class Section {
  private schema: SectionSchema;
  private updates: SectionUpdates;

  private constructor(schema: SectionSchema) {
    this.schema = schema;
    this.updates = {};
  }

  public static create(originalSchema?: SectionSchema): Section {
    const schema: SectionSchema = SectionSchemaDefault.create(originalSchema);

    return new Section(schema);
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

  public getUpdates(): SectionUpdates {
    return cloneObject(this.updates);
  }

}
