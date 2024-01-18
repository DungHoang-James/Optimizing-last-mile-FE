import AutoModeIcon from "@mui/icons-material/AutoMode";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useQuery } from "react-query";

import { queryClient } from "@/lib/react-query";
import { fetchWithGet } from "@/lib/request";

export default function OrderAutoAssignDriver() {
  const [toggle, setToggle] = useState<boolean>(false);

  const { isLoading, isFetching } = useQuery({
    queryKey: ["/orders/autoAssignDriver"],
    queryFn: ({ queryKey, signal }) => fetchWithGet({ queryKey, signal }),
    enabled: toggle,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["/orders", { page: 1, limit: 10 }],
      });
    },
  });

  return (
    <LoadingButton
      variant={"outlined"}
      color={"primary"}
      startIcon={<AutoModeIcon />}
      loading={isLoading || isFetching}
      onClick={() => setToggle((prev) => !prev)}
    >
      Auto Assign Driver
    </LoadingButton>
  );
}
