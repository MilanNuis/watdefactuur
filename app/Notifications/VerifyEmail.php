<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmail extends VerifyEmailBase
{
    /**
     * Get the verify email notification mail message for the given URL.
     *
     * @param  string  $url
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    protected function buildMailMessage($url): MailMessage
    {
        return (new MailMessage)
            ->subject('Verifieer je e-mailadres')
            ->greeting('Hallo!')
            ->success()
            ->line('Bedankt voor het aanmelden! Klik op de onderstaande knop om je e-mailadres te verifiëren.')
            ->action('Verifieer e-mailadres', $url)
            ->line('Als je geen account hebt aangemaakt, hoef je verder niets te doen.')
            ->view('emails.verify-email');
    }
}
