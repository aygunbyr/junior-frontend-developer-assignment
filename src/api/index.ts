export const fetchData = async () => {
  try {
    const res = await fetch('https://swapi.dev/api/people');
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.results;
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    return [];
  }
};