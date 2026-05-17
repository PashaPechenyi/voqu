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
