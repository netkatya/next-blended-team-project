export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get('amount');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
  
    const apiKey = process.env.APILAYER_API_KEY;
    const url = `https://api.apilayer.com/exchangerates_data/convert?amount=${amount}&from=${from}&to=${to}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          'apikey': apiKey
        }
      });
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }