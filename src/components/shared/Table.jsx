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
    <th
      key={field.key}
      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
    >
      {field.label}
    </th>
  ));

  return (
    <div className="overflow-hidden shadow-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>{headers}</tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => {
              const globalIndex =
                currentPage && itemsPerPage
                  ? (currentPage - 1) * itemsPerPage + index
                  : index;
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
    </div>
  );
};

export default Table;
