import axios from "axios";

async function getProjects() {
  try {
    const res = await axios.get(`${process.env.SERVER_URL}/projects`);
    return res.data ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function Projectspage() {
  const projects = await getProjects();
  return (
    <div>
      <h2 className="text-xl font-medium tracking-wider">Projects</h2>
    </div>
  );
}
