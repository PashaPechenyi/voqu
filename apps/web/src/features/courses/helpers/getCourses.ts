const getCourses = async () => {
  try {
    const response = await fetch('/api/course', {
      method: 'GET',
    });
    //console.log(response);
    if (!response.ok) {
      throw new Error('Something went wrong...');
    }
    const result = await response.json();
    console.log(result, 'result');
    return result;
  } catch (error) {}
};

export default getCourses;
