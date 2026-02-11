<!doctype html>
<html lang="nl">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
    <title>Factuur</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            /* font-family: "Montserrat", sans-serif; */
            color: #111827;
            font-size: 12px;
        }

        .card {
            padding: 24px;
        }

        .row {
            display: flex;
            justify-content: space-between;
        }

        .muted {
            color: #6b7280;
        }

        .title {
            font-size: 22px;
            font-weight: 700;
            color: #16a34a;
        }

        .h1 {
            font-size: 20px;
            font-weight: 700;
            margin: 0;
        }

        .logo {
            width: 88px;
            height: 88px;
            object-fit: contain;
            margin-bottom: 12px;
        }

        .logo-placeholder {
            width: 88px;
            height: 88px;
            background: #f3f4f6;
            border-radius: 8px;
            text-align: center;
            line-height: 88px;
            color: #9ca3af;
            margin-bottom: 12px;
        }

        .section {
            margin-top: 20px;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
        }

        .table th {
            text-align: left;
            border-bottom: 2px solid #111827;
            padding: 8px 0;
        }

        .table td {
            border-bottom: 1px solid #e5e7eb;
            padding: 8px 0;
        }

        .right {
            text-align: right;
        }

        .center {
            text-align: center;
        }

        .totals {
            width: 240px;
            margin-left: auto;
            margin-top: 12px;
        }

        .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
        }

        .totals-row.border {
            border-bottom: 1px solid #e5e7eb;
        }

        .total {
            font-size: 16px;
            font-weight: 700;
            color: #16a34a;
        }

        .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 12px;
            text-align: center;
            margin-top: 16px;
        }
    </style>
</head>

<body>
    <div class="card">
        <div class="row">
            <div>
                @if(!empty(data_get($invoice, 'company.logo')))
                <img src="{{ data_get($invoice, 'company.logo') }}" alt="Logo" class="logo" />
                @else
                <div class="logo-placeholder">Logo</div>
                @endif

                <div class="h1">{{ data_get($invoice, 'company.name', 'Jouw Bedrijf') }}</div>
                @if(data_get($invoice, 'company.address'))
                <div class="muted">{{ data_get($invoice, 'company.address') }}</div>
                @endif
                @if(data_get($invoice, 'company.postalCode') || data_get($invoice, 'company.city'))
                <div class="muted">
                    {{ data_get($invoice, 'company.postalCode') }} {{ data_get($invoice, 'company.city') }}
                </div>
                @endif
            </div>
            <div class="right">
                <div class="title">FACTUUR</div>
                <div class="muted">Nr: <strong style="color:#111827">{{ data_get($invoice, 'invoiceNumber', '-') }}</strong></div>
                <div class="muted">Datum: <strong style="color:#111827">{{ data_get($invoice, 'invoiceDate') }}</strong></div>
                <div class="muted">Vervaldatum: <strong style="color:#111827">{{ data_get($invoice, 'dueDate') }}</strong></div>
            </div>
        </div>

        <div class="section">
            <div class="muted" style="text-transform: uppercase; letter-spacing: .05em;">Factuur aan</div>
            <div style="font-weight: 600;">{{ data_get($invoice, 'client.name', 'Klantnaam') }}</div>
            @if(data_get($invoice, 'client.address'))
            <div class="muted">{{ data_get($invoice, 'client.address') }}</div>
            @endif
            @if(data_get($invoice, 'client.postalCode') || data_get($invoice, 'client.city'))
            <div class="muted">
                {{ data_get($invoice, 'client.postalCode') }} {{ data_get($invoice, 'client.city') }}
            </div>
            @endif
            @if(data_get($invoice, 'client.email'))
            <div class="muted">{{ data_get($invoice, 'client.email') }}</div>
            @endif
        </div>

        <div class="section">
            <table class="table">
                <thead>
                    <tr>
                        <th>Omschrijving</th>
                        <th class="center">Aantal</th>
                        <th class="right">Prijs</th>
                        <th class="right">BTW</th>
                        <th class="right">Totaal excl. BTW</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($products as $product)
                    <tr>
                        <td>{{ data_get($product, 'description', 'Geen omschrijving') }}</td>
                        <td class="center">{{ data_get($product, 'quantity', 0) }}</td>
                        <td class="right">€ {{ number_format(data_get($product, 'unitPrice', 0), 2, ',', '.') }}</td>
                        <td class="right">{{ number_format(data_get($product, 'btw', 0), 0) }}%</td>
                        <td class="right">
                            € {{ number_format(data_get($product, 'quantity', 0) * data_get($product, 'unitPrice', 0), 2, ',', '.') }}
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="center muted">Geen producten toegevoegd</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="totals">
            <div class="totals-row">
                <span class="muted">Subtotaal</span>
                <span>€ {{ number_format($subtotal, 2, ',', '.') }}</span>
            </div>
            <div class="totals-row border">
                <span class="muted">BTW</span>
                <span>€ {{ number_format($btwTotal, 2, ',', '.') }}</span>
            </div>
            <div class="totals-row">
                <span style="font-weight:600;">Totaal</span>
                <span class="total">€ {{ number_format($total, 2, ',', '.') }}</span>
            </div>
        </div>

        @if(data_get($invoice, 'notes'))
        <div class="section">
            <div class="muted" style="text-transform: uppercase; letter-spacing: .05em;">Opmerkingen</div>
            <div>{{ data_get($invoice, 'notes') }}</div>
        </div>
        @endif

        <div class="footer muted">
            @if(data_get($invoice, 'company.email')) E-mail: {{ data_get($invoice, 'company.email') }} @endif
            @if(data_get($invoice, 'company.phone')) | Tel: {{ data_get($invoice, 'company.phone') }} @endif
            @if(data_get($invoice, 'company.kvkNumber')) | KVK: {{ data_get($invoice, 'company.kvkNumber') }} @endif
            @if(data_get($invoice, 'company.btwNumber')) | BTW: {{ data_get($invoice, 'company.btwNumber') }} @endif
            @if(data_get($invoice, 'company.iban')) | IBAN: {{ data_get($invoice, 'company.iban') }} @endif
        </div>

        <div style="margin-top: 20px; text-align: center;">
            <img src="data:image/svg+xml;base64,{{ base64_encode(file_get_contents(public_path('logos/LogoGreen.svg'))) }}" alt="watdefactuur" style="max-height: 30px;" />
        </div>
    </div>
</body>

</html>