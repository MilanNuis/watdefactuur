<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordBase;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPassword extends ResetPasswordBase
{
    /**
     * Get the password reset notification mail message for the given URL.
     *
     * @param  string  $url
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Wachtwoord opnieuw instellen')
            ->greeting('Hallo!')
            ->success()
            ->line('Je ontvangt deze e-mail omdat we een verzoek hebben ontvangen om je wachtwoord opnieuw in te stellen.')
            ->action('Wachtwoord opnieuw instellen', $url ?? $this->resetUrl($notifiable))
            ->line('Deze link verloopt over 60 minuten.')
            ->line('Als je geen wachtwoord reset hebt aangevraagd, hoef je verder niets te doen.')
            ->view('emails.reset-password');
    }
}
