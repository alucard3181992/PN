import React from "react";

export default function CategoryPanel({
  categories,
  onSelectCategory,
  selectedCategory,
}) {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        borderRight: "1px solid #ccc",
        padding: "0px",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      <h3>Categorías</h3>
      <ul style={{ padding: 0 }}>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onSelectCategory(category)}
            className={
              category === selectedCategory ? "seleccionado tol" : "tol"
            }
            style={{
              cursor: "pointer",
              padding: "10px",
              backgroundColor: category === selectedCategory ? "#ddd" : "#000",
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
