import React, { useEffect, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

export default function FlowDiagram({ schema }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Initialize nodes and edges from the passed schema
  useEffect(() => {
    if (!schema || !schema.tables || !schema.relations) return;

    const formattedNodes = schema.tables.map((table, i) => ({
      id: table.name,
      position: { x: i * 250, y: 100 },
      data: {
        label: (
          <div style={{ textAlign: "left" }}>
            <strong>{table.name}</strong>
            <ul style={{ paddingLeft: "1rem", margin: 0 }}>
              {table.columns.map((col) => (
                <li key={col.name}>
                  {col.name} : {col.type}{" "}
                  {col.pk ? "(PK)" : ""} {col.fk ? `(FK → ${col.fk})` : ""}
                </li>
              ))}
            </ul>
          </div>
        ),
      },
    }));

    const formattedEdges = schema.relations.map((rel, i) => ({
      id: `edge-${i}`,
      source: rel.from.split(".")[0],
      target: rel.to.split(".")[0],
      label: "FK",
      animated: true,
      style: { stroke: "#888" },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#fff", color: "#000", fillOpacity: 0.7 },
    }));

    setNodes(formattedNodes);
    setEdges(formattedEdges);
  }, [schema, setNodes, setEdges]);

  // Handle connections dynamically
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: "500px", border: "1px solid #ccc" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
      >
        <MiniMap nodeStrokeColor="#555" nodeColor="#ddd" nodeBorderRadius={2} />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}
