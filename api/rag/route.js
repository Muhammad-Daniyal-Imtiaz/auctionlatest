import { RetrievalQAChain } from "langchain/chains";
import { Ollama } from "@langchain/ollama";
import { WeaviateStore } from "@langchain/community/vectorstores/weaviate";
import { OllamaEmbeddings } from "@langchain/ollama";
import weaviate from "weaviate-client";

// Initialize outside the handler to reuse across requests
let chain;

async function initializeChain() {
  const model = new Ollama({ model: "mistral" });
  const client = weaviate.client({
    scheme: "http",
    host: "localhost:8080", // Ensure Weaviate is running
  });
  const embeddings = new OllamaEmbeddings({ model: "mistral" });
  
  // Replace with your actual data or load from a source
  const texts = [
    "Ollama makes AI local and private.",
    "RAG improves LLMs by adding external knowledge.",
  ];
  const vectorStore = await WeaviateStore.fromTexts(
    texts,
    {},
    embeddings,
    { client }
  );
  return RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Initialize chain if not already done
    if (!chain) {
      chain = await initializeChain();
    }

    const response = await chain.call({ query });
    res.status(200).json({ answer: response.text });
  } catch (error) {
    console.error("Error in RAG API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}