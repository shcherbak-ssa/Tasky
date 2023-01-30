import type { AppController, ProjectsController } from 'shared/types';
import { Controller, Popup } from 'shared/constants';
import { useController } from './controller';

export function usePopup(popup: Popup): () => void {
  const appController: AppController = useController(Controller.APP);

  return (): void => {
    appController.openPopup(popup);
  };
}

export function useEditProjectPopup(): (projectId?: number) => void {
  const openPopup = usePopup(Popup.EDIT_PROJECT);
  const projectsController: ProjectsController = useController(Controller.PROJECTS);

  return (projectId?: number): void => {
    projectsController.activateProject(projectId);
    openPopup();
  };
}
