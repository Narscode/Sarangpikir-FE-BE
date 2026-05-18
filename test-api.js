const testAPI = async () => {
  const baseUrl = 'http://127.0.0.1:5001/api';
  let token = '';

  console.log('--- 1. Testing Registration ---');
  const regRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Sarah',
      email: `sarah_${Date.now()}@test.com`,
      password: 'password123'
    })
  });
  const regData = await regRes.json();
  console.log(regData);
  token = regData.token;

  console.log('\n--- 2. Testing Add Moods (Simulating 3 days) ---');
  const moods = [
    { mood: 'Tired', note: 'Long day at work' },
    { mood: 'Sad', note: 'Feeling a bit overwhelmed' },
    { mood: 'Anxious', note: 'Upcoming deadline' }
  ];
  
  for (const m of moods) {
    const moodRes = await fetch(`${baseUrl}/moods`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(m)
    });
    const moodData = await moodRes.json();
    console.log(`Added Mood: ${moodData.mood} (Score: ${moodData.score})`);
  }

  console.log('\n--- 3. Testing Chat ---');
  const chatRes = await fetch(`${baseUrl}/chat`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message: 'I am feeling very stressed about my work.' })
  });
  const chatData = await chatRes.json();
  console.log(`User: ${chatData.userMessage.message}`);
  console.log(`AI: ${chatData.aiResponse.message}`);

  console.log('\n--- 4. Testing Weekly Insights ---');
  const insightRes = await fetch(`${baseUrl}/moods/insights`, {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  });
  const insightText = await insightRes.text();
  console.log('Insights Response Text:', insightText.substring(0, 200));
};

testAPI().catch(console.error);
