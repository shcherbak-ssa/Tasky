export type Assets = {
  colors: AssetsColor[];
  projectIcons: AssetsProjectIcon[];
}

export type AssetsColor = {
  id: number;
  bgColor: string;
  textColor: string;
}

export type AssetsProjectIcon = {
  id: number;
  family: string;
  name: string;
}

export interface AssetsController {
  loadAssets(): Promise<boolean>;
  getAssets<K extends keyof Assets>(key: K): Assets[K];
}

export interface AssetsApi {
  loadAssets(): Promise<Assets>;
}

export interface AssetsStorage {
  addAssets(assets: Assets): void
  getAssets<K extends keyof Assets>(key: K): Assets[K];
}
