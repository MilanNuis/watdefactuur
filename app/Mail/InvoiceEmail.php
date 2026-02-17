<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvoiceEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public $invoiceData,
        public $pdfContent,
        public $invoiceNumber
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Uw factuur ' . ($this->invoiceNumber ?: 'Nieuw'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.invoice',
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromData(fn () => $this->pdfContent, "factuur-{$this->invoiceNumber}.pdf")
                ->withMime('application/pdf'),
        ];
    }
}
