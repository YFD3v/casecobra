"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAuthStatus } from "./actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    //Se o usuário não estiver logado, chama a função para que o usuário logue e faça verificação no db
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    if (configId) {
      localStorage.removeItem('configurationId')
      router.push("/configure/preview?id=" + configId);
    } else {
      router.push("/");
    }
  }

  return <div className="w-full mt-24 flex justify-center">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      <h3 className='font-semibold text-xl'>Fazendo login...</h3>
      <p>Você será redirecionado automaticamente.</p>
    </div>
  </div>;
};

export default Page;