"use client";

import React, { useState } from 'react';

const Schedule = () => {
  const hours = [
    "7:00 a 8:00 a.m", "8:00 a 9:00 a.m", "9:00 a 10:00 a.m", "10:00 a 11:00 a.m", 
    "11:00 a 12:00 p.m", "12:00 a 1:00 p.m", "1:00 a 2:00 p.m", "2:00 a 3:00 p.m",
    "3:00 a 4:00 p.m", "4:00 a 5:00 p.m", "5:00 a 6:00 p.m", "6:00 a 7:00 p.m", "7:00 a 8:00 p.m"
  ];

  const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];

  const [selectedCells, setSelectedCells] = useState(new Set());
  const [isEditable, setIsEditable] = useState(false); // Controla si el horario es editable

  // Alternar selección de celdas
  const toggleCellSelection = (hour, day) => {
    const cellKey = `${hour}-${day}`;
    if (selectedCells.has(cellKey)) {
      const newSet = new Set(selectedCells);
      newSet.delete(cellKey);
      setSelectedCells(newSet);
    } else {
      setSelectedCells(new Set(selectedCells).add(cellKey));
    }
  };

  // Guardar horarios seleccionados (solo para mostrar en consola)
  const handleSave = () => {
    console.log("Horarios seleccionados:", Array.from(selectedCells));
  };

  // Alternar modo de edición
  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="p-4">
      {/* Botón para alternar el modo de edición */}
      <div className="flex justify-between mb-4">
        <button
          onClick={handleSave}
          className={`p-2 bg-blue-500 text-white rounded ${isEditable ? '' : 'cursor-not-allowed'}`}
          disabled={!isEditable}
        >
          Guardar
        </button>

        <label className="flex items-center space-x-2">
          <span>{isEditable ? 'Modo Edición' : 'Modo Vista'}</span>
          <input
            type="checkbox"
            checked={isEditable}
            onChange={toggleEditMode}
            className="toggle-checkbox"
          />
        </label>
      </div>

      <div className="grid grid-cols-6 gap-1 bg-gray-300 p-2">
        {/* Headers */}
        <div className="bg-yellow-500 font-bold text-center p-2 border border-gray-400">HORAS</div>
        {days.map((day) => (
          <div key={day} className="bg-yellow-500 font-bold text-center p-2 border border-gray-400">
            {day}
          </div>
        ))}

        {/* Hours and Cells */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* Hour column */}
            <div className="bg-black text-center p-2 border border-black text-white">{hour}</div>

            {/* Cells for each day */}
            {days.map((day) => {
              const cellKey = `${hour}-${day}`;
              const isSelected = selectedCells.has(cellKey);

              return (
                <div
                  key={cellKey}
                  onClick={() => {
                    if (isEditable) toggleCellSelection(hour, day);
                  }}
                  className={`p-2 border border-gray-400 cursor-pointer ${
                    isSelected ? 'bg-red-500' : 'bg-white'
                  } ${isEditable ? '' : 'cursor-not-allowed'}`}
                ></div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
