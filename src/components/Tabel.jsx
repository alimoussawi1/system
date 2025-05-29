import React, { useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
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
    totalPages = 1 // ✅ NEW: Accept totalPages prop
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
        <div className="w-full overflow-x-auto">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="border p-2 rounded-md w-1/4"
                />
            </div>

            <div className="flex justify-end mb-2 gap-2">
                {renew && (
                    <button
                        onClick={onOpenRenew}
                        className="flex justify-center items-center bg-red-500 w-[100px] h-[30px] text-black rounded-lg"
                    >
                        Renew
                    </button>
                )}
                {add && (
                    <FaPlus
                        onClick={onOpen}
                        className="text-sm w-[30px] h-[30px] bg-red-500 text-white rounded-lg p-2 cursor-pointer"
                    />
                )}
            </div>

            <table {...getTableProps()} className="w-full border border-gray-300">
                <thead className="bg-[#5842aa] text-white">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                            {checkbox && <th className="p-3 text-left">Select</th>}
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className="p-3 text-left">
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (checkbox ? 1 : 0)} className="text-center py-6 text-gray-500">
                                No data found
                            </td>
                        </tr>
                    ) : (
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className="border-b hover:bg-gray-100 even:bg-white odd:bg-gray-50"
                                >
                                    {checkbox && (
                                        <td className="p-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedRowId === row.original._id}
                                                onChange={() => handleRowSelect(row.original._id)}
                                            />
                                        </td>
                                    )}
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="p-3 truncate max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
                                        >
                                            {cell.render("Cell")}
                                        </td>

                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                    className="px-4 py-2 bg-[#02afde] text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-700">
                    Page {pageIndex + 1} of {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={!canNextPage}
                    className="px-4 py-2 bg-[#02afde] text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
