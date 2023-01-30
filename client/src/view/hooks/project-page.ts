import { Router, useRouter } from 'vue-router';
import { PageName } from 'shared/constants';

export function useProjectPage(): (id: number) => void {
  const router: Router = useRouter();

  return (id: number): void => {
    router.push({
      name: PageName.PROJECT,
      params: { id },
    });
  };
}
