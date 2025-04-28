'use client';
import { getQueryClient, trpc } from "@/trpc/server";
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client'; 

export default function Home() {
  // const queryClient = getQueryClient()
  // const categories = await queryClient.fetchQuery(trpc.categories.getMany.queryOptions())
  const trpc = useTRPC();
  const categories = useQuery(trpc.categories.getMany.queryOptions())
  if (!categories.data) return <div>Loading...</div>;
  return (
    <div>
      {JSON.stringify(categories.data,null,2)}
    </div>
  );
}
