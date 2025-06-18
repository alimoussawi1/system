import React, { useState, useMemo } from "react";
import { Plus, Search, RotateCcw, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useTable, usePagination } from "react-table";

const Table = ({
    columns,
    data,
    pageSize = 5,
    add = false,
    onOpen,
    renew = false,
    onOpenRenew,
    checkbox = false,
    selectedRowId,
    setSelectedRowId,
    totalPages = 1,
    search = false
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = useMemo(() => {
        return data.filter((row) => {
            return columns.some((column) => {
                const cellValue = row[column.accessor];
                return cellValue ? String(cellValue).toLowerCase().includes(searchQuery.toLowerCase()) : false;
            });
        });
    }, [data, searchQuery, columns]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0, pageSize },
        },
        usePagination
    );

    const handleRowSelect = (rowId) => {
        setSelectedRowId((prev) => (prev === rowId ? null : rowId));
    };

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                {/* Search Bar */}
                {
                    search &&
                    (
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search across all fields..."
                                className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                            />
                        </div>


                    )
                }


                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    {renew && (
                        <button
                            onClick={onOpenRenew}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Renew
                        </button>
                    )}
                    {add && (
                        <button
                            onClick={onOpen}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add New
                        </button>
                    )}
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table {...getTableProps()} className="w-full">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                                    {checkbox && (
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                                                />
                                            </div>
                                        </th>
                                    )}
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                                        >
                                            <div className="flex items-center gap-2">
                                                {column.render("Header")}

                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()} className="divide-y divide-gray-100">
                            {page.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + (checkbox ? 1 : 0)} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <Search className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="text-lg font-medium text-gray-900 mb-2">No data found</p>
                                            <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                page.map((row, index) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            className={`
                                                transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 
                                                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                                                ${selectedRowId === row.original._id ? 'bg-gradient-to-r from-indigo-50 to-purple-50 ring-2 ring-indigo-200' : ''}
                                            `}
                                        >
                                            {checkbox && (
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRowId === row.original._id}
                                                        onChange={() => handleRowSelect(row.original._id)}
                                                        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 transition-all duration-200"
                                                    />
                                                </td>
                                            )}
                                            {row.cells.map((cell) => (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-6 py-4 text-sm text-gray-900"
                                                >
                                                    <div className="whitespace-normal break-words font-medium">

                                                        {cell.render("Cell")}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {page.length > 0 && (
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-semibold">{pageIndex * pageSize + 1}</span> to{" "}
                                <span className="font-semibold">
                                    {Math.min((pageIndex + 1) * pageSize, filteredData.length)}
                                </span>{" "}
                                of <span className="font-semibold">{filteredData.length}</span> results
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={previousPage}
                                    disabled={!canPreviousPage}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700">
                                        Page <span className="font-semibold">{pageIndex + 1}</span> of{" "}
                                        <span className="font-semibold">{totalPages}</span>
                                    </span>
                                </div>

                                <button
                                    onClick={nextPage}
                                    disabled={!canNextPage}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Table;