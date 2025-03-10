"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import PhonePreview from "@/components/PhonePreview";
import { formatPrice } from "@/lib/utils";

const Thankyou = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  if (data === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Carregando seu pedido...</h3>
          <p>Isso não vai demorar muito.</p>
        </div>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">
            Verificando seu pagamento...
          </h3>
          <p>Isso pode demorar um pouco.</p>
        </div>
      </div>
    );
  }

  const { configuration, BillingAddress, shippingAddress, amount } = data;
  const { color } = configuration;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Muito obrigado!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Sua capa está a caminho!
          </h1>
          <p className="mt-2 text-base text-zinc-500">
            Nós recebemos seu pedido e estamos prontos para enviar.
          </p>
          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Número do pedido:</p>
            <p className="mt-2 text-zinc-500">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              Você fez uma boa escolha!
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              Nós da CaseCobra acreditamos que uma capa de celular não precisa
              apenas ser bonita, mas também precisa ser funcional. Nós
              oferecemos uma garantia de 5 anos de impressão. Se a capa não
              estiver funcionando corretamente, estamos prontos para ajudar.
            </p>
          </div>
        </div>

        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhonePreview
            color={color!}
            croppedImageUrl={configuration.croppedImageUrl!}
          />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Endereço de entrega:</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>
                  <span className="block">
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                Endereço de pagamento:
              </p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{BillingAddress?.name}</span>
                  <span className="block">{BillingAddress?.street}</span>
                  <span className="block">
                    {BillingAddress?.postalCode} {BillingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Status do pagamento:</p>
              <p className="mt-2 text-zinc-700">Pago</p>
            </div>

            <div>
              <p className="font-medium text-zinc-900">Método de envio:</p>
              <p className="mt-2 text-zinc-700">FULL, 2 dias úteis para entrega.</p>
            </div>

          </div>
        </div>

        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Subtotal:</p>
            <p className="font-medium text-zinc-700">{formatPrice(amount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Envio:</p>
            <p className="font-medium text-zinc-700">{formatPrice(0)}</p>
          </div>          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total:</p>
            <p className="font-medium text-zinc-700">{formatPrice(amount)}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Thankyou;
