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
}) => {
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    // Memoize filtered data to avoid unnecessary recalculations
    const filteredData = useMemo(() => {
        return data.filter((row) => {
            return columns.some((column) => {
                const cellValue = row[column.accessor];
                return cellValue ? String(cellValue).toLowerCase().includes(searchQuery.toLowerCase()) : false;
            });
        });
    }, [data, searchQuery, columns]); // Only re-filter when data, searchQuery, or columns change

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
            data: filteredData, // Pass the filtered data to the table
            initialState: { pageIndex: 0, pageSize },
        },
        usePagination
    );

    const handleRowSelect = (rowId) => {
        setSelectedRowId((prev) => (prev === rowId ? null : rowId)); // Toggle row selection
    };

    return (
        <div className="w-full overflow-x-auto">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
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
                {/* Table Header */}
                <thead className="bg-gray-900 text-white">
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

                {/* Table Body */}
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="border-b hover:bg-gray-100">
                                {checkbox && (
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRowId === row.original._id} // Check if row is selected
                                            onChange={() => handleRowSelect(row.original._id)} // Toggle selection on checkbox click
                                        />
                                    </td>
                                )}
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="p-3">
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                    className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {pageIndex + 1}</span>
                <button
                    onClick={nextPage}
                    disabled={!canNextPage}
                    className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
