import { Router, useRouter } from 'vue-router';
import type { MenuItem } from 'primevue/menuitem';
import { useConfirm } from 'primevue/useconfirm';

import type { Project } from 'models/project';
import type { ProjectsController } from 'shared/types';
import { Controller, PagePath } from 'shared/constants';
import { useController } from './controller';
import { useEditProjectPopup } from './popup';

export function useProjectMenu(): (project: Project) => MenuItem[] {
  const router: Router = useRouter();
  const confirm = useConfirm();

  const openCreateProjectPopup = useEditProjectPopup();
  const projectsController: ProjectsController = useController(Controller.PROJECTS);

  return (project: Project): MenuItem[] => {
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
          openCreateProjectPopup(project.id);
        },
      },
      {
        label: (project.isArchived ? 'Restore' : 'Archive'),
        icon: (project.isArchived ? 'pi pi-replay' : 'pi pi-briefcase'),
        command: () => {
          if (project.isArchived) {
            projectsController.restoreProject(project);
            return;
          }

          confirm.require({
            header: 'Archive project',
            message: 'Are you sure?',
            acceptClass: 'p-button-danger',
            defaultFocus: 'reject',
            accept: () => {
              projectsController.archiveProject(project);
            },
          });
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          confirm.require({
            header: 'Delete project',
            message: 'This action will delete all related data. Are you sure?',
            acceptClass: 'p-button-danger',
            defaultFocus: 'reject',
            accept: () => {
              projectsController.deleteProject(project)
                .then((success) => {
                  if (success) {
                    router.push({
                      path: PagePath.HOME,
                    });
                    
                    projectsController.removeActiveProject();
                  }
                });
            },
          });
        },
      },
    ];
  };
}
