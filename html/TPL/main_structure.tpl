<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>{$title}</title>
    <link rel="stylesheet" href="/CSS/style.css">
    <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>
</head>
<body>
    {include file='./header.tpl'}
    {include file=$page}
    {include file='./footer.tpl'}
</body>
</html>