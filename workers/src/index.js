// 超简单的 AI 问答后端服务
export default {
  async fetch(request, env) {
    // 允许跨域访问
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 处理 OPTIONS 请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // 健康检查
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        message: 'AI服务运行正常'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // AI 聊天接口
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        // 获取用户发送的消息
        const { message } = await request.json();

        if (!message) {
          return new Response(JSON.stringify({
            success: false,
            error: '请输入消息'
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // 检查是否有 OpenAI API Key
        if (!env.OPENAI_API_KEY) {
          return new Response(JSON.stringify({
            success: false,
            error: '服务配置错误，请联系管理员'
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // 调用 OpenAI API
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: '你是一个友善的AI助手，请简洁地回答用户问题。'
              },
              {
                role: 'user', 
                content: message
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          }),
        });

        if (!openaiResponse.ok) {
          throw new Error(`OpenAI API 错误: ${openaiResponse.status}`);
        }

        const openaiData = await openaiResponse.json();
        const reply = openaiData.choices[0]?.message?.content || '抱歉，我无法回答这个问题。';

        // 返回成功响应
        return new Response(JSON.stringify({
          success: true,
          reply: reply,
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: '服务器错误，请稍后重试'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 默认首页
    return new Response(`
      <html>
        <head><title>AI问答服务</title></head>
        <body style="font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1>🤖 AI问答服务</h1>
          <p>这是一个基于 Cloudflare Workers 的 AI 问答后端服务</p>
          <h3>API 接口:</h3>
          <ul>
            <li><strong>POST /api/chat</strong> - 发送消息给AI</li>
            <li><strong>GET /health</strong> - 服务健康检查</li>
          </ul>
          <p>请求格式: <code>{"message": "你的问题"}</code></p>
        </body>
      </html>
    `, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html' }
    });
  },
};