export function parseJson(jsonString: string): {
  data: any;
  error: string | null;
} {
  try {
    console.log('AM I HERE?', jsonString);
    const data = JSON.parse(jsonString);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
