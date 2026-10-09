async function send_telegram_notification() {
    const telegram_bot_token = process.env.TELEGRAM_BOT_TOKEN;
    const telegram_chat_id = process.env.TELEGRAM_CHAT_ID;
    try {
        const response = await fetch(`https://api.telegram.org/bot${telegram_bot_token}/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({
                chat_id: telegram_chat_id,
                text: 'Hello, this is a test notification from the Telegram bot.',
            }),
        });
        const data = await response.json();
        console.log('Telegram notification sent successfully:', data);
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
    }
}

export default send_telegram_notification;