function Orders() {
    return (
        <div>
            <h5 className="text-lg font-semibold mb-6">My Orders</h5>
            <div className="relative overflow-x-auto shadow dark:shadow-gray-800 rounded-md">
                <table className="w-full text-start text-slate-500 dark:text-slate-800">
                    <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-800">
                        <tr className="text-start">
                            <th scope="col" className="px-2 py-3 text-start">
                                Order no.
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                                Date
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                                Status
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                                Total
                            </th>
                            <th scope="col" className="px-2 py-3 text-start">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white dark:bg-slate-900 text-start">
                            <th className="px-2 py-3 text-start" scope="row">
                                7107
                            </th>
                            <td className="px-2 py-3 text-start">1st November 2021</td>
                            <td className="px-2 py-3 text-start text-green-600">Delivered</td>
                            <td className="px-2 py-3 text-start">
                                $ 320 <span className="text-slate-800">for 2items</span>
                            </td>
                            <td className="px-2 py-3 text-start">
                                <a href="#" className="text-orange-500">
                                    View <i className="mdi mdi-chevron-right" />
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-900 text-start border-t border-gray-100 dark:border-gray-700">
                            <th className="px-2 py-3 text-start" scope="row">
                                8007
                            </th>
                            <td className="px-2 py-3 text-start">4th November 2021</td>
                            <td className="px-2 py-3 text-start text-slate-800">Processing</td>
                            <td className="px-2 py-3 text-start">
                                $ 800 <span className="text-slate-800">for 1item</span>
                            </td>
                            <td className="px-2 py-3 text-start">
                                <a href="#" className="text-orange-500">
                                    View <i className="mdi mdi-chevron-right" />
                                </a>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-900 text-start border-t border-gray-100 dark:border-gray-700">
                            <th className="px-2 py-3 text-start" scope="row">
                                8008
                            </th>
                            <td className="px-2 py-3 text-start">4th November 2021</td>
                            <td className="px-2 py-3 text-start text-red-600">Canceled</td>
                            <td className="px-2 py-3 text-start">
                                $ 800 <span className="text-slate-800">for 1item</span>
                            </td>
                            <td className="px-2 py-3 text-start">
                                <a href="#" className="text-orange-500">
                                    View <i className="mdi mdi-chevron-right" />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;
