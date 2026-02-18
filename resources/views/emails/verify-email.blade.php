@php
$color = match ($level ?? 'info') {
'success', 'error' => $level,
default => 'primary',
};
$logoBaseUrl = app()->environment('local')
? rtrim(url('/'), '/')
: rtrim(config('app.url'), '/');
@endphp
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="nl">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>{{ config('app.name') }}</title>
    <style>
        {
            ! ! file_get_contents(resource_path('views/vendor/mail/html/themes/default.css')) ! !
        }
    </style>
</head>

<body>
    <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center">
                <table class="content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="header" align="center">
                            <a href="{{ config('app.url') }}" style="display: inline-block;">
                                <img src="{{ $logoBaseUrl }}/logos/LogoGreen.svg" class="logo" alt="{{ config('app.name') }}" width="180" height="180" style="width: 180px; height: 180px; max-width: 180px; display: block; margin: 0 auto;">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="body" width="100%" cellpadding="0" cellspacing="0" style="border: hidden !important;">
                            <table class="inner-body" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td class="content-cell">
                                        <h1>{{ $greeting ?? 'Hallo!' }}</h1>

                                        @foreach ($introLines as $line)
                                        <p>{{ $line }}</p>
                                        @endforeach

                                        @isset($actionText)
                                        <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                            <tr>
                                                <td align="center">
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td align="center">
                                                                <a href="{{ $actionUrl }}" class="button button-{{ $color }}" target="_blank" rel="noopener" style="background-color: #16a34a; border-bottom: 8px solid #16a34a; border-left: 18px solid #16a34a; border-right: 18px solid #16a34a; border-top: 8px solid #16a34a; color: #ffffff; display: inline-block; text-decoration: none; border-radius: 4px;">{{ $actionText }}</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        @endisset

                                        @foreach ($outroLines as $line)
                                        <p>{{ $line }}</p>
                                        @endforeach

                                        <p>Met vriendelijke groet,<br>{{ config('app.name') }}</p>

                                        @isset($actionText)
                                        <table class="subcopy" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                            <tr>
                                                <td>
                                                    <p class="sub">Als je problemen hebt met het klikken op de "{{ $actionText }}" knop, kopieer en plak dan de onderstaande URL in je webbrowser:</p>
                                                    <p class="sub"><a href="{{ $actionUrl }}" class="break-all">{{ $displayableActionUrl }}</a></p>
                                                </td>
                                            </tr>
                                        </table>
                                        @endisset
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table class="footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td class="content-cell" align="center">
                                        <p>© {{ date('Y') }} {{ config('app.name') }}. Alle rechten voorbehouden.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>