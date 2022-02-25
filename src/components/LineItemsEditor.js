const emptyItem = () => ({ description: '', quantity: 1, unitPrice: 0 });

export default function LineItemsEditor({ items, onChange }) {
  function updateItem(index, field, value) {
    onChange(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, emptyItem()]);
  }

  return (
    <table className="table line-items">
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Unit price</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>
              <input
                value={item.description}
                placeholder="e.g. Logo design"
                onChange={(e) => updateItem(index, 'description', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                step="0.25"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                step="0.01"
                value={item.unitPrice}
                onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
              />
            </td>
            <td>
              <button
                type="button"
                className="link"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>
            <button type="button" className="btn" onClick={addItem}>
              Add line
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
