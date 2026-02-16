<x-mail::message>
    {{-- Greeting --}}
    @if (! empty($greeting))
    # {{ $greeting }}
    @else
    @if ($level === 'error')
    # Oeps!
    @else
    # Hallo!
    @endif
    @endif

    {{-- Intro Lines --}}
    @foreach ($introLines as $line)
    {{ $line }}

    @endforeach

    {{-- Action Button --}}
    @isset($actionText)
    <?php
    $color = match ($level) {
        'success', 'error' => $level,
        default => 'primary',
    };
    ?>
    <x-mail::button :url="$actionUrl" :color="$color">
        {{ $actionText }}
    </x-mail::button>
    @endisset

    {{-- Outro Lines --}}
    @foreach ($outroLines as $line)
    {{ $line }}

    @endforeach

    {{-- Salutation --}}
    @if (! empty($salutation))
    {{ $salutation }}
    @else
    Met vriendelijke groet,<br>
    {{ config('app.name') }}
    @endif

    {{-- Subcopy --}}
    @isset($actionText)
    <x-slot:subcopy>
        Als je problemen hebt met het klikken op de "{{ $actionText }}" knop, kopieer en plak dan de onderstaande URL in je webbrowser: <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
    </x-slot:subcopy>
    @endisset
</x-mail::message>