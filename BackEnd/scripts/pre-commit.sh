#!/bin/sh
echo "🔍 Rodando testes de mesa automáticos antes do commit..."

npm test

if [ $? -ne 0 ]; then
 echo "❌ Os testes falharam! O commit foi cancelado. Corrija o código antes de enviar."
 exit 1
fi

echo "✅ Todos os testes passaram! Prosseguindo com o commit..."
exit 0
