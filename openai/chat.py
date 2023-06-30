# import os
# import openai
#
# openai.api_key = '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'
#
# response = openai.Completion.create(
#   model="text-davinci-003",
#   prompt="\"\"\"\nUtil exposes the following:\nutil.openai() -> authenticates & returns the openai module, which has the following functions:\nopenai.Completion.create(\n    prompt=\"<my prompt>\", # The prompt to start completing from\n    max_tokens=123, # The max number of tokens to generate\n    temperature=1.0 # A measure of randomness\n    echo=True, # Whether to return the prompt in addition to the generated completion\n)\n\"\"\"\nimport util\n\"\"\"\nCreate an OpenAI completion starting from the prompt \"Once upon an AI\", no more than 5 tokens. Does not include the prompt.\n\"\"\"\n",
#   temperature=0,
#   max_tokens=64,
#   top_p=1.0,
#   frequency_penalty=0.0,
#   presence_penalty=0.0,
#   stop=["\"\"\""]
# )

import openai
openai.api_key = "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";
completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[{"role": "user", "content": "Tell the world about the ChatGPT API in the style of a pirate."}]
)

print(completion)
'''
curl https://api.openai.com/v1/chat/completions
  -H "Content-Type: application/json"
  -H "Authorization: Bearer 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"
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "Say this is a test!"}],
     "temperature": 0.7
   }'
 '''