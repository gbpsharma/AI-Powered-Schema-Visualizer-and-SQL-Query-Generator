import React,{useState} from "react"
import "./styles.css"

export default function PromptPanel({onResult})
{
	const[prompt,setPrompt]=useState("")
	const[loading,setLoading]=useState(false)
	const[error,setError]=useState(null)

	const generate = async () => {
		if(!prompt.trim()) return

		setLoading(true)
		setError(null)

		try {
			const res = await fetch("http://localhost:4000/api/generate-schema",{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify({prompt})
			})

			const data = await res.json()
			if(!res.ok) throw new Error(data.error || "Server error")

			onResult(data)
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
				rows={5}
				value={prompt}
				onChange={e=>setPrompt(e.target.value)}
				placeholder="Describe your data model..."
			/>

			<button
				className="btn btn-blue btn-full"
				onClick={generate}
				disabled={loading}
			>
				{loading ? "Generating..." : "Generate Schema"}
			</button>

			{error && <p style={{color:"red"}}>{error}</p>}
		</div>
	)
}
