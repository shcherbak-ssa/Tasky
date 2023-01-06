import type { AppController, ProjectsController } from 'shared/types';
import { Controller, Popup } from 'shared/constants';
import { useController } from './controller';

export function useEditProjectPopup(): (projectId?: number) => void {
  const appController: AppController = useController(Controller.APP);
  const projectsController: ProjectsController = useController(Controller.PROJECTS);
  
  return (projectId?: number): void => {
    projectsController.activateProject(projectId);
    appController.openPopup(Popup.EDIT_PROJECT);
  };
}
