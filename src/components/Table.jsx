import React from 'react';

/**
 * Un componente de tabla dinámico y reutilizable.
 *
 * @param {Array} columns - Array de objetos para definir las cabeceras.
 * Ej: [{ header: 'Nombre', accessor: 'name' }]
 * @param {Array} data - Array de objetos con los datos a mostrar.
 * Ej: [{ id: 1, name: 'Producto A' }]
 * @param {Function} renderActions - Una función que recibe el 'item' (la fila)
 * y devuelve el JSX para la celda de acciones.
 */
function DynamicTable({ columns, data, renderActions }) {
  
  // Si no hay datos, muestra un mensaje
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        
        {/* === CABECERA DINÁMICA === */}
        <thead className="text-xs text-gray-800 uppercase bg-gray-300">
          <tr>
            {/* 1. Mapea las columnas que le pasaste */}
            {columns.map((col) => (
              <th scope="col" className="px-6 py-3" key={col.accessor}>
                {col.header}
              </th>
            ))}
            
            {/* 2. Si pasaste la función 'renderActions', añade la columna "Action" */}
            {renderActions && (
              <th scope="col" className="px-6 py-3" key="actions-header">
                Action
              </th>
            )}
          </tr>
        </thead>
        
        {/* === CUERPO DINÁMICO === */}
        <tbody>
          {/* 3. Mapea los datos para crear cada fila */}
          {data.map((item, index) => (
            <tr 
              key={item.id || index} // Usa 'id' si existe, si no, el index
              className="bg-white border-b hover:bg-gray-50"
            >
              
              {/* 4. Mapea las columnas OTRA VEZ por cada fila */}
              {columns.map((col, colIndex) => {
                // Obtiene el valor de la celda. Ej: item['name']
                const cellValue = item[col.accessor];
                
                // Si es la primera columna, la pone como <th> (scope="row")
                if (colIndex === 0) {
                  return (
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap " key={col.accessor}>
                      {cellValue}
                    </th>
                  );
                }
                
                // Para las demás columnas, las pone como <td>
                return (
                  <td className="px-6 py-4" key={col.accessor}>
                    {cellValue}
                  </td>
                );
              })}
              
              {/* 5. Si pasaste la función 'renderActions', la llama */}
              {renderActions && (
                <td className="px-6 py-4" key="actions-cell">
                  {/* Aquí llamamos a tu función, pasándole la fila actual */}
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;