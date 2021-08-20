import { useRouter } from "next/dist/client/router";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  return <div>Profile ID: {id}</div>;
}
