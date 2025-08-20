<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPassword extends ResetPasswordNotification
{
    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('COF Church - Reset Your Password')
            ->greeting('Hello ' . $notifiable->name . ' ' . $notifiable->surname . '!')
            ->line('You are receiving this email because we received a password reset request for your Church AGM account.')
            ->action('Reset Password', url(config('app.url').route('password.reset', ['token' => $this->token, 'email' => $notifiable->getEmailForPasswordReset()], false)))
            ->line('This password reset link will expire in :count minutes.', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')])
            ->line('If you did not request a password reset, no further action is required.')
            ->salutation('Blessings, COF Church Team');
    }
}
