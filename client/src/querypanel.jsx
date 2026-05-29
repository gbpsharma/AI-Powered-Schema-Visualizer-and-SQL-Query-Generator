import React,{useState} from "react"
import "./styles.css"

export default function QueryPanel({schema,useSchema})
{
	const[prompt,setPrompt]=useState("")
	const[sql,setSql]=useState("")
	const[loading,setLoading]=useState(false)
	const[error,setError]=useState(null)

	const generate = async () =>
	{
		if(!prompt.trim()){
			setError("Please enter a query prompt first.")
			return
		}

		setLoading(true)
		setError(null)
		setSql("")

		try{
			const payload = useSchema && schema ? schema : null

			const res = await fetch("http://localhost:4000/api/query",{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify({prompt,schema:payload})
			})

			const data = await res.json()
			if(!res.ok) throw new Error(data.error || "Server error")

			setSql(data.sql || data.query || data.result)
		}
		catch(err){
			setError(err.message)
		}
		finally{
			setLoading(false)
		}
	}

	return(
		<div>
			<textarea
				rows={4}
				value={prompt}
				onChange={e=>setPrompt(e.target.value)}
				placeholder={useSchema
					? "Ask questions about this schema..."
					: "Paste schema or ask an SQL question..."
				}
			/>

			<button
				className="btn btn-blue btn-full"
				disabled={loading}
				onClick={generate}
			>
				{loading ? "Generating..." : "Generate from Prompt"}
			</button>

			{error && <p style={{color:"red"}}>❌ {error}</p>}

			{sql && (
				<div className="code-wrapper">
					<pre>{sql}</pre>

					<button
						className="copy-inside"
						onClick={() => navigator.clipboard.writeText(sql)}
					>
						Copy
					</button>
				</div>
			)}
		</div>
	)
}
