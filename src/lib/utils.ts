import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  const formater = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formater.format(price);
};

interface constructMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
}



export function constructMetadata({
  title = "CaseCobra - capas personalizadas de alta-qualidade",
  description = "Crie capas personalizadas de alta-qualidade em segundos",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
}: constructMetadataProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      images: [{ url: image }],
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@yanfer",
    },
    icons,
    metadataBase: new URL("https://casecobra-ashen.vercel.app/"),
  };
}
