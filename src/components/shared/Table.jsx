import Row from "./Row";

const Table = ({
  items,
  fields,
  currentPage,
  itemsPerPage,
  itemKey = "id",
}) => {
  // Memoriza las cabeceras de la tabla
  const headers = fields.map((field) => (
    <th key={field.key} className="px-4 py-2 text-left text-sm font-bold">
      {field.label}
    </th>
  ));

  return (
    <div className="overflow-y-auto max-h-[370px] border rounded-lg">
      <table className="min-w-full table-auto border-2 border-gray-400 rounded-lg">
        <thead className="sticky top-0 z-50 bg-gray-700 text-white border-b-2 border-gray-400">
          <tr>{headers}</tr>
        </thead>
        <tbody className="border-t-2 border-gray-400">
          {items.map((item, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            const key = item[itemKey] ?? globalIndex;
            return (
              <Row
                key={key}
                item={{ ...item, index: globalIndex }}
                fields={fields}
                index={globalIndex}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;