import RootLayout from "@/app/layout";
import { Header } from "@/components/header";
import { getDocumentDetails } from "@/services/apiClient";
import { DetailsType } from "@/utils/types/details-type";
import { printInsurance } from "@/utils/types/insurance-type";
import { Chat } from "@/components/chat";

export default function ViewDocument({ data }: { data: DetailsType }) {
  const base64toLink = (base64: string) => {
    return `data:application/pdf;base64,${base64}`;
  };

  return (
    <>
      <main className="w-screen flex flex-col items-center my-5 px-5">
        <Header isButtonVisible={false} />
        <div className="flex justify-between w-full p-4">
          <div className="w-1/2 p-4">
            <div className="grid grid-cols-2 gap-y-2">
              <div>
                <div className="text-2xl">Preço</div>
                <div className="text-3xl font-bold text-primary">
                  {data.contractValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
              <div>
                <div className="text-2xl">Data base</div>
                <div className="text-base">
                  {data.baseDate.toLocaleString("pt-BR")}
                </div>
              </div>
              <div>
                <div className="text-2xl">Contratante</div>
                <div className="text-base font-semibold">{data.contractor}</div>
              </div>
              <div>
                <div className="text-2xl mt-2">CNPJ</div>
                <div className="text-base font-semibold">
                  {data.contractorCNPJ}
                </div>
              </div>
              <div>
                <div className="text-2xl">Contratado</div>
                <div className="text-base font-semibold ">{data.hired}</div>
              </div>
              <div>
                <div className="text-2xl mt-2">CNPJ</div>
                <div className="text-base font-semibold">{data.hiredCNPJ}</div>
              </div>
              <div className="col-span-2">
                <div className="text-2xl">Vigência do contrato</div>
                <div className="text-xl font-bold ">{data.contractTerm}</div>
              </div>
              <div className="col-span-2">
                <div className="text-2xl">Garantia</div>
                <div className="text-xl font-bold text-secundary-600">
                  {data.warranty}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-2xl mb-2">
                  Tipos de seguro{" "}
                  <span className="text-base text-gray-500">(possíveis)</span>
                </div>
                <div className="flex space-x-2">
                  {data.types_of_insurances.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-primary bg-opacity-[.32] text-primary rounded-full text-sm"
                    >
                      {printInsurance(type)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full py-8">
              {data && <Chat documentId={data.id} />}
            </div>
          </div>
          <div className="w-1/2">
            <iframe
              src={base64toLink(data.pdf64)}
              width={"100%"}
              height={"750px"}
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
}

ViewDocument.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getServerSideProps({ params }: any) {
  const { id } = params;

  const data = await getDocumentDetails(id);
  return {
    props: {
      data,
    },
  };
}
