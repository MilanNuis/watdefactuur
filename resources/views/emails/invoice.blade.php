<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Uw factuur</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            padding: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.8em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Beste klant,</p>
        
        <p>Hierbij ontvangt u factuur <strong>{{ $invoiceNumber }}</strong> van <strong>{{ $invoiceData['company']['name'] ?? 'ons bedrijf' }}</strong>.</p>
        
        <p>De factuur is als PDF-bijlage aan deze e-mail toegevoegd.</p>
        
        <p>Met vriendelijke groet,</p>
        <p>{{ $invoiceData['company']['name'] ?? 'Watdefactuur' }}</p>
    </div>
    <div class="footer">
        <p>Dit is een automatisch verzonden bericht vanuit Watdefactuur.</p>
    </div>
</body>
</html>
