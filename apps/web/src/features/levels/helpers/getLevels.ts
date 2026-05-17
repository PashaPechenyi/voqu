// TODO: No return type annotation — annotate as `Promise<Level[]>`.
// TODO: Empty catch swallows errors — let them surface.
// TODO: Stray commented-out `//console.log(response);` and `console.log(result);` — remove debug output.
// TODO: Duplicates the `fetch + try/catch + console.log` pattern in `getCourses.ts` and friends. Build a shared `apiClient` and use it across helpers.
const getLevels = async () => {
  try {
    const response = await fetch('/api/level', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Something went wrong...');
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {}

  //console.log(response);
};

export default getLevels;
