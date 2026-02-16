@props(['url'])
@php
$logoBaseUrl = app()->environment('local')
? rtrim(url('/'), '/')
: rtrim(config('app.url'), '/');
@endphp
<tr>
    <td class="header">
        <a href="{{ $url }}" style="display: inline-block;">
            <img src="{{ $logoBaseUrl }}/logos/LogoGreen.svg" class="logo" alt="{{ config('app.name') }}" width="180" height="180" style="width: 180px; height: 180px; max-width: 180px;">
        </a>
    </td>
</tr>