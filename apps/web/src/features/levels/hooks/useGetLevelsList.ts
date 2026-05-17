// TODO: No `isLoading`/`error` state; consumers can't show skeletons.
// TODO: `fetchLevels` is re-created on every render — `useCallback` it so the `useEffect(..., [fetchLevels])` in `AddCourseModal` / `EditCourseModal` doesn't trigger infinite loops once exhaustive-deps is enforced.
// TODO: This is the SAME shape problem as `useGetCourses`: returns raw setter behavior and is invoked manually with `useEffect` in every modal. Either auto-fetch on mount inside the hook, or switch to TanStack Query.
import getLevels from '@/features/levels/helpers/getLevels';
import { Level } from '@/features/levels/types/level/level.type';
import { useState } from 'react';
const useGetLevelsList = () => {
  const [levelsData, setLevelsData] = useState<Level[]>([]);
  const fetchLevels = async () => {
    const levels = await getLevels();
    if (!levels) return;
    setLevelsData(levels);
  };

  return { levelsData, fetchLevels };
};

export default useGetLevelsList;
