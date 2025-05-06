
const Row = ({ item, fields, index }) => {
    return (
      <tr className="hover:bg-gray-700 hover:text-white">
        {fields.map((field, idx) => (
          <td
            key={`${item.id || idx}-${field.key}`}
            className="py-1 px-3 text-sm"
          >
            {field.key === "index"
              ? index + 1
              : field.render
              ? field.render(item)
              : item[field.key]}
          </td>
        ))}
      </tr>
    );
  };
  
  export default Row;
  