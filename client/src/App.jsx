import React,{useState} from "react"
import PromptPanel from "./promptpanel"
import QueryPanel from "./querypanel"
import FlowDiagram from "./flowdiagram"
import "./styles.css"

// Logo placeholder (use in future)
// import logo from "./assets/logo.png"

export default function App()
{
	const[schema,setSchema]=useState(null)
	const[currentPage,setCurrentPage]=useState("schema")
	const[queryMode,setQueryMode]=useState("manual")

	const goSchema=()=>setCurrentPage("schema")
	const goQueryManual=()=>{ setQueryMode("manual"); setCurrentPage("query") }
	const goQuerySchema=()=>{ setQueryMode("schema"); setCurrentPage("query") }

	return(
		<div className="app-container">

			{/* Navbar */}
			<div className="navbar">
				<div className="nav-left">

					{/* For future logo use: */}
					{/* <img src={logo} className="nav-logo" alt="logo" /> */}

					<div className="nav-round"></div>

					<h3>Schema Visualizer & SQL Query generator</h3>
				</div>

				<div className="nav-buttons">
					<button
						className={`nav-btn ${currentPage==="schema"?"active":""}`}
						onClick={goSchema}
					>
						Schema generator
					</button>

					<button
						className={`nav-btn ${currentPage==="query"?"active":""}`}
						onClick={goQueryManual}
					>
						Query generator
					</button>
				</div>
			</div>

			{/* Page container */}
			<div className="page-wrapper">
				<div className="page-content">

					{currentPage==="schema" && (
						<SchemaPage
							schema={schema}
							onUpdate={setSchema}
							onQueryClick={goQuerySchema}
						/>
					)}

					{currentPage==="query" && (
						<QueryPage
							schema={schema}
							queryMode={queryMode}
						/>
					)}

				</div>
			</div>

		</div>
	)
}

function SchemaPage({schema,onUpdate,onQueryClick})
{
	return(
		<>
			{/* Schema Generator Card */}
			<div className="card">
				<h2>Schema Generator</h2>
				<p>Describe your system to generate a DB schema.</p>

				<PromptPanel onResult={onUpdate}/>
			</div>

			{/* Schema Diagram + Copy Button */}
			{schema && (
				<div className="card">

					<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
						<h3>Schema Diagram</h3>
						<span className="schema-tag">ready for queries</span>
					</div>

					{/* Diagram Box with COPY JSON BUTTON */}
					<div className="schema-box" style={{position:"relative"}}>

						<FlowDiagram schema={schema}/>

						<button
							className="copy-inside"
							onClick={() =>
								navigator.clipboard.writeText(JSON.stringify(schema,null,2))
							}
						>
							Copy JSON
						</button>

					</div>

					<div className="center-btn">
						<button
							className="btn btn-blue"
							onClick={onQueryClick}
						>
							Ask queries regarding generated schema
						</button>
					</div>

				</div>
			)}
		</>
	)
}

function QueryPage({schema,queryMode})
{
	const useSchema=queryMode==="schema" && !!schema

	return(
		<div className="card">
			<h2>Query Generator</h2>

			<p style={{color:useSchema?"#16a34a":"#6b7280"}}>
				{useSchema
					? "Using your generated schema automatically"
					: "Schema not auto-attached"
				}
			</p>

			<QueryPanel schema={schema} useSchema={useSchema}/>
		</div>
	)
}
