import axios from "axios";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { TrashIcon } from "@heroicons/react/outline";

import { SERVER_BASE_URL } from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";

const DeleteButton = ({ commentId }) => {
  const { mutate } = useSWRConfig();
  const { data: currentUser } = useSWR("user", storage);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const handleDelete = async (commentId) => {
    await axios.delete(
      `${SERVER_BASE_URL}/articles/${pid}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Token ${currentUser?.token}`,
        },
      }
    );
    mutate(`${SERVER_BASE_URL}/articles/${pid}/comments`);
  };

  return (
    <span className="ml-auto link">
      <TrashIcon
        width={28}
        height={28}
        onClick={() => handleDelete(commentId)}
      />
    </span>
  );
};

export default DeleteButton;
