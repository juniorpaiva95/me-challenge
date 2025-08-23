export const handler = async (event) => {
  // CORS headers básicos
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  // Preflight request - apenas retorna CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' }
  }

  try {
    // Remove o prefixo da função e constrói a URL da API
    const apiPath = event.path.replace('/.netlify/functions/api-proxy', '')
    let apiUrl = `https://api.mercadoe.space${apiPath}`

    // Adiciona query parameters se existirem
    if (event.queryStringParameters) {
      const params = new URLSearchParams(event.queryStringParameters)
      apiUrl += `?${params.toString()}`
    }

    // Faz a requisição para a API externa
    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        ...event.headers,
      },
      body: event.body || undefined,
    })

    const data = await response.text()

    return {
      statusCode: response.status,
      headers: {
        ...corsHeaders,
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
      body: data,
    }
  } catch (error) {
    console.error('Proxy error:', error)
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Proxy failed' }),
    }
  }
}
