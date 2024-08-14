import { API } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ChangeCurrentProjectProps {
  id: string;
}

function handleChangeProject(id: string) {
  return API.put(`/api/users/change-current-project/${id}`);
}
export default function ChangeCurrentProject({
  id,
}: ChangeCurrentProjectProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleChangeProject,
    onSuccess: (res) => {
      console.log(res.data);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
  return <div onClick={() => mutation.mutate(id)}>Change</div>;
}
