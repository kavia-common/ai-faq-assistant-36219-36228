#!/bin/bash
cd /home/kavia/workspace/code-generation/ai-faq-assistant-36219-36228/faq_bot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

