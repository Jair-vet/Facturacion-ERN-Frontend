import { Header } from "./components/Header"
import { InvoiceForm } from "./components/InvoiceForm"
import { Footer } from "./components/Footer"
import { InvoiceInfo } from "./components/InvoiceInfo"

export const FacturacionPage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header fijo */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
        <Header />
      </div>

      {/* Espaciado para compensar la altura del header fijo */}
      <div className="pt-36 flex-grow">
        <div className="lg:max-w-5xl md:max-w-3xl mx-auto bg-white shadow-lg p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <InvoiceInfo />
          <InvoiceForm />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
  
}
