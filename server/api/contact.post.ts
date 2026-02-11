import { Resend } from 'resend';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name, email, message } = body;
    const config = useRuntimeConfig();

    // Basic validation
    if (!name || !email || !message) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields',
        });
    }

    const resend = new Resend(config.resendApiKey);

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // You can change this after verifying your domain in Resend
            to: [config.public.email],
            subject: `New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        return { success: true, data };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Email delivery failed',
            data: error,
        });
    }
});
