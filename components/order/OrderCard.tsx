import { completeOrderAction } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { useState, useTransition, useRef } from "react";
import Modal from "@/components/ui/Modal";

type OrderCardProps = {
    order: OrderWithProducts;
}

export default function OrderCard({ order }: OrderCardProps) {
    console.log("SERVIDOR!!!")

    const [isOpen, setIsOpen] = useState(false);
    const [isPending] = useTransition(); //startTransition
    const formRef = useRef<HTMLFormElement>(null);

    const handleCompleteOrder = () => {
        setIsOpen(true);
    };
    const handleConfirm = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
            setIsOpen(false);
        }
    };
    const handleCancel = () => setIsOpen(false);

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900'>Cliente: {order.name} </p>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados:</p>
            <dl className="mt-6 space-y-4">
                {order.orderProducts.map(product => (
                    <div 
                        key={product.productId} 
                        className="flex items-center gap-2 border-t border-gray-200 pt-4"
                    >
                        <dt className="flex items-center text-sm text-gray-600">
                            <span className="font-black">({product.quantity}) {''}</span>
                        </dt>
                        
                        <dd className="text-sm font-medium text-gray-900">
                            {product.product.name}
                        </dd>
                    </div>
                ))}
        
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                </div>
            </dl>

            <button
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                onClick={handleCompleteOrder}
                disabled={isPending}
            >
                Marcar Orden Completada
            </button>

            <form ref={formRef} action={completeOrderAction} className="hidden">
                <input type="hidden" name="order_id" value={order.id} />
            </form>

            <Modal isOpen={isOpen} onClose={handleCancel}>
                <h3 className="text-xl font-bold mb-4">¿Confirmar que el pedido está listo?</h3>
                <div className="mb-4">
                  <p className="font-semibold">Cliente: {order.name}</p>
                  <ul className="mt-2 mb-2 text-gray-700">
                    {order.orderProducts.map(product => (
                      <li key={product.productId}>
                        <span className="font-bold">({product.quantity})</span> {product.product.name}
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold">Total: {formatCurrency(order.total)}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    onClick={handleCancel}
                    disabled={isPending}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded"
                    onClick={handleConfirm}
                    disabled={isPending}
                  >
                    Confirmar
                  </button>
                </div>
            </Modal>
        </section>
    )
}