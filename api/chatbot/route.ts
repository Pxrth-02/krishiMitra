import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, farmerId, language = 'malayalam' } = await request.json()

    // Here you would integrate with OpenAI or other AI service
    // For now, we'll provide a simple response based on keywords
    
    let response = ''
    const isEnglish = language === 'english' || !message.match(/[\u0D00-\u0D7F]/)
    
    if (message.toLowerCase().includes('weather') || message.includes('കാലാവസ്ഥ')) {
      response = isEnglish 
        ? 'Based on current weather conditions in your area, we expect moderate rainfall in the next 2 days. It\'s a good time to avoid spraying pesticides. Make sure your drainage is working well.'
        : 'നിങ്ങളുടെ പ്രദേശത്തെ നിലവിലെ കാലാവസ്ഥ പ്രകാരം, അടുത്ത 2 ദിവസത്തിൽ മിതമായ മഴ പ്രതീക്ഷിക്കാം. കീടനാശിനി തളിക്കുന്നത് ഒഴിവാക്കുന്നതാണ് നല്ലത്. ഡ്രെയിനേജ് ശരിയാണെന്ന് ഉറപ്പുവരുത്തുക.'
    } else if (message.toLowerCase().includes('pest') || message.includes('കീട')) {
      response = isEnglish
        ? 'For pest management in brinjal: 1) Check leaves regularly, 2) Use neem oil spray weekly, 3) Install yellow sticky traps, 4) Maintain proper spacing between plants. Would you like specific treatment for any particular pest?'
        : 'വഴുതനയിലെ കീട നിയന്ത്രണത്തിന്: 1) ഇലകൾ പതിവായി പരിശോധിക്കുക, 2) വാരത്തിലൊരിക്കൽ വേപ്പെണ്ണ തളിക്കുക, 3) മഞ്ഞ കെണികൾ വയ്ക്കുക, 4) ചെടികൾക്കിടയിൽ ശരിയായ ഇടം പാലിക്കുക. ഏതെങ്കിലും പ്രത്യേക കീടത്തിന് ചികിത്സ വേണോ?'
    } else if (message.toLowerCase().includes('fertilizer') || message.includes('വളം')) {
      response = isEnglish
        ? 'For brinjal cultivation, use NPK fertilizer in the ratio 19:19:19 during vegetative growth and 13:0:45 during flowering. Apply organic compost every 15 days. Soil testing is recommended for precise nutrient management.'
        : 'വഴുതന കൃഷിയിൽ, വളർച്ചാ കാലത്ത് 19:19:19 എന്ന അനുപാതത്തിൽ NPK വളവും പൂവിടുന്ന സമയത്ത് 13:0:45 എന്ന അനുപാതത്തിലും ഉപയോഗിക്കുക. 15 ദിവസം കൂടുമ്പോൾ ജൈവ കമ്പോസ്റ്റ് നൽകുക. കൃത്യമായ പോഷക പരിപാലനത്തിന് മണ്ണ് പരിശോധന ശുപാർശ ചെയ്യുന്നു.'
    } else {
      response = isEnglish
        ? 'I understand your concern. Based on your farm profile and current conditions, I recommend consulting with our knowledge base or speaking to a local agricultural expert. Can you provide more specific details about your issue?'
        : 'നിങ്ങളുടെ പ്രശ്നം ഞാൻ മനസ്സിലാക്കുന്നു. നിങ്ങളുടെ കൃഷിയിടത്തിന്റെ വിവരങ്ങളും നിലവിലെ അവസ്ഥയും അടിസ്ഥാനമാക്കി, ഞങ്ങളുടെ വിജ്ഞാന ശേഖരം പരിശോധിക്കുകയോ പ്രാദേശിക കാർഷിക വിദഗ്ധനുമായി സംസാരിക്കുകയോ ചെയ്യാൻ ശുപാർശ ചെയ്യുന്നു. കൂടുതൽ വിശദാംശങ്ങൾ നൽകാമോ?'
    }

    return NextResponse.json({ 
      response,
      language: isEnglish ? 'english' : 'malayalam',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in chatbot:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}